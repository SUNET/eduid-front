import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import signupApi from "apis/eduidSignup";
import EduIDButton from "components/Common/EduIDButton";
import NotificationModal from "components/Common/NotificationModal";
import Splash from "components/Common/Splash";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { FormattedMessage } from "react-intl";
import { Fragment } from "react/jsx-runtime";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import Eidas from "../../../img/flags/EU_trust_mark_logo_eIDAS.png";
import EuFlag from "../../../img/flags/EuFlag.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";
import GlobalFlag from "../../../img/flags/GlobalFlag.svg";
import SvFlag from "../../../img/flags/SvFlag.svg";
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
  const [frejaMfaRegister] = eidasApi.useLazyFrejaMfaRegisterQuery();
  const [eidasMfaRegister] = eidasApi.useLazyEidasMfaRegisterQuery();
  const [frejaeIDMfaRegister] = frejaeIDApi.useLazyFrejaeIDMfaRegisterQuery();
  const external_mfa = useAppSelector((state) => state.signup.state?.external_mfa);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const currentLocale = useAppSelector((state) => state.intl.locale);
  const regionNames = new Intl.DisplayNames([currentLocale], { type: "region" });
  const { isFetching } = signupApi.useFetchStateQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [externalMfaRegister] = signupApi.useLazyExternalMfaRegisterQuery();
  const [showModal, setShowModal] = useState<boolean>(false);
  const errorMsg = useAppSelector((state) => state.notifications.error?.message);
  const dispatch = useAppDispatch();
  const identity_collision = useAppSelector((state) => state.signup.identity_collision);

  const appNameDisplay: Record<string, string> = {
    freja_eid: "Freja eID",
    freja: "Freja",
    bankid: "BankID",
    eidas: "eIDAS",
  };

  const handleExternalMfa = async (method: "bankid" | "freja" | "freja_eid" | "eidas") => {
    setIsLoading(true);
    const authenticateMap = {
      bankid: bankIDMfaRegister,
      freja: frejaMfaRegister,
      freja_eid: frejaeIDMfaRegister,
      eidas: eidasMfaRegister,
    };

    const response = await authenticateMap[method]();
    if (response.isSuccess && response.data.payload.location) {
      globalThis.location.assign(response.data.payload.location);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (identity_collision) {
      setShowModal(true);
    }
  }, [identity_collision]);

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
              defaultMessage="The fastest way to register is with a digital ID, or you can register with your name and email address instead."
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
                {external_mfa.country_code ? (
                  <ReactCountryFlag
                    className="flag-icon"
                    aria-label={regionNames.of(external_mfa.country_code)}
                    countryCode={external_mfa.country_code}
                  />
                ) : (
                  <ReactCountryFlag className="flag-icon" aria-label="SE" countryCode="SE" />
                )}
              </div>
              <div className="profile-grid-cell">
                <strong>
                  <strong>
                    {(external_mfa.method && appNameDisplay[external_mfa.method]) ??
                      external_mfa.method?.replaceAll("_", " ")}
                    &nbsp;
                    <FormattedMessage defaultMessage="identity" description="Verified identity" />
                  </strong>
                </strong>
              </div>
              {external_mfa.country_code && regionNames.of(external_mfa.country_code)}&nbsp;
              {external_mfa.date_of_birth ?? external_mfa.masked_nin}
            </figure>

            <EmailForm />
          </section>
        ) : (
          <section className="with-digital-id">
            <h2>
              <FormattedMessage defaultMessage="With a digital ID" description="passkey heading" />
            </h2>
            <p className="text-medium">
              <FormattedMessage defaultMessage="Use BankID, Freja, Freja eID or eIDAS to register. Your name and identity will be verified automatically." />
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
            <section className="digital-id-option">
              <div>
                <div className="flex-column">
                  <img height="35" className="circle-icon" alt="Sweden" src={SvFlag} />
                  <div>
                    <span>
                      <strong>
                        <FormattedMessage description="swedish id title" defaultMessage="Swedish ID" />
                      </strong>
                    </span>
                    <p className="help-text">
                      <FormattedMessage
                        description="swedish id help text"
                        defaultMessage="Requires a Swedish personal identity number or coordination number."
                      />
                    </p>
                  </div>
                </div>
                <div className="buttons">
                  <EduIDButton
                    buttonstyle="primary"
                    id="signup-bankid"
                    disabled={isLoading}
                    onClick={() => handleExternalMfa("bankid")}
                  >
                    <img className="circle-icon bankid-icon" height="24" alt="BankID" src={BankIdFlag} />
                    <span>BankID</span>
                  </EduIDButton>
                  <EduIDButton
                    buttonstyle="primary"
                    id="signup-freja"
                    disabled={isLoading}
                    onClick={() => handleExternalMfa("freja")}
                  >
                    <img className="circle-icon freja" height="24" alt="Freja" src={FrejaFlag} />
                    <span>Freja+</span>
                  </EduIDButton>
                </div>
              </div>
              <div>
                <div className="flex-column">
                  <img height="35" className="circle-icon" alt="EU" src={EuFlag} />
                  <div>
                    <span>
                      <strong>
                        <FormattedMessage description="EU title" defaultMessage="EU citizen" />
                      </strong>
                    </span>
                    <p className="help-text">
                      <FormattedMessage
                        description="item EU help text"
                        defaultMessage=" Verify with your country's electronic ID via eIDAS."
                      />
                    </p>
                  </div>
                </div>
                <div className="buttons">
                  <EduIDButton
                    buttonstyle="primary"
                    id="signup-eidas"
                    disabled={isLoading}
                    onClick={() => handleExternalMfa("eidas")}
                  >
                    <img className="circle-icon" height="24" alt="eIDAS" src={Eidas} />
                    <span>eIDAS</span>
                  </EduIDButton>
                </div>
              </div>
              <div>
                <div className="flex-column">
                  <img height="35" className="circle-icon" alt="World" src={GlobalFlag} />
                  <div>
                    <span>
                      <strong>
                        <FormattedMessage description="global title" defaultMessage="Most countries" />
                      </strong>
                    </span>
                    <p className="help-text">
                      <FormattedMessage
                        description="global help text"
                        defaultMessage="Verify with a passport or national ID card via Freja eID+."
                      />
                    </p>
                  </div>
                </div>

                <div className="buttons">
                  <EduIDButton
                    buttonstyle="primary"
                    id="signup-freja-eid"
                    disabled={isLoading}
                    onClick={() => handleExternalMfa("freja_eid")}
                  >
                    <img className="circle-icon" height="24" alt="Freja eID" src={FrejaFlag} />
                    <span>Freja eID</span>
                  </EduIDButton>
                </div>
              </div>
            </section>
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
                  defaultMessage={`Use an email address you have access to, as it will need to be confirmed by a received code. Once you have created an eduID you will be able to log in and
                             verify your identity. `}
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
      <NotificationModal
        id="account-collision-modal"
        title={
          <FormattedMessage
            defaultMessage="An account with this identity already exists"
            description="Collision dialog heading"
          />
        }
        mainText={
          <FormattedMessage
            defaultMessage="This identity already belongs to an eduID account. Do you want to create a new account with it anyway? Your verified identity will be moved to the new account."
            description="Collision dialog description"
          />
        }
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        acceptModal={() => console.log("accept")}
        acceptButtonText={
          <FormattedMessage defaultMessage="Yes, create a new account" description="Collision dialog confirm button" />
        }
      />
      <SignupStepIndicator currentStep={1} />
    </div>
  );
}
