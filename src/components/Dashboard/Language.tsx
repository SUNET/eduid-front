import { postUserLanguage, UserLanguageRequest } from "apis/eduidPersonalData";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { AVAILABLE_LANGUAGES, LOCALIZED_MESSAGES } from "globals";
import { Field, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { updateIntl } from "slices/Internationalisation";
import { clearNotifications } from "slices/Notifications";

export function LanguagePreference() {
  const dispatch = useAppDispatch();
  const personal_data = useAppSelector((state) => state.personal_data.response);
  const messages = LOCALIZED_MESSAGES;
  // Make an ordered list of languages to be presented as radio buttons
  const _languages = AVAILABLE_LANGUAGES as { [key: string]: string };
  const language_list = Object.entries(_languages);

  async function formSubmit(values: UserLanguageRequest) {
    // Send to backend as parameter: display name only for verified users. default display name is the combination of given_name and surname
    let postData = values;
    postData = {
      language: values.language,
    };
    const response = await dispatch(postUserLanguage(postData));

    if (postUserLanguage.fulfilled.match(response)) {
      dispatch(clearNotifications());
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
    <article className="personal-data">
      <div className="heading">
        <h2>
          <FormattedMessage description="pd main title" defaultMessage={`Language`} />
        </h2>
      </div>
      <p>
        <FormattedMessage
          description="pd long description"
          defaultMessage="You can choose your preferred language. The effect will be visible in the interface when you login in and when we sent emails to you."
        />
      </p>
      <FinalForm<UserLanguageRequest>
        initialValues={personal_data}
        onSubmit={formSubmit}
        render={(formProps) => {
          const _submitError = Boolean(formProps.submitError && !formProps.dirtySinceLastSubmit);
          const _disabled = Boolean(formProps.hasValidationErrors || _submitError);

          return (
            <form id="personaldata-view-form" onChange={formProps.handleSubmit}>
              <fieldset className="name-inputs">
                <article>
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
                </article>
              </fieldset>
            </form>
          );
        }}
      />
    </article>
  );
}