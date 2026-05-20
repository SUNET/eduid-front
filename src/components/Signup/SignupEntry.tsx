import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import EduIDButton from "components/Common/EduIDButton";
import { useTheme } from "components/Common/ThemeContext";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Fragment } from "react/jsx-runtime";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import EuFlag from "../../../img/flags/EuFlag.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";
import { EmailForm } from "./SignupEmailForm";

export function SignupEntry(): React.JSX.Element {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [bankIDMfaRegister] = bankIDApi.useLazyBankIDMfaRegisterQuery();
  const [eidasMfaRegister] = eidasApi.useLazyEidasMfaRegisterQuery();
  const [frejaMfaRegister] = frejaeIDApi.useLazyFrejaeIDMfaRegisterQuery();
  const { theme } = useTheme();
  const loginRef = useAppSelector((state) => state.login.ref);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const handleExternalMfa = async (method: "bankid" | "freja_eid" | "eidas") => {
    const authenticateMap = {
      bankid: bankIDMfaRegister,
      freja_eid: frejaMfaRegister,
      eidas: eidasMfaRegister,
    };

    const response = await authenticateMap[method]();
    if (response.isSuccess && response.data.payload.location) {
      globalThis.location.assign(response.data.payload.location);
    }
  };

  return (
    <Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Create eduID: Choose how to register"
            description="Signup first page title"
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="The fastest way to register is with a digital ID. your name and identity will be verified automatically."
              description="Signup first page lead text"
            />
          </p>
        </div>
      </section>
      <section className="with-digital-id">
        <h2>
          <FormattedMessage defaultMessage="With a digital ID" description="passkey heading" />
        </h2>
        <p className="text-medium">
          <FormattedMessage defaultMessage="Use BankID, Freja eID, or eIDAS to register. Your name and identity will be verified automatically." />
        </p>
        <p className="help-text">
          <FormattedMessage
            defaultMessage="Read more about how to register with a digital ID in {howDigitalIDWork}."
            description="digital ID help text"
            values={{
              howDigitalIDWork: (
                <a href="/help#loginPasskeyHeading" target="_blank" rel="noreferrer">
                  <FormattedMessage description="digital ID help text link" defaultMessage="eduID Help" />
                </a>
              ),
            }}
          />
        </p>
        <div className="buttons">
          <EduIDButton buttonstyle="primary" id="signup-bankid" onClick={() => handleExternalMfa("bankid")}>
            <img className="circle-icon bankid-icon" height="24" alt="BankID" src={BankIdFlag} />
            <span>BankID</span>
          </EduIDButton>
          <EduIDButton buttonstyle="primary" id="signup-freja" onClick={() => handleExternalMfa("freja_eid")}>
            <img className="circle-icon freja" height="24" alt="Freja eID" src={FrejaFlag} />
            <span>Freja eID</span>
          </EduIDButton>
          <EduIDButton buttonstyle="primary" id="signup-eidas" onClick={() => handleExternalMfa("eidas")}>
            <img className="circle-icon" height="24" alt="eIDAS" src={EuFlag} />
            <span>eIDAS</span>
          </EduIDButton>
        </div>
      </section>

      <div className="or-container">
        <div className="line"></div>
        <span>
          <FormattedMessage defaultMessage="or register another way" description="Alternative signup option" />
        </span>
        <div className="line"></div>
      </div>

      <section className="personal-data" id="register-with-name">
        <div className="heading">
          <h2>
            <FormattedMessage description="With email and name" defaultMessage="With email and name" />
          </h2>
          <EduIDButton buttonstyle="link sm txt-toggle-btn" onClick={() => setEditMode(!isEditMode)}>
            {isEditMode ? (
              <Fragment>
                <FormattedMessage description="hide form button" defaultMessage="hide form" />
                &nbsp;
                <FontAwesomeIcon icon={faChevronUp as IconProp} />
              </Fragment>
            ) : (
              <Fragment>
                <FormattedMessage description="show form button" defaultMessage="show form" />
                &nbsp;
                <FontAwesomeIcon icon={faChevronDown as IconProp} />
              </Fragment>
            )}
          </EduIDButton>
        </div>
        <p className="text-medium">
          <FormattedMessage defaultMessage="Create your account by providing your email and name. You'll complete a few extra steps. including a captcha, email verification, and security key registration." />
        </p>
        {isEditMode && (
          <div className="edit-data">
            <EmailForm />
          </div>
        )}
      </section>

      {/* <Accordion>
        <AccordionItemTemplate
          title={
            <FormattedMessage
              description="Continue with email and name button"
              defaultMessage="Continue with email and name"
            />
          }
          additionalInfo={""}
          uuid="continue-email-form"
        >
          <EmailForm />
        </AccordionItemTemplate>
      </Accordion> */}
      {/* <WizardLink
        nextText={intl.formatMessage({
          id: "wizard link Continue with email and name",
          defaultMessage: "Continue with email and name",
        })}
        nextOnClick={() => dispatch(signupSlice.actions.setNextPage("SIGNUP_EMAIL_FORM"))}
      /> */}
    </Fragment>
  );
}
