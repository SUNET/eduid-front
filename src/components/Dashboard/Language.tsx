import { PersonalDataRequest, postPersonalData } from "apis/eduidPersonalData";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { AVAILABLE_LANGUAGES, LOCALIZED_MESSAGES } from "globals";
import React, { Fragment, useState } from "react";
import { Field, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { updateIntl } from "slices/Internationalisation";
import { clearNotifications } from "slices/Notifications";
import NameDisplay from "./NameDisplay";

interface RenderAddPersonalDataPromptProps {
  setEditMode(value: boolean): void;
}

function RenderAddPersonalDataPrompt({ setEditMode }: RenderAddPersonalDataPromptProps) {
  return (
    <div className="button-pair">
      <p>
        <FormattedMessage defaultMessage="No information has been added." description="pd no data added" />
      </p>
      <EduIDButton buttonstyle="primary" id="add-personal-data" onClick={() => setEditMode(true)}>
        <FormattedMessage defaultMessage="add" description="button add" />
      </EduIDButton>
    </div>
  );
}

function RenderLanguage() {
  const pref_language = useAppSelector((state) => state.personal_data.response?.language);
  // if language is set render label
  const hasPrefLanguage = pref_language !== undefined && pref_language !== null;
  let languageLabel;
  if (hasPrefLanguage) {
    languageLabel =
      pref_language === "sv" ? (
        <FormattedMessage defaultMessage="Svenska" description="pd label sw" />
      ) : (
        <FormattedMessage defaultMessage="English" description="pd label en" />
      );
  }

  return (
    <div className="personal-data-info">
      {hasPrefLanguage ? (
        <NameDisplay
          htmlFor="language"
          label={<FormattedMessage defaultMessage="Language" description="pd label language" />}
          name={languageLabel}
        />
      ) : null}
    </div>
  );
}

function RenderLanguageSelect(): JSX.Element {
  // Make an ordered list of languages to be presented as radio buttons
  const _languages = AVAILABLE_LANGUAGES as { [key: string]: string };
  const language_list = Object.entries(_languages);

  return (
    <React.Fragment>
      <legend className="require">
        <FormattedMessage defaultMessage="Language" description="Language radio group legend" />
      </legend>
      <div className="radio-input-container">
        {language_list.map((option: string[]) => {
          const [key, value] = option;
          return (
            <label key={key} htmlFor={value}>
              <Field name="language" component="input" type="radio" id={value} value={key} />
              <span>{value}</span>
            </label>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export interface LanguageFormProps {
  setEditMode(value: boolean): void;
}

/**
 * Here we still send the whole PersonalData block, language with name/displayName
 */
function LanguageForm(props: LanguageFormProps) {
  const dispatch = useAppDispatch();
  const personal_data = useAppSelector((state) => state.personal_data.response);
  const is_verified = useAppSelector((state) => state.personal_data?.response?.identities?.is_verified);
  const messages = LOCALIZED_MESSAGES;

  const [chosenGivenName, setChosenGivenName] = useState<string | undefined>();
  const defaultDisplayGivenName = chosenGivenName ? chosenGivenName : personal_data?.given_name;

  async function formSubmit(values: PersonalDataRequest) {
    // Send to backend as parameter: display name only for verified users. default display name is the combination of given_name and surname

    let postData = values;
    if (is_verified) {
      postData = { ...values, chosen_given_name: defaultDisplayGivenName };
    }
    const response = await dispatch(postPersonalData(postData));

    if (postPersonalData.fulfilled.match(response)) {
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
    <FinalForm<PersonalDataRequest>
      initialValues={personal_data}
      onSubmit={formSubmit}
      render={(formProps) => {
        const _submitError = Boolean(formProps.submitError && !formProps.dirtySinceLastSubmit);
        const _disabled = Boolean(formProps.hasValidationErrors || _submitError);

        return (
          <form id="personaldata-view-form" onSubmit={formProps.handleSubmit}>
            <fieldset className="name-inputs">
              <article>
                <RenderLanguageSelect />
              </article>
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

interface RenderEditBoxProps {
  setEditMode(value: boolean): void;
}

function RenderEditBox(props: RenderEditBoxProps) {
  const identities = useAppSelector((state) => state.personal_data?.response?.identities);

  return (
    <div className="edit-data">
      <div className="title">
        <h4>
          <FormattedMessage defaultMessage="Edit language" description="personal data edit title" />
        </h4>
        <EduIDButton buttonstyle="close" id="cancel-edit-data" onClick={() => props.setEditMode(false)} />
      </div>
      <LanguageForm {...props} />
    </div>
  );
}

interface RenderEditButtonProps {
  readonly isEditMode: boolean;
  setEditMode(value: boolean): void;
  readonly hasPersonalData: boolean;
}

function RenderEditButton({ setEditMode, hasPersonalData, isEditMode }: RenderEditButtonProps) {
  return (
    <Fragment>
      {isEditMode ||
        (hasPersonalData && (
          <EduIDButton buttonstyle="link" className="lowercase" onClick={() => setEditMode(true)}>
            <FormattedMessage description="edit button" defaultMessage={`edit`} />
          </EduIDButton>
        ))}
    </Fragment>
  );
}

function LanguagePreference() {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  // check if any data
  const personal_data = useAppSelector((state) => state.personal_data);
  const hasLanguage = Boolean(personal_data?.response?.language);

  return (
    <article className="personal-data">
      <div className="heading">
        <h2>
          <FormattedMessage description="pd main title" defaultMessage={`Language`} />
        </h2>
        <RenderEditButton hasPersonalData={hasLanguage} setEditMode={setEditMode} isEditMode={isEditMode} />
      </div>
      <p>
        <FormattedMessage
          description="pd long description"
          defaultMessage="You can choose your preferred language. The effect will be visible in the interface when you login in and when we sent emails to you."
        />
      </p>
      {!hasLanguage && !isEditMode ? <RenderAddPersonalDataPrompt setEditMode={setEditMode} /> : null}
      {hasLanguage && !isEditMode ? <RenderLanguage /> : null}
      {isEditMode && <RenderEditBox setEditMode={setEditMode} />}
    </article>
  );
}

export default LanguagePreference;
