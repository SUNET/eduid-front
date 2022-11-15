import { eidasMfaAuthenticate } from "apis/eduidEidas";
import { requestPhoneCodeForNewPassword, verifyEmailLink } from "apis/eduidResetPassword";
import { translate } from "login/translation";
import React, { Fragment, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router";
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
import ExtraSecurityToken from "./ExtraSecurityToken";
import ResetPasswordLayout from "./ResetPasswordLayout";

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
                      {translate("login.mfa.primary-option.button")}
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

interface CodeParams {
  emailCode?: string;
}

export default function ExtraSecurity(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const emailCode = useAppSelector((state) => state.resetPassword.email_code);
  const phone = useAppSelector((state) => state.resetPassword.phone);
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const error = useAppSelector((state) => state.notifications.error);
  const params = useParams() as CodeParams;

  useEffect(() => {
    if (params?.emailCode) {
      dispatch(verifyEmailLink({ email_code: params?.emailCode }));
      if (!error) {
        dispatch(resetPasswordSlice.actions.selectExtraSecurity("freja"));
        dispatch(resetPasswordSlice.actions.setGotoUrl("/reset-password/set-new-password"));
      }
    }
  }, [params?.emailCode, error]);

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
    const webauthn_challenge = extra_security && extra_security.tokens.webauthn_options;
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

  if (!extra_security) {
    return null;
  }

  return (
    <React.Fragment>
      {
        <ResetPasswordLayout
          heading={translate("resetpw.extra-security_heading")}
          description={translate("resetpw.extra-security_description")}
          linkInfoHeading={translate("resetpw.without_extra_security_heading")}
          linkInfoText={translate("resetpw.without_extra_security")}
          linkText={translate("resetpw.continue_reset_password")}
        >
          {extra_security && extra_security.tokens && Object.keys(extra_security.tokens).length > 0 ? (
            <SecurityKeyButton
              selected_option={selected_option}
              ShowSecurityKey={ShowSecurityKey}
              extraSecurityKey={Object.keys(extra_security.tokens)}
            />
          ) : null}
          {!selected_option && extra_security && extra_security.external_mfa && (
            <div className="buttons">
              <EduIDButton type="submit" buttonstyle="primary" id="extra-security-freja" onClick={handleOnClickFreja}>
                {translate("eidas.freja_eid_ready")}
              </EduIDButton>
            </div>
          )}
          {!selected_option && extra_security && extra_security.phone_numbers.length > 0 ? (
            <>
              <div className="buttons">
                <SecurityWithSMSButton extraSecurityPhone={extra_security.phone_numbers} />
              </div>
              {phone.index !== undefined && (
                <p className="enter-phone-code">
                  {translate("resetpw.received-sms")}&nbsp;
                  <a className="text-link" onClick={() => toPhoneCodeForm()}>
                    {translate("resetpw.enter-code")}
                  </a>
                </p>
              )}
            </>
          ) : null}
        </ResetPasswordLayout>
      }
    </React.Fragment>
  );
}
