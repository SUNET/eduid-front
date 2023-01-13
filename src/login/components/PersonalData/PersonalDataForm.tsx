import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateOfficialUserData } from "apis/eduidSecurity";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { AVAILABLE_LANGUAGES } from "globals";
import { NameLabels } from "login/components/PersonalData/PersonalDataParent";
import { Fragment } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { PersonalDataData } from "reducers/PersonalData";
import { getInitialUserData } from "sagas/PersonalData";
import { postUserdata } from "../../../actions/PersonalData";
import EduIDButton from "../../../components/EduIDButton";
import validatePersonalData from "../../app_utils/validation/validatePersonalData";
import NameDisplay from "../DataDisplay/Name/NameDisplay";
import CustomInput from "../Inputs/CustomInput";

interface PersonalDataFormProps {
  labels: NameLabels;
  isVerifiedIdentity: boolean;
  setEditMode(value: boolean): void;
}

export default function PersonalDataForm(props: PersonalDataFormProps) {
  const { labels } = props;
  const dispatch = useDashboardAppDispatch();
  const personal_data = useDashboardAppSelector((state) => state.personal_data);

  function formSubmit(values: PersonalDataData) {
    dispatch(postUserdata(values));
    props.setEditMode(false); // tell parent component we're done editing
  }

  return (
    <FinalForm<PersonalDataData>
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
                <RenderEditableNames labels={labels} />
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

function RenderLanguageSelect(): JSX.Element {
  // Make an ordered list of languages to be presented as radio buttons
  const _languages = AVAILABLE_LANGUAGES as { [key: string]: string };
  const language_list = Object.keys(_languages)
    .sort()
    .map((key) => {
      return [key, _languages[key]];
    });

  return (
    <fieldset>
      <legend>
        <FormattedMessage defaultMessage="Language" description="Language radio group legend" />
        <span className="label-required" aria-label="required">
          *
        </span>
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
  const dispatch = useDashboardAppDispatch();
  const loading = useDashboardAppSelector((state) => state.config.loading_data);
  const given_name = useDashboardAppSelector((state) => state.personal_data.given_name);
  const surname = useDashboardAppSelector((state) => state.personal_data.surname);

  async function handleUpdateName() {
    const response = await dispatch(updateOfficialUserData());
    if (updateOfficialUserData.fulfilled.match(response)) {
      dispatch(getInitialUserData());
    }
  }

  return (
    <Fragment>
      <div className="external-names">
        <NameDisplay label={props.labels.first} name={given_name} />
        <NameDisplay label={props.labels.last} name={surname} />
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
    </Fragment>
  );
};

function RenderEditableNames(props: { labels: NameLabels }) {
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
      <p className="help-text">
        <FormattedMessage
          defaultMessage="First and last name will be replaced with your legal name if you verify your eduID with your personal id number."
          description="Personal data hint names locked when verified"
        />
      </p>
    </Fragment>
  );
}
