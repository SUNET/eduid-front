import { requestPhoneCodeForNewPassword } from "apis/eduidResetPassword";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications, showNotification } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";

import { SecurityKey as SecurityKeyLogin } from "components/Common/SecurityKey";
import { SwedishEID } from "components/Common/SwedishEID";
import {
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE,
  clearCountdown,
  countFiveMin,
  setLocalStorage,
} from "./CountDownTimer";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";

interface SecurityWithSMSProps {
  readonly extraSecurityPhone?: Array<PhoneInterface>;
  readonly toPhoneCodeForm: () => void;
  readonly requestedPhoneCode: {
    index?: number;
    number?: string;
  };
}

export interface PhoneInterface {
  index: number;
  number: string;
  phone_code?: string;
}

function SecurityWithSMS({
  extraSecurityPhone,
  toPhoneCodeForm,
  requestedPhoneCode,
}: SecurityWithSMSProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const email_code = useAppSelector((state) => state.resetPassword.email_code);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  async function sendConfirmCode(phone: PhoneInterface) {
    dispatch(resetPasswordSlice.actions.setPhone(phone));
    if (phone && email_code) {
      const response = await dispatch(
        requestPhoneCodeForNewPassword({ phone_index: phone.index, email_code: email_code })
      );
      if (requestPhoneCodeForNewPassword.fulfilled.match(response)) {
        dispatch(showNotification({ message: response.payload.message, level: "info" }));
        clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE);
        setLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE, new Date().getTime() + 300000);
        countFiveMin("phone");
        resetPasswordContext.resetPasswordService.send({ type: "CHOOSE_PHONE_VERIFICATION" });
      }
    }
  }

  if (!extraSecurityPhone?.length) {
    return null;
  }

  return (
    <React.Fragment>
      <div className="buttons">
        {extraSecurityPhone.map((phone: PhoneInterface) => {
          const maskedPhone = phone.number.replaceAll("X", "*");

          return (
            <div key={phone.index}>
              {
                <EduIDButton
                  buttonstyle="primary"
                  id="extra-security-phone"
                  key={phone.index}
                  onClick={() => sendConfirmCode(phone)}
                >
                  <FormattedMessage
                    defaultMessage="Send sms to {phone}"
                    description="Reset password"
                    values={{ phone: maskedPhone }}
                  />
                </EduIDButton>
              }
            </div>
          );
        })}
      </div>
      <p className="enter-phone-code">
        <FormattedMessage description="received sms" defaultMessage="Already received sms?" />
        &nbsp;
        <EduIDButton
          buttonstyle="link"
          className={`lowercase ${requestedPhoneCode.index === undefined && "disabled"}`}
          onClick={toPhoneCodeForm}
        >
          <FormattedMessage description="enter code" defaultMessage="enter code" />
        </EduIDButton>
      </p>
    </React.Fragment>
  );
}

/**
 * Render the extra security options, security key, Freja eID and phone verification
 */
export function HandleExtraSecurities(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const requestedPhoneCode = useAppSelector((state) => state.resetPassword.phone);
  const swedishEID_status = useAppSelector((state) => state.resetPassword.swedishEID_status);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  useEffect(() => {
    if (swedishEID_status === "eidas.mfa_authn_success" || swedishEID_status === "bankid.mfa_authn_success") {
      dispatch(resetPasswordSlice.actions.selectExtraSecurity("swedishEID"));
      resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
    }
  }, [swedishEID_status]);

  useEffect(() => {
    if (extra_security && !Object.values(extra_security).length) {
      resetPasswordContext.resetPasswordService.send({ type: "WITHOUT_EXTRA_SECURITY" });
    }
  }, [extra_security]);

  function toPhoneCodeForm() {
    dispatch(clearNotifications());
    resetPasswordContext.resetPasswordService.send({ type: "CHOOSE_PHONE_VERIFICATION" });
  }

  function continueSetPassword() {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
    dispatch(clearNotifications());
    resetPasswordContext.resetPasswordService.send({ type: "WITHOUT_EXTRA_SECURITY" });
  }

  if (!extra_security) {
    return null;
  }

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Reset Password: Verification method"
            description="HandleExtraSecurities heading"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage={`Choose a second method to authenticate yourself, ensuring only you can access your eduID. 
                If you are unable to use the security key, please select other options below, such as BankID or Freja+.`}
              description="MFA paragraph"
            />
          </p>
        </div>
      </section>
      <div className="options">
        <SecurityKeyLogin webauthn={extra_security.tokens} />
        <SwedishEID recoveryAvailable={extra_security.external_mfa} />
        <SecurityWithSMS
          requestedPhoneCode={requestedPhoneCode}
          extraSecurityPhone={extra_security.phone_numbers}
          toPhoneCodeForm={toPhoneCodeForm}
        />
      </div>
      <h3 className="description-without-security">
        <FormattedMessage
          description="without extra security heading"
          defaultMessage="Continue without extra security option"
        />
      </h3>
      <p>
        <FormattedMessage
          description="without extra security description"
          defaultMessage="Your account will require confirmation after the password has been reset."
        />
        &nbsp;
        <EduIDButton
          buttonstyle="link"
          className="lowercase"
          id="continue-without-security"
          onClick={continueSetPassword}
        >
          <FormattedMessage description="continue reset password" defaultMessage="Continue reset password" />
        </EduIDButton>
      </p>
    </React.Fragment>
  );
}
