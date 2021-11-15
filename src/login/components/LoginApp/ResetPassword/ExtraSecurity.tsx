import React, { useEffect, useState } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from "react-router-dom";
import EduIDButton from "../../../../components/EduIDButton";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import ResetPasswordLayout from "./ResetPasswordLayout";
import PropTypes from "prop-types";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import ExtraSecurityToken from "./ExtraSecurityToken";
import { assertionFromAuthenticator } from "../../../app_utils/helperFunctions/authenticatorAssertion";
import Splash from "../../../../containers/Splash";
import { eduidRMAllNotify, eduidNotify } from "../../../../actions/Notifications";
import { Dispatch } from "redux";

interface SecurityKeyButtonProps {
  selected_option: string | null;
  extraSecurityKey: Array<any>;
  translate(msg: string): string;
  ShowSecurityKey: React.MouseEventHandler<HTMLButtonElement>;
}

const SecurityKeyButton = ({
  selected_option,
  extraSecurityKey,
  translate,
  ShowSecurityKey,
}: SecurityKeyButtonProps) => {
  return (
    <>
      {!selected_option ? (
        <>
          {Object.values(extraSecurityKey).map((security) => {
            return (
              <>
                {
                  <EduIDButton
                    className={"settings-button"}
                    id="extra-security-key"
                    key={security}
                    onClick={ShowSecurityKey}
                  >
                    {translate("login.mfa.primary-option.button")}
                  </EduIDButton>
                }
              </>
            );
          })}
        </>
      ) : selected_option === "securityKey" ? (
        <ExtraSecurityToken />
      ) : null}
      ;
    </>
  );
};

type ExtraSecurityPhoneInfo = Object[];

// interface ExtraSecurityPhone extends Array<ExtraSecurityPhoneInfo> {}

interface SecurityWithSMSButtonProps {
  extraSecurityPhone: ExtraSecurityPhoneInfo;
  translate(msg: string): any;
  dispatch: Dispatch;
  history: {
    push(url: string): void;
  };
  emailCode: string | null;
}

const SecurityWithSMSButton = ({ extraSecurityPhone, translate, dispatch }: SecurityWithSMSButtonProps) => {
  const sendConfirmCode = (phone: object) => {
    dispatch(resetPasswordSlice.actions.requestPhoneCode(phone));
  };

  return extraSecurityPhone.map((phone: any) => {
    return (
      <div key={phone.index}>
        <EduIDButton
          className={"settings-button"}
          id="extra-security-phone"
          key={phone.index}
          onClick={() => sendConfirmCode(phone)}
        >
          {translate("resetpw.extra-phone_send_sms")({
            phone: phone.number.replace(/^.{10}/g, "**********"),
          })}
        </EduIDButton>
      </div>
    );
  });
};

interface ExtraSecurityProps {
  translate(msg: string): string;
}

function ExtraSecurity(props: ExtraSecurityProps): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [extraSecurity, setExtraSecurity] = useState(null as any);
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const url = document.location.href;
  const urlCode = url.split("/").reverse()[0];
  const emailCode = useAppSelector((state) => state.resetPassword.email_code);
  const suggested_password = useAppSelector((state) => state.resetPassword.suggested_password);
  // compose external link
  const frejaUrlDomain = useAppSelector((state) => state.config.eidas_url);
  const idp = useAppSelector((state) => state.config.mfa_auth_idp);
  const mfaPage = window.location.href; // return to mfa page on completion
  // ensure url has one slash at the end to be functional in the link
  const frejaUrlDomainSlash =
    frejaUrlDomain && frejaUrlDomain.endsWith("/") ? frejaUrlDomain : frejaUrlDomain && frejaUrlDomain.concat("/");

  useEffect(() => {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity(null));
    dispatch(resetPasswordSlice.actions.cancelWebauthnAssertion());
    if (extra_security !== undefined) {
      if (Object.keys(extra_security).length > 0) {
        setExtraSecurity(extra_security);
      }
      if (!Object.keys(extra_security).length) {
        dispatch(resetPasswordSlice.actions.selectExtraSecurity("without"));
        history.push(`/reset-password/set-new-password/${emailCode}`);
      }
    }
  }, [suggested_password]);

  useEffect(() => {
    if (window.location.search) {
      const message = window.location.search.split("=")[1];
      const emailCode = urlCode.split("?");
      if (message.includes("completed")) {
        dispatch(resetPasswordSlice.actions.selectExtraSecurity("freja"));
        history.push(`/reset-password/set-new-password/${emailCode[0]}`);
      } else if (message.includes("%3AERROR%3A")) {
        const error = message.split("%3AERROR%3A")[1];
        dispatch(eduidNotify(error, "errors"));
        history.push(`/reset-password/extra-security/${emailCode[0]}`);
        dispatch(resetPasswordSlice.actions.saveLinkCode(emailCode[0]));
      }
    }
  }, [emailCode, suggested_password]);

  const ShowSecurityKey = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("securityKey"));
    startTokenAssertion();
    dispatch(eduidRMAllNotify());
  };

  const startTokenAssertion = () => {
    const webauthn_challenge = extra_security.tokens.webauthn_options;
    if (extra_security.tokens.webauthn_options) {
      assertionFromAuthenticator(webauthn_challenge, dispatch);
    }
  };

  const toPhoneCodeForm = () => {
    dispatch(eduidRMAllNotify());
    history.push(`/reset-password/phone-code-sent/${emailCode}`);
  };

  return (
    <>
      {
        <ResetPasswordLayout
          heading={props.translate("resetpw.extra-security_heading")}
          description={props.translate("resetpw.extra-security_description")}
          linkInfoHeading={props.translate("resetpw.without_extra_security_heading")}
          linkInfoText={props.translate("resetpw.without_extra_security")}
          linkText={props.translate("resetpw.continue_reset_password")}
          emailCode={emailCode}
        >
          {!extraSecurity && <Splash />}
          {extraSecurity && extraSecurity.tokens && Object.keys(extraSecurity.tokens).length > 0 ? (
            <SecurityKeyButton
              selected_option={selected_option}
              ShowSecurityKey={ShowSecurityKey}
              extraSecurityKey={Object.keys(extraSecurity.tokens)}
              translate={props.translate}
            />
          ) : null}
          {!selected_option && extraSecurity && extraSecurity.external_mfa && (
            <div>
              <EduIDButton
                type="submit"
                className="settings-button"
                id="extra-security-freja"
                onClick={() => {
                  window.location.href = `${frejaUrlDomainSlash}mfa-authentication?idp=${idp}&next=${mfaPage}`;
                  dispatch(eduidRMAllNotify());
                }}
              >
                {props.translate("eidas.freja_eid_ready")}
              </EduIDButton>
            </div>
          )}
          {!selected_option && extraSecurity && extraSecurity.phone_numbers.length > 0 ? (
            <>
              <SecurityWithSMSButton
                extraSecurityPhone={extraSecurity.phone_numbers}
                translate={props.translate}
                dispatch={dispatch}
                history={history}
                emailCode={emailCode}
              />
              <p className="enter-phone-code">
                {props.translate("resetpw.received-sms")}
                <a onClick={() => toPhoneCodeForm()}>{props.translate("resetpw.enter-code")} </a>
              </p>
            </>
          ) : null}
        </ResetPasswordLayout>
      }
      ;
    </>
  );
}

ExtraSecurity.propTypes = {
  history: PropTypes.object,
  location: PropTypes.shape({ pathname: PropTypes.string }),
  translate: PropTypes.func.isRequired,
};

export default InjectIntl(ExtraSecurity);
