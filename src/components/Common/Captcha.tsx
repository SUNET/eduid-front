import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { skipToken } from "@reduxjs/toolkit/query";
import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { GetCaptchaResponse, signupApi } from "services/signup";

export interface SignupCaptchaFormProps extends CaptchaProps {
  readonly disabled?: boolean; // disable the submit button if true
}

interface SignupCaptchaFormData {
  value?: string;
}

function CaptchaForm(props: SignupCaptchaFormProps): JSX.Element {
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

interface CaptchaProps {
  readonly handleCaptchaCancel: () => void;
  readonly handleCaptchaCompleted: (response: string) => void;
}

export function InternalCaptcha(props: CaptchaProps) {
  const [captchaResponse, setCaptchaResponse] = useState<GetCaptchaResponse>();
  const is_configured = useAppSelector((state) => state.config.is_configured);
  const { data, refetch } = signupApi.useGetCaptchaQuery(is_configured?undefined:skipToken);


  useEffect(()=>{
    if (data) {
      setCaptchaResponse({
        captcha_img: data.payload.captcha_img,
        captcha_audio: data.payload.captcha_audio
      })
    }
      
  },[data])

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
          onClick={refetch}
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
