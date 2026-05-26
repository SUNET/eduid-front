import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import signupApi from "apis/eduidSignup";
import EduIDButton from "components/Common/EduIDButton";
import Splash from "components/Common/Splash";
import { useAppSelector } from "eduid-hooks";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { FormattedMessage } from "react-intl";
import { Fragment } from "react/jsx-runtime";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import EuFlag from "../../../img/flags/EuFlag.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";
import { EmailForm } from "./SignupEmailForm";
import { SignupStepIndicator } from "./SignupStepIndicator";

export const ServiceInfo = () => {
  const signupState = useAppSelector((state) => state.signup.state);
  const idp_service_info = signupState?.idp_service_info;
  const locale = useAppSelector((state) => state.intl.locale);
  const service_name = idp_service_info?.display_name?.[locale] || idp_service_info?.display_name?.["en"] || undefined;

  if (!service_name) return null;
  return (
    <p className="destination-info">
      <FormattedMessage
        defaultMessage="In order to access {name}"
        description="Signup first page lead text"
        values={{ name: <strong>{service_name}</strong> }}
      />
    </p>
  );
};

export function SignupEntry(): React.JSX.Element {
  const [bankIDMfaRegister] = bankIDApi.useLazyBankIDMfaRegisterQuery();
  const [eidasMfaRegister] = eidasApi.useLazyEidasMfaRegisterQuery();
  const [frejaMfaRegister] = frejaeIDApi.useLazyFrejaeIDMfaRegisterQuery();
  const external_mfa = useAppSelector((state) => state.signup.state?.external_mfa);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const currentLocale = useAppSelector((state) => state.intl.locale);
  const regionNames = new Intl.DisplayNames([currentLocale], { type: "region" });
  const { isFetching } = signupApi.useFetchStateQuery();

  const appNameDisplay: Record<string, string> = {
    freja_eid: "Freja eID",
    bankid: "BankID",
    eidas: "eIDAS",
  };

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
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Create eduID: Choose registration method"
            description="Signup first page title"
          />
        </h1>
        <ServiceInfo />
        <div className="lead">
          <p>
            <FormattedMessage
              defaultMessage="The fastest way to register is with a digital ID. your name and identity will be verified automatically."
              description="Signup first page lead text"
            />
          </p>
        </div>
      </section>
      <Splash showChildren={!isFetching}>
        {external_mfa ? (
          <section className="external-mfa-registered">
            <h2>
              <FormattedMessage
                defaultMessage="Your identity has been verified"
                description="external mfa registered heading"
              />
            </h2>
            <p className="text-medium">
              <FormattedMessage
                defaultMessage="Your identity has been verified and your name has been saved. To complete your registration, please enter your email address below."
                description="external mfa registered description"
              />
            </p>

            <figure className="grid-container identity-summary">
              <div>
                <ReactCountryFlag
                  className="flag-icon"
                  aria-label={regionNames.of(external_mfa.country_code)}
                  countryCode={external_mfa.country_code}
                />
              </div>
              <div className="profile-grid-cell">
                <strong>
                  <strong>
                    {appNameDisplay[external_mfa.app_name] ?? external_mfa.app_name.replaceAll("_", " ")}&nbsp;
                    <FormattedMessage defaultMessage="identity" description="Verified identity" />
                  </strong>
                </strong>
              </div>
              {regionNames.of(external_mfa.country_code)}&nbsp;{external_mfa.date_of_birth}
            </figure>

            <EmailForm />
          </section>
        ) : (
          <section className="with-digital-id">
            <h2>
              <FormattedMessage defaultMessage="With a digital ID" description="passkey heading" />
            </h2>
            <p className="text-medium">
              <FormattedMessage defaultMessage="Use BankID, Freja eID or eIDAS to register. Your name and identity will be verified automatically." />
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
        )}

        {!external_mfa && (
          <Fragment>
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
                  <FormattedMessage description="With name and email" defaultMessage="With name and email" />
                </h2>
                <EduIDButton buttonstyle="link sm txt-toggle-btn" onClick={() => setEditMode(!isEditMode)}>
                  {isEditMode ? (
                    <Fragment>
                      <FormattedMessage description="hide form button" defaultMessage="hide form" />
                      &nbsp;
                      <FontAwesomeIcon icon={faChevronUp} />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <FormattedMessage description="show form button" defaultMessage="show form" />
                      &nbsp;
                      <FontAwesomeIcon icon={faChevronDown} />
                    </Fragment>
                  )}
                </EduIDButton>
              </div>
              <p className="text-medium">
                <FormattedMessage
                  description="Signup with email explanation"
                  defaultMessage={`Once you have created an eduID you will be able to log in and
                             connect it to your identity. Make sure to use an email address you have access to, as it will need to be confirmed by a received code. `}
                />
              </p>
              {isEditMode && (
                <div className="edit-data">
                  <EmailForm />
                </div>
              )}
            </section>
          </Fragment>
        )}
      </Splash>
      <SignupStepIndicator currentStep={external_mfa ? 2 : 1} />

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
    </div>
  );
}
