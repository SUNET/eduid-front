import EduIDButton from "components/EduIDButton";
import CustomInput from "login/components/Inputs/CustomInput";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { CaptchaProps } from "./SignupCaptcha";

export interface SignupCaptchaFormProps extends CaptchaProps {
  disabled?: boolean; // disable the submit button if true
}

interface SignupCaptchaFormData {
  value?: string;
}

export function SignupCaptchaForm(props: SignupCaptchaFormProps): JSX.Element {
  function submitCaptchaForm(values: SignupCaptchaFormData) {
    const errors: SignupCaptchaFormData = {};

    if (values.value) {
      props.handleCaptchaCompleted(values.value);
    } else {
      errors.value = "required";
    }

    return errors;
  }

  return (
    <FinalForm<SignupCaptchaFormData>
      onSubmit={submitCaptchaForm}
      render={(formProps) => {
        const _submitError = Boolean(formProps.submitError && !formProps.dirtySinceLastSubmit);
        const _disabled = Boolean(
          formProps.hasValidationErrors ||
            _submitError ||
            formProps.pristine ||
            props.disabled ||
            !formProps.values["value"]
        );

        return (
          <form id="captcha-form" onSubmit={formProps.handleSubmit}>
            <fieldset>
              <FinalField
                component={CustomInput}
                componentClass="input"
                autoFocus={true}
                type="text"
                name="value"
                placeholder="xxxxxx"
                label={
                  <FormattedMessage description="captcha input label" defaultMessage="Enter the code from the image" />
                }
              />

              <div className="buttons">
                <EduIDButton onClick={props.handleCaptchaCancel} buttonstyle="secondary" id="cancel-captcha-button">
                  <FormattedMessage defaultMessage="Cancel" description="Signup cancel button" />
                </EduIDButton>

                <EduIDButton
                  buttonstyle="primary"
                  id="captcha-continue-button"
                  disabled={_disabled}
                  onClick={formProps.handleSubmit}
                >
                  <FormattedMessage defaultMessage="Continue" description="Captcha button" />
                </EduIDButton>
              </div>
            </fieldset>
          </form>
        );
      }}
    />
  );
}
