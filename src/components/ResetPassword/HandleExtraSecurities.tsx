import { bankIDMfaAuthenticate } from "apis/eduidBankid";
import { eidasMfaAuthenticate } from "apis/eduidEidas";
import { requestPhoneCodeForNewPassword } from "apis/eduidResetPassword";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { performAuthentication } from "helperFunctions/navigatorCredential";
import React, { useContext, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications, showNotification } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";

import {
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE,
  clearCountdown,
  countFiveMin,
  setLocalStorage,
} from "./CountDownTimer";
import { ResetPasswordGlobalStateContext } from "./ResetPasswordGlobalState";
import { SecurityKey } from "./SelectedSecurityToken";

interface ExternalMFAProps {
  handleOnClickFreja: () => void;
  handleOnClickBankID: () => void;
  external_mfa?: boolean;
}

function ExternalMFA({ handleOnClickBankID, handleOnClickFreja, external_mfa }: ExternalMFAProps): JSX.Element | null {
  if (!external_mfa) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="buttons">
        <EduIDButton
          type="submit"
          buttonstyle="secondary"
          className="btn-icon freja-icon"
          id="extra-security-freja"
          onClick={handleOnClickFreja}
        >
          <img height="35" alt="Freja+" src={FrejaFlag} />
          <FormattedMessage description="eidas freja eid ready" defaultMessage="Use my Freja eID" />
        </EduIDButton>
      </div>
      <div className="buttons">
        <EduIDButton
          className="btn-icon"
          type="submit"
          buttonstyle="secondary"
          id="extra-security-bankid"
          onClick={handleOnClickBankID}
        >
          <img height="35" alt="BankID" src={BankIdFlag} />
          <FormattedMessage description="bankID ready" defaultMessage="Use my BankID" />
        </EduIDButton>
      </div>
    </React.Fragment>
  );
}

interface SecurityWithSMSProps {
  extraSecurityPhone?: Array<PhoneInterface>;
  toPhoneCodeForm: () => void;
  requestedPhoneCode: {
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
        <a
          className={`text-link ${requestedPhoneCode.index === undefined && "disabled"}`}
          role="link"
          onClick={toPhoneCodeForm}
        >
          <FormattedMessage description="enter code" defaultMessage="enter code" />
        </a>
      </p>
    </React.Fragment>
  );
}

/**
 * Render the extra security options, security key, Freja eID and phone verification
 */
export function HandleExtraSecurities(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const emailCode = useAppSelector((state) => state.resetPassword.email_code);
  const requestedPhoneCode = useAppSelector((state) => state.resetPassword.phone);
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const swedishEID_status = useAppSelector((state) => state.resetPassword.swedishEID_status);
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);

  useEffect(() => {
    if (swedishEID_status === "eidas.mfa_authn_success" || swedishEID_status === "bankid.mfa_authn_success") {
      dispatch(resetPasswordSlice.actions.selectExtraSecurity("swedishEID"));
      resetPasswordContext.resetPasswordService.send({ type: "API_SUCCESS" });
    }
  }, [swedishEID_status]);

  function handleOnClickFreja() {
    (async () => {
      const response = await dispatch(
        eidasMfaAuthenticate({ method: "freja", frontend_action: "resetpwMfaAuthn", frontend_state: emailCode })
      );
      if (eidasMfaAuthenticate.fulfilled.match(response)) {
        if (response.payload.location) {
          window.location.assign(response.payload.location);
        }
      }
    })();
  }

  function handleOnClickBankID() {
    (async () => {
      const response = await dispatch(
        bankIDMfaAuthenticate({ method: "bankid", frontend_action: "resetpwMfaAuthn", frontend_state: emailCode })
      );
      if (bankIDMfaAuthenticate.fulfilled.match(response)) {
        if (response.payload.location) {
          window.location.assign(response.payload.location);
        }
      }
    })();
  }

  function ShowSecurityKey(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("securityKey"));
    startTokenAssertion();
    dispatch(clearNotifications());
    resetPasswordContext.resetPasswordService.send({ type: "CHOOSE_SECURITY_KEY" });
  }

  function startTokenAssertion() {
    const webauthn_challenge = extra_security?.tokens?.webauthn_options;
    if (webauthn_challenge && !webauthn_assertion) {
      dispatch(performAuthentication(webauthn_challenge));
    }
  }

  function toPhoneCodeForm() {
    dispatch(clearNotifications());
    resetPasswordContext.resetPasswordService.send({ type: "CHOOSE_PHONE_VERIFICATION" });
  }

  function continueSetPassword() {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
    dispatch(clearNotifications());
    resetPasswordContext.resetPasswordService.send({ type: "CHOOSE_NO_EXTRA_SECURITY" });
  }

  if (!extra_security) {
    return null;
  }

  return (
    <React.Fragment>
      <h2>
        <FormattedMessage description="extra security heading" defaultMessage="Select an extra security option" />
      </h2>
      <p>
        <FormattedMessage
          description="extra security description"
          defaultMessage="A password reset using an extra security option will keep your account confirmed."
        />
      </p>
      <SecurityKey
        selected_option={selected_option}
        ShowSecurityKey={ShowSecurityKey}
        extraSecurityKey={extra_security.tokens}
      />
      <ExternalMFA
        handleOnClickBankID={handleOnClickBankID}
        handleOnClickFreja={handleOnClickFreja}
        external_mfa={extra_security.external_mfa}
      />
      <SecurityWithSMS
        requestedPhoneCode={requestedPhoneCode}
        extraSecurityPhone={extra_security.phone_numbers}
        toPhoneCodeForm={toPhoneCodeForm}
      />
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
        <a className="text-link" id="continue-without-security" onClick={continueSetPassword}>
          <FormattedMessage description="continue reset password" defaultMessage="Continue reset password" />
        </a>
      </p>
    </React.Fragment>
  );
}
