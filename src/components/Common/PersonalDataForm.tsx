import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PersonalDataRequest, postUserName, requestAllPersonalData, UserNameRequest } from "apis/eduidPersonalData";
import { updateOfficialUserData } from "apis/eduidSecurity";
import NameDisplay from "components/Dashboard/NameDisplay";
import { NameLabels } from "components/Dashboard/PersonalDataParent";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { LOCALIZED_MESSAGES } from "globals";
import validatePersonalData from "helperFunctions/validation/validatePersonalData";
import React, { useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import Select, { MultiValue, SingleValue } from "react-select";
import { updateIntl } from "slices/Internationalisation";
import { clearNotifications } from "slices/Notifications";
import CustomInput from "./CustomInput";
import EduIDButton from "./EduIDButton";

interface PersonalDataFormProps {
  readonly labels: NameLabels;
  readonly isVerifiedIdentity: boolean;
  setEditMode(value: boolean): void;
}

interface SelectedNameValues {
  label: string;
  value: string;
}

export default function PersonalDataForm(props: PersonalDataFormProps) {
  const { labels } = props;
  const dispatch = useAppDispatch();
  const personal_data = useAppSelector((state) => state.personal_data.response);
  const is_verified = useAppSelector((state) => state.personal_data?.response?.identities?.is_verified);
  const messages = LOCALIZED_MESSAGES;

  const [chosenGivenName, setChosenGivenName] = useState<string | undefined>();
  const defaultDisplayGivenName = chosenGivenName || personal_data?.chosen_given_name || personal_data?.given_name;

  async function formSubmit(values: PersonalDataRequest) {
    // Send to backend as parameter: display name only for verified users. default display name is the combination of given_name and surname

    let postData = values;
    if (is_verified) {
      postData = { ...values, chosen_given_name: defaultDisplayGivenName };
    }
    const response = await dispatch(postUserName(postData));

    if (postUserName.fulfilled.match(response)) {
      dispatch(clearNotifications());
      props.setEditMode(false); // tell parent component we're done editing
      if (response.payload.language) {
        dispatch(
          updateIntl({
            locale: response.payload.language,
            messages: messages[response.payload.language],
          })
        );
      }
    }
  }

  return (
    <FinalForm<UserNameRequest>
      initialValues={personal_data}
      validate={validatePersonalData}
      onSubmit={formSubmit}
      render={(formProps) => {
        const _submitError = Boolean(formProps.submitError && !formProps.dirtySinceLastSubmit);
        const _disabled = Boolean(formProps.hasValidationErrors || _submitError);

        return (
          <form id="personaldata-view-form" onSubmit={formProps.handleSubmit}>
            <fieldset className="name-inputs">
              {props.isVerifiedIdentity ? (
                <React.Fragment>
                  <RenderLockedNames labels={labels} />
                  <SelectDisplayName setChosenGivenName={setChosenGivenName} />
                </React.Fragment>
              ) : (
                <RenderEditableNames labels={labels} />
              )}
              <article>
                <div className="buttons">
                  <EduIDButton id="personal-data-button" buttonstyle="primary" disabled={_disabled}>
                    <FormattedMessage defaultMessage="save" description="button save" />
                  </EduIDButton>
                </div>
              </article>
            </fieldset>
          </form>
        );
      }}
    />
  );
}

function SelectDisplayName(props: { readonly setChosenGivenName: (name: string) => void }): JSX.Element {
  const is_verified = useAppSelector((state) => state.personal_data?.response?.identities?.is_verified);
  const given_name = useAppSelector((state) => state.personal_data.response?.given_name);
  const chosen_given_name = useAppSelector((state) => state.personal_data.response?.chosen_given_name);
  const surname = useAppSelector((state) => state.personal_data.response?.surname);
  const [selectedOptions, setSelectedOptions] = useState<SelectedNameValues[]>([]);
  const [defaultValues, setDefaultValues] = useState<SelectedNameValues[]>([]);
  const splitGivenName = given_name?.split(/[\s-]+/);
  const splitChosenGivenName = chosen_given_name?.split(/[\s-]+/);
  const transformedChosenGivenNameOptions = splitChosenGivenName?.map((name) => ({
    label: name,
    value: name,
  }));

  const transformedOptions = splitGivenName?.map((name) => ({
    label: name,
    value: name,
  }));

  useEffect(() => {
    if (is_verified) {
      if (chosen_given_name) {
        transformedChosenGivenNameOptions && setSelectedOptions(transformedChosenGivenNameOptions);
      } else {
        transformedOptions && setSelectedOptions(transformedOptions);
      }
      transformedOptions && setDefaultValues(transformedOptions);
    }
  }, [given_name, chosen_given_name, surname]);

  const handleSelectChange = (newValue: MultiValue<SelectedNameValues> | SingleValue<SelectedNameValues>) => {
    if (defaultValues.length > 1) {
      const updatedValue = Array.isArray(newValue) ? newValue : [newValue];
      if (updatedValue.length) {
        setSelectedOptions(updatedValue);
        const selectedGivenName = updatedValue.map((name: SelectedNameValues) => name.value).join(" ");
        if (selectedGivenName) {
          props.setChosenGivenName(selectedGivenName);
          setSelectedOptions(updatedValue);
        }
      } else {
        setSelectedOptions([]);
        props.setChosenGivenName("");
      }
    }
  };

  if (!defaultValues.length) {
    return <></>;
  }

  return (
    <article>
      <legend className="require">
        <FormattedMessage defaultMessage="Display name" description="Display name select legend" />
      </legend>
      <p className="help-text">
        <FormattedMessage
          defaultMessage={`If your identity is verified you can choose which of your first names from the population 
          register to use as your display name for some services. If you wish to change it, select at least one first name below.`}
          description="Display name select paragraph"
        />
      </p>
      <div className="select-group">
        <Select
          isMulti={transformedOptions && transformedOptions.length > 1}
          value={selectedOptions}
          options={defaultValues}
          onChange={handleSelectChange}
          className="basic-multi-select"
          classNamePrefix="select"
          noOptionsMessage={() => (
            <FormattedMessage
              defaultMessage="To change the display name, delete and choose again"
              description="Display name noOptionsMessage"
            />
          )}
          placeholder={
            <FormattedMessage defaultMessage="select display name..." description="Display name select placeholder" />
          }
          isDisabled={transformedOptions && transformedOptions.length < 2}
          isSearchable={false}
        />
        <div className="default-surname">
          <span>{surname}</span>
        </div>
      </div>
    </article>
  );
}

/*
 * If the user has a verified NIN, editing the first and last name is not permitted because we get
 * the legal names from Skatteverket. There is however a button to request renewal of the names
 * from Skatteverket, which the user can use to speed up syncing in case of name change.
 */
const RenderLockedNames = (props: { labels: NameLabels }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.config.loading_data);
  const given_name = useAppSelector((state) => state.personal_data.response?.given_name);
  const surname = useAppSelector((state) => state.personal_data.response?.surname);
  const nin = useAppSelector((state) => state.personal_data.response?.identities?.nin);

  async function handleUpdateName() {
    const response = await dispatch(updateOfficialUserData());
    if (updateOfficialUserData.fulfilled.match(response)) {
      dispatch(requestAllPersonalData());
    }
  }

  return (
    <article>
      <div className="external-names">
        <NameDisplay htmlFor="first name" label={props.labels.first} name={given_name} />
        <NameDisplay htmlFor="last name" label={props.labels.last} name={surname} />
      </div>

      {/* Only available for Swedish identities */}
      {nin?.verified && (
        <div className="icon-text">
          <button
            type="button"
            className="icon-only"
            disabled={loading}
            aria-label="name-check"
            onClick={() => handleUpdateName()}
          >
            <FontAwesomeIcon icon={faRedo as IconProp} />
          </button>
          <label htmlFor="name-check" className="hint">
            <FormattedMessage
              defaultMessage="Update first and last names from the Swedish Population Register."
              description="Personal data update locked names"
            />
          </label>
        </div>
      )}
    </article>
  );
};

function RenderEditableNames(props: { readonly labels: NameLabels }) {
  return (
    <article>
      <fieldset>
        <Field
          component={CustomInput}
          required={true}
          componentClass="input"
          type="text"
          name="given_name"
          label={props.labels.first}
          placeholder={props.labels.first}
        />
      </fieldset>
      <fieldset>
        <Field
          component={CustomInput}
          required={true}
          componentClass="input"
          type="text"
          name="surname"
          label={props.labels.last}
          placeholder={props.labels.last}
        />
      </fieldset>
      <p className="help-text">
        <FormattedMessage
          defaultMessage="First and last name will be replaced with your legal name if you verify your eduID with your personal id number."
          description="Personal data hint names locked when verified"
        />
      </p>
    </article>
  );
}
