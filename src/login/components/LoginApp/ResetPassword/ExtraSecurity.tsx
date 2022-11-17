import { eidasMfaAuthenticate } from "apis/eduidEidas";
import { requestPhoneCodeForNewPassword } from "apis/eduidResetPassword";
import React, { Fragment, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import EduIDButton from "../../../../components/EduIDButton";
import { clearNotifications, showNotification } from "../../../../reducers/Notifications";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";
import {
  clearCountdown,
  countFiveMin,
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE,
  setLocalStorage,
} from "../../../components/LoginApp/ResetPassword/CountDownTimer";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import { ExtraSecurityToken } from "./ExtraSecurityToken";

interface SecurityKeyButtonProps {
  selected_option?: string;
  extraSecurityKey: Array<string>;
  ShowSecurityKey: React.MouseEventHandler<HTMLButtonElement>;
}

function SecurityKeyButton({
  selected_option,
  extraSecurityKey,
  ShowSecurityKey,
}: SecurityKeyButtonProps): JSX.Element {
  return (
    <React.Fragment>
      {!selected_option ? (
        <React.Fragment>
          {Object.values(extraSecurityKey).map((security) => {
            return (
              <Fragment key={security}>
                {
                  <div className="buttons">
                    <EduIDButton buttonstyle="primary" id="extra-security-key" key={security} onClick={ShowSecurityKey}>
                      <FormattedMessage description="mfa primary option" defaultMessage="Use security key" />
                    </EduIDButton>
                  </div>
                }
              </Fragment>
            );
          })}
        </React.Fragment>
      ) : selected_option === "securityKey" ? (
        <ExtraSecurityToken />
      ) : null}
    </React.Fragment>
  );
}

interface SecurityWithSMSButtonProps {
  extraSecurityPhone: Array<PhoneInterface>;
}

export interface PhoneInterface {
  index: number;
  number: string;
  phone_code?: string;
}

const SecurityWithSMSButton = ({ extraSecurityPhone }: SecurityWithSMSButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const email_code = useAppSelector((state) => state.resetPassword.email_code);

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
        dispatch(resetPasswordSlice.actions.setGotoUrl("/reset-password/phone-code-sent"));
      }
    }
  }

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export function ExtraSecurity(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const emailCode = useAppSelector((state) => state.resetPassword.email_code);
  const phone = useAppSelector((state) => state.resetPassword.phone);
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const eidas_status = useAppSelector((state) => state.resetPassword.eidas_status);

  useEffect(() => {
    if (eidas_status === "eidas.mfa_authn_success") {
      dispatch(resetPasswordSlice.actions.selectExtraSecurity("freja"));
      dispatch(resetPasswordSlice.actions.setGotoUrl("/reset-password/set-new-password"));
    }
  }, [eidas_status]);

  async function handleOnClickFreja() {
    const response = await dispatch(
      eidasMfaAuthenticate({ method: "freja", frontend_action: "resetpwMfaAuthn", frontend_state: emailCode })
    );
    if (eidasMfaAuthenticate.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

  const ShowSecurityKey = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("securityKey"));
    startTokenAssertion();
    dispatch(clearNotifications());
  };

  const startTokenAssertion = () => {
    const webauthn_challenge = extra_security?.tokens?.webauthn_options;
    if (webauthn_challenge === undefined) {
      // HACK: skip func if no webauthn_challenge
      return undefined;
    } else {
      if (webauthn_assertion === undefined) {
        dispatch(performAuthentication(webauthn_challenge));
      }
    }
  };

  const toPhoneCodeForm = () => {
    dispatch(clearNotifications());
    dispatch(resetPasswordSlice.actions.setGotoUrl("/reset-password/phone-code-sent"));
  };

  const continueSetPassword = () => {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
    dispatch(resetPasswordSlice.actions.setGotoUrl("/reset-password/set-new-password"));
    dispatch(clearNotifications());
  };

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
      {extra_security.tokens && Object.keys(extra_security.tokens).length > 0 ? (
        <SecurityKeyButton
          selected_option={selected_option}
          ShowSecurityKey={ShowSecurityKey}
          extraSecurityKey={Object.keys(extra_security.tokens)}
        />
      ) : null}
      {!selected_option && extra_security.external_mfa && (
        <div className="buttons">
          <EduIDButton type="submit" buttonstyle="primary" id="extra-security-freja" onClick={handleOnClickFreja}>
            <FormattedMessage description="eidas freja eid ready" defaultMessage="Use my Freja eID" />
          </EduIDButton>
        </div>
      )}
      {!selected_option && extra_security.phone_numbers && extra_security.phone_numbers.length > 0 ? (
        <React.Fragment>
          <div className="buttons">
            <SecurityWithSMSButton extraSecurityPhone={extra_security.phone_numbers} />
          </div>
          {phone.index !== undefined && (
            <p className="enter-phone-code">
              <FormattedMessage description="received sms" defaultMessage="Already received sms?" />
              &nbsp;
              <a className="text-link" onClick={() => toPhoneCodeForm()}>
                <FormattedMessage description="enter code" defaultMessage="enter code" />
              </a>
            </p>
          )}
        </React.Fragment>
      ) : null}

      <h4 className="description-without-security">
        <FormattedMessage
          description="without extra security heading"
          defaultMessage="Continue without extra security option"
        />
      </h4>
      <p>
        <FormattedMessage
          description="without extra security description"
          defaultMessage="Your account will require confirmation after the password has been reset."
        />
        &nbsp;
        <a className="text-link" id="continue-without-security" onClick={() => continueSetPassword()}>
          <FormattedMessage description="continue reset password" defaultMessage="Continue reset password" />
        </a>
      </p>
    </React.Fragment>
  );
}
