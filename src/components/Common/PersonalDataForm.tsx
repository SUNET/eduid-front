import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PersonalDataRequest, postPersonalData, requestAllPersonalData } from "apis/eduidPersonalData";
import { updateOfficialUserData } from "apis/eduidSecurity";
import NameDisplay from "components/Dashboard/NameDisplay";
import { NameLabels } from "components/Dashboard/PersonalDataParent";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { AVAILABLE_LANGUAGES, LOCALIZED_MESSAGES } from "globals";
import validatePersonalData from "helperFunctions/validation/validatePersonalData";
import { Fragment, useEffect, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { updateIntl } from "slices/Internationalisation";
import CustomInput from "./CustomInput";
import EduIDButton from "./EduIDButton";

interface PersonalDataFormProps {
  labels: NameLabels;
  isVerifiedIdentity: boolean;
  setEditMode(value: boolean): void;
}

export default function PersonalDataForm(props: PersonalDataFormProps) {
  const { labels } = props;
  const dispatch = useAppDispatch();
  const personal_data = useAppSelector((state) => state.personal_data.response);
  const messages = LOCALIZED_MESSAGES;

  async function formSubmit(values: PersonalDataRequest) {
    const response = await dispatch(postPersonalData(values));
    if (postPersonalData.fulfilled.match(response)) {
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
    <FinalForm<PersonalDataRequest>
      initialValues={personal_data}
      validate={validatePersonalData}
      onSubmit={formSubmit}
      render={(formProps) => {
        const _submitError = Boolean(formProps.submitError && !formProps.dirtySinceLastSubmit);
        const _disabled = Boolean(formProps.hasValidationErrors || _submitError || formProps.pristine);

        return (
          <form id="personaldata-view-form" onSubmit={formProps.handleSubmit}>
            <fieldset className="name-inputs">
              {props.isVerifiedIdentity ? (
                <RenderLockedNames labels={labels} />
              ) : (
                <RenderEditableNames labels={labels} displayName={personal_data?.display_name} />
              )}
            </fieldset>
            <RenderLanguageSelect />
            <div className="buttons">
              <EduIDButton id="personal-data-button" buttonstyle="primary" disabled={_disabled}>
                <FormattedMessage defaultMessage="save" description="button save" />
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

function SelectDisplayName(): JSX.Element {
  const given_name = useDashboardAppSelector((state) => state.personal_data.response?.given_name);
  const surname = useDashboardAppSelector((state) => state.personal_data.response?.surname);
  const fullName = `${given_name} ${surname}`;
  const splitFullName = fullName?.split(/[\s-]+/);
  const transformedOptions = splitFullName?.map((name) => ({
    label: name,
    value: name,
  }));
  const [selectedOptions, setSelectedOptions] = useState(transformedOptions);

  useEffect(() => {
    if (given_name && surname) {
      setSelectedOptions(transformedOptions);
    }
  }, [given_name, surname]);

  const handleSelectChange = (selectedOptions: [{ label: string; value: string }]) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <fieldset>
      <legend className="require">
        <FormattedMessage defaultMessage="Display name" description="Display name select legend" />
      </legend>
      <Select
        isMulti
        defaultValue={selectedOptions}
        // defaultValue={displayName}
        name="display name"
        options={transformedOptions}
        onChange={() => handleSelectChange}
        className="basic-multi-select"
        classNamePrefix="select"
        noOptionsMessage={() => (
          <FormattedMessage
            defaultMessage="To change the display name, delete and choose again"
            description="Display name noOptionsMessage"
          />
        )}
        placeholder={
          <FormattedMessage defaultMessage="Select display name..." description="Display name select placeholder" />
        }
      />
    </fieldset>
  );
}

function RenderLanguageSelect(): JSX.Element {
  // Make an ordered list of languages to be presented as radio buttons
  const _languages = AVAILABLE_LANGUAGES as { [key: string]: string };
  const language_list = Object.entries(_languages);

  return (
    <fieldset>
      <legend className="require">
        <FormattedMessage defaultMessage="Language" description="Language radio group legend" />
      </legend>
      <div className="radio-input-container">
        {language_list.map((option: string[], index: number) => {
          const [key, value] = option;
          return (
            <label key={key} htmlFor={value}>
              <Field name="language" component="input" type="radio" id={value} value={key} />
              <span>{value}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
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

  async function handleUpdateName() {
    const response = await dispatch(updateOfficialUserData());
    if (updateOfficialUserData.fulfilled.match(response)) {
      dispatch(requestAllPersonalData());
    }
  }

  return (
    <Fragment>
      <div className="external-names">
        <NameDisplay htmlFor="first name" label={props.labels.first} name={given_name} />
        <NameDisplay htmlFor="last name" label={props.labels.last} name={surname} />
      </div>
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
      <SelectDisplayName />
    </Fragment>
  );
};

function RenderEditableNames(props: { labels: NameLabels; displayName: string | undefined }) {
  return (
    <Fragment>
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
      <SelectDisplayName />
      <p className="help-text">
        <FormattedMessage
          defaultMessage="First and last name will be replaced with your legal name if you verify your eduID with your personal id number."
          description="Personal data hint names locked when verified"
        />
      </p>
    </Fragment>
  );
}
