import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { GetCaptchaResponse } from "apis/eduidSignup";
import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import { Field as FinalField, Form as FinalForm } from "react-final-form";

export interface SignupCaptchaFormProps extends CaptchaProps {
  readonly disabled?: boolean; // disable the submit button if true
}

interface SignupCaptchaFormData {
  value?: string;
}

function CaptchaForm(props: SignupCaptchaFormProps): React.JSX.Element {
  function submitCaptchaForm(values: SignupCaptchaFormData, form: any) {
    const errors: SignupCaptchaFormData = {};

    if (values.value) {
      props.handleCaptchaCompleted(values.value);
      form.reset();
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
            !formProps.values?.["value"]
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
                autoComplete="off"
                label={
                  <FormattedMessage description="captcha input label" defaultMessage="Enter the code from the image" />
                }
              />

              <div className="buttons">
                <EduIDButton onClick={props.handleCaptchaCancel} buttonstyle="secondary" id="cancel-captcha-button">
                  <FormattedMessage defaultMessage="Cancel" description="button cancel" />
                </EduIDButton>

                <EduIDButton
                  buttonstyle="primary"
                  id="captcha-continue-button"
                  type="submit"
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

export interface CaptchaProps {
  readonly handleCaptchaCancel: () => void;
  readonly handleCaptchaCompleted: (response: string) => void;
  readonly getCaptcha: () => Promise<GetCaptchaResponse | undefined>;
}

export function InternalCaptcha(props: CaptchaProps) {
  const [captchaResponse, setCaptchaResponse] = useState<GetCaptchaResponse>();
  const is_configured = useAppSelector((state) => state.config.is_configured);

  function getNewCaptcha() {
    props.getCaptcha().then((captcha: GetCaptchaResponse | undefined) => {
      setCaptchaResponse({
        captcha_img: captcha?.captcha_img,
        captcha_audio: captcha?.captcha_audio,
      });
    });
  }


  useEffect(() => {
    let aborted = false; // flag to avoid updating unmounted components after this promise resolves
    if (is_configured && !captchaResponse) {
      props.getCaptcha().then((captchaResponse: any) => {
        if (!aborted && captchaResponse) {
          setCaptchaResponse({
            captcha_img: captchaResponse.captcha_img,
            captcha_audio: captchaResponse.captcha_audio,
          });
        }
      });
    }

    // create a cleanup function that will allow the async code above to realise it shouldn't
    // try to update state on an unmounted react component
    return () => {
      aborted = true;
    };
  }, [is_configured]);

  return (
    <React.Fragment>
      <figure className="captcha-responsive">
        <img alt="captcha" className="captcha-image" src={captchaResponse?.captcha_img} />
        <audio controls className="captcha-audio" src={captchaResponse?.captcha_audio} />

        <button
          type="button"
          className="link lowercase sm icon refresh"
          aria-label="refresh-captcha"
          disabled={!captchaResponse?.captcha_img}
          onClick={getNewCaptcha}
        >
          <FontAwesomeIcon icon={faRedo as IconProp} />
          <span>
            <FormattedMessage defaultMessage="Generate a new captcha image" description="captcha img change" />
          </span>
        </button>
      </figure>

      <CaptchaForm {...props} />
    </React.Fragment>
  );
}
