import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import EduIDButton from "../../../../components/EduIDButton";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import ResetPasswordLayout from "./ResetPasswordLayout";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import ExtraSecurityToken from "./ExtraSecurityToken";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";
import { clearNotifications, showNotification } from "../../../../reducers/Notifications";
import { ExtraSecurityType } from "../../../redux/slices/resetPasswordSlice";
import Splash from "components/Splash";
import { translate } from "login/translation";
import { FormattedMessage } from "react-intl";

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
    <>
      {!selected_option ? (
        <>
          {Object.values(extraSecurityKey).map((security) => {
            return (
              <Fragment key={security}>
                {
                  <EduIDButton buttonstyle="primary" id="extra-security-key" key={security} onClick={ShowSecurityKey}>
                    {translate("login.mfa.primary-option.button")}
                  </EduIDButton>
                }
              </Fragment>
            );
          })}
        </>
      ) : selected_option === "securityKey" ? (
        <ExtraSecurityToken />
      ) : null}
    </>
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

  const sendConfirmCode = (phone: PhoneInterface) => {
    dispatch(resetPasswordSlice.actions.requestPhoneCode(phone));
  };

  return (
    <>
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
    </>
  );
};

export default function ExtraSecurity(): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [extraSecurity, setExtraSecurity] = useState<ExtraSecurityType | null>(null);
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const emailCode = useAppSelector((state) => state.resetPassword.email_code);
  const suggested_password = useAppSelector((state) => state.resetPassword.suggested_password);
  // compose external link
  const frejaUrlDomain = useAppSelector((state) => state.config.eidas_url);
  const idp = useAppSelector((state) => state.config.mfa_auth_idp);
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const currentPage = window.location.href; // return to current page on completion
  // ensure url has one slash at the end to be functional in the link
  const frejaUrlDomainSlash =
    frejaUrlDomain && frejaUrlDomain.endsWith("/") ? frejaUrlDomain : frejaUrlDomain && frejaUrlDomain.concat("/");

  useEffect(() => {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity(""));
    if (extra_security !== undefined) {
      if (Object.keys(extra_security).length > 0) {
        setExtraSecurity(extra_security);
      }
      if (!Object.keys(extra_security).length) {
        dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
        history.push("/reset-password/set-new-password");
      }
    }
  }, [suggested_password]);

  useEffect(() => {
    if (window.location.search) {
      const message = window.location.search.split("=")[1];
      if (message.includes("completed")) {
        dispatch(resetPasswordSlice.actions.selectExtraSecurity("freja"));
        history.push("/reset-password/set-new-password");
      } else if (message.includes("%3A" + "ERROR%3A")) {
        const error = message.split("%3A" + "ERROR%3A")[1];
        dispatch(showNotification({ message: error, level: "error" }));
        history.push("/reset-password/extra-security");
      }
    }
  }, [emailCode, suggested_password]);

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
    history.push("/reset-password/phone-code-sent");
  };

  return (
    <Splash showChildren={!!extraSecurity}>
      {
        <ResetPasswordLayout
          heading={translate("resetpw.extra-security_heading")}
          description={translate("resetpw.extra-security_description")}
          linkInfoHeading={translate("resetpw.without_extra_security_heading")}
          linkInfoText={translate("resetpw.without_extra_security")}
          linkText={translate("resetpw.continue_reset_password")}
        >
          {extraSecurity && extraSecurity.tokens && Object.keys(extraSecurity.tokens).length > 0 ? (
            <SecurityKeyButton
              selected_option={selected_option}
              ShowSecurityKey={ShowSecurityKey}
              extraSecurityKey={Object.keys(extraSecurity.tokens)}
            />
          ) : null}
          {!selected_option && extraSecurity && extraSecurity.external_mfa && (
            <div>
              <EduIDButton
                type="submit"
                buttonstyle="primary"
                id="extra-security-freja"
                onClick={() => {
                  window.location.href = `${frejaUrlDomainSlash}mfa-authentication?idp=${idp}&next=${currentPage}`;
                  dispatch(clearNotifications());
                }}
              >
                {translate("eidas.freja_eid_ready")}
              </EduIDButton>
            </div>
          )}
          {!selected_option && extraSecurity && extraSecurity.phone_numbers.length > 0 ? (
            <>
              <SecurityWithSMSButton extraSecurityPhone={extraSecurity.phone_numbers} />
              <p className="enter-phone-code">
                {translate("resetpw.received-sms")}&nbsp;
                <a className="text-link" onClick={() => toPhoneCodeForm()}>
                  {translate("resetpw.enter-code")}
                </a>
              </p>
            </>
          ) : null}
        </ResetPasswordLayout>
      }
    </Splash>
  );
}
