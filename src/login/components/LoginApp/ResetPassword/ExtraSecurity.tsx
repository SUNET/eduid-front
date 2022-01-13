import React, { Fragment, useEffect, useState } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useHistory } from "react-router-dom";
import EduIDButton from "../../../../components/EduIDButton";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import ResetPasswordLayout from "./ResetPasswordLayout";
import PropTypes from "prop-types";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import ExtraSecurityToken from "./ExtraSecurityToken";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";
import Splash from "../../../../containers/Splash";
import { clearNotifications, showNotification } from "../../../../reducers/Notifications";
import { Dispatch } from "redux";
import { ExtraSecurityType } from "../../../redux/slices/resetPasswordSlice";

interface SecurityKeyButtonProps {
  selected_option?: string;
  extraSecurityKey: Array<string>;
  translate(msg: string): string;
  ShowSecurityKey: React.MouseEventHandler<HTMLButtonElement>;
}

const SecurityKeyButton = ({
  selected_option,
  extraSecurityKey,
  translate,
  ShowSecurityKey,
}: SecurityKeyButtonProps): JSX.Element => {
  return (
    <>
      {!selected_option ? (
        <>
          {Object.values(extraSecurityKey).map((security) => {
            return (
              <Fragment key={security}>
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
              </Fragment>
            );
          })}
        </>
      ) : selected_option === "securityKey" ? (
        <ExtraSecurityToken />
      ) : null}
    </>
  );
};

interface SecurityWithSMSButtonProps {
  extraSecurityPhone: Array<PhoneInterface>;
  //TODO: add specific type
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  translate(msg: string): any;
  dispatch: Dispatch;
  history: {
    push(url: string): void;
  };
  emailCode?: string;
}

export interface PhoneInterface {
  index: number;
  number: string;
  phone_code?: string;
}

const SecurityWithSMSButton = ({
  extraSecurityPhone,
  translate,
  dispatch,
}: SecurityWithSMSButtonProps): JSX.Element => {
  const sendConfirmCode = (phone: PhoneInterface) => {
    dispatch(resetPasswordSlice.actions.requestPhoneCode(phone));
  };

  return (
    <>
      {extraSecurityPhone.map((phone: PhoneInterface) => {
        return (
          <div key={phone.index}>
            {
              <EduIDButton
                className={"settings-button"}
                id="extra-security-phone"
                key={phone.index}
                onClick={() => sendConfirmCode(phone)}
              >
                {translate("resetpw.extra-phone_send_sms")({
                  phone: phone.number.replaceAll("X", "*"),
                })}
              </EduIDButton>
            }
          </div>
        );
      })}
    </>
  );
};

interface ExtraSecurityProps {
  translate(msg: string): string;
}

function ExtraSecurity(props: ExtraSecurityProps): JSX.Element {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [extraSecurity, setExtraSecurity] = useState<ExtraSecurityType | null>(null);
  const selected_option = useAppSelector((state) => state.resetPassword.selected_option);
  const extra_security = useAppSelector((state) => state.resetPassword.extra_security);
  const url = document.location.href;
  const urlCode = url.split("/").reverse()[0];
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
    // dispatch(resetPasswordSlice.actions.cancelWebauthnAssertion());
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
      } else if (message.includes("%3A" + "ERROR%3A")) {
        const error = message.split("%3A" + "ERROR%3A")[1];
        dispatch(showNotification({ message: error, level: "error" }));
        history.push(`/reset-password/extra-security/${emailCode[0]}`);
        dispatch(resetPasswordSlice.actions.saveLinkCode(emailCode[0]));
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
                  window.location.href = `${frejaUrlDomainSlash}mfa-authentication?idp=${idp}&next=${currentPage}`;
                  dispatch(clearNotifications());
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
    </>
  );
}

ExtraSecurity.propTypes = {
  history: PropTypes.object,
  location: PropTypes.shape({ pathname: PropTypes.string }),
  translate: PropTypes.func.isRequired,
};

export default InjectIntl(ExtraSecurity);
