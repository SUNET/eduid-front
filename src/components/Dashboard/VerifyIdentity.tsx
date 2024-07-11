import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faIdCard, faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { eidasVerifyIdentity } from "apis/eduidEidas";
import { svipeVerifyIdentity } from "apis/eduidSvipe";
import FrejaeID from "components/Dashboard/Eidas";
import LetterProofing from "components/Dashboard/LetterProofing";
import LookupMobileProofing from "components/Dashboard/LookupMobileProofing";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { Fragment, useEffect, useState } from "react";
import { Accordion } from "react-accessible-accordion";
import ReactCountryFlag from "react-country-flag";
import { FormattedMessage, useIntl } from "react-intl";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";
import EuFlag from "../../../img/flags/eu.svg";
import SeFlag from "../../../img/flags/se.svg";
import WorldFlag from "../../../img/flags/world.svg";
import AccordionItemTemplate from "../Common/AccordionItemTemplate";

import { removeIdentity } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import NinDisplay from "components/Common/NinDisplay";
import { AuthenticateModal } from "./Authenticate";
import BankID from "./BankID";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";

/* UUIDs of accordion elements that we want to selectively pre-expand */
type accordionUUID = "swedish" | "eu" | "world";
type accordionSwedishUUID = "se-freja" | "se-letter" | "se-phone";

function VerifyIdentity(): JSX.Element | null {
  const isAppLoaded = useAppSelector((state) => state.config.is_app_loaded);

  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Identity",
      defaultMessage: "Identity | eduID",
    });
  }, []);

  const currentPage = intl.formatMessage({
    id: "Identity",
    defaultMessage: "Identity",
    description: "Identity",
  });

  if (!isAppLoaded) {
    /* The accordions preExpanded option is only used at the first render of the component,
     * not on re-renders. Therefore, we _must_ have all data that we're going to use to set
     * preExpanded loaded before we render the accordion below.
     *
     * In reality, this "null" is only returned if the user reloads the page on the Identity tab.
     * Normally, the data is always loaded already when the user navigates to the Identity tab.
     */
    return null;
  }

  return (
    <Fragment>
      <DashboardBreadcrumbs pageIcon={faIdCard} currentPage={currentPage} />
      <VerifyIdentityIntro />
    </Fragment>
  );
}

function VerifyIdentityIntro(): JSX.Element {
  const identities = useAppSelector((state) => state.identities);

  const preExpanded: accordionUUID[] = [];

  if (!identities.is_verified) {
    if (identities.nin) {
      /* If the user has a Swedish NIN, pre-expand the "Swedish" option. */
      preExpanded.push("swedish");
    }
  }

  if (identities.is_verified) {
    /* User has a verified identity. Show which one (or ones) it is.
     *   TODO: Support other types of identities than NINs.
     */
    return (
      <React.Fragment>
        <section className="intro">
          <h1>
            <FormattedMessage
              description="verify identity unverified main title"
              defaultMessage={`Connect your identity to your eduID`}
            />
          </h1>
          <div className="lead">
            <p>
              <FormattedMessage
                description="verify identity verified title"
                defaultMessage="Your eduID is ready to use"
              />
            </p>
          </div>
        </section>
        <article>
          <h2>
            <FormattedMessage
              description="verify identity verified description"
              defaultMessage="The identities below are now connected to your eduID"
            />
          </h2>
          <VerifiedIdentitiesTable />
        </article>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage
            description="verify identity unverified main title"
            defaultMessage={`Connect your identity to your eduID`}
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="verify identity unverified description"
              defaultMessage={`Some services need to know your real life identity. Connect your identity to your eduID
            to get the most benefit from it.`}
            />
          </p>
        </div>
      </section>
      <article>
        <h2>
          <FormattedMessage
            description="verify identity non verified description"
            defaultMessage="Choose your principal identification method"
          />
        </h2>
        <Accordion allowMultipleExpanded allowZeroExpanded preExpanded={preExpanded}>
          <AccordionItemSwedish />
          <AccordionItemEu />
          <AccordionItemWorld />
        </Accordion>
      </article>
    </React.Fragment>
  );
}

function VerifiedIdentitiesTable(): JSX.Element {
  const identities = useAppSelector((state) => state.identities);
  const currentLocale = useAppSelector((state) => state.intl.locale);
  const regionNames = new Intl.DisplayNames([currentLocale], { type: "region" });
  const dispatch = useAppDispatch();
  const [showAuthnModal, setShowAuthnModal] = useState(false);

  async function handleRemoveIdentity() {
    // find dynamically which identity_type
    const idType = Object.keys(identities).filter((objProp) => {
      return objProp !== "is_verified";
    })[0];
    const response = await dispatch(removeIdentity({ identity_type: idType }));
    if (removeIdentity.rejected.match(response)) {
      if ((response?.payload as any).payload.message === "authn_status.must-authenticate") {
        setShowAuthnModal(true);
      }
    }
  }

  return (
    <React.Fragment>
      {identities.nin?.verified && (
        <figure className="grid-container identity-summary">
          <div>
            <img height="35" className="circle-icon" alt="Sweden" src={SeFlag} />
          </div>
          <div className="profile-grid-cell">
            <strong>
              <FormattedMessage defaultMessage="Swedish national identity number" description="Verified identity" />
            </strong>
          </div>
          <NinDisplay nin={identities.nin} allowDelete={true} />
          <EduIDButton
            id="remove-webauthn"
            buttonstyle="close"
            size="sm"
            onClick={() => handleRemoveIdentity()}
          ></EduIDButton>
        </figure>
      )}

      {identities.eidas?.verified && (
        <figure className="grid-container identity-summary">
          <div>
            <img height="35" className="circle-icon" alt="European Union" src={EuFlag} />
          </div>
          <div className="profile-grid-cell">
            <strong>
              <FormattedMessage defaultMessage="European EIDAS identity" description="Verified identity" />
            </strong>
          </div>
          {identities.eidas.country_code}&nbsp;{identities.eidas.date_of_birth}
        </figure>
      )}

      {identities.svipe?.verified && (
        <figure className="grid-container identity-summary">
          <div>
            <ReactCountryFlag
              className="flag-icon"
              aria-label={regionNames.of(identities.svipe.country_code)}
              countryCode={identities.svipe.country_code}
            />
          </div>
          <div className="profile-grid-cell">
            <strong>
              <FormattedMessage defaultMessage="Foreign Svipe identity" description="Verified identity" />
            </strong>
          </div>
          {regionNames.of(identities.svipe.country_code)}&nbsp;{identities.svipe.date_of_birth}
        </figure>
      )}
      <AuthenticateModal
        action="removeIdentity"
        dispatch={dispatch}
        showModal={showAuthnModal}
        setShowModal={setShowAuthnModal}
        mainText={
          <FormattedMessage
            description="remove Security key"
            defaultMessage="To remove your identity, you'll have to log in again. Once logged in, please press the button again."
          />
        }
      />
      {/* verifying with Swedish national number in accordion only possible for users already verified with Eidas or Svipe */}
      {!identities.nin?.verified && (
        <React.Fragment>
          <h2>
            <FormattedMessage
              description="verify identity non verified description"
              defaultMessage="Choose your principal identification method"
            />
          </h2>
          <p>
            <FormattedMessage
              description="verify identity with swedish ID description"
              defaultMessage={`Verify your eduID with a Swedish national ID number.`}
            />
          </p>
          <Accordion allowZeroExpanded>
            <AccordionItemSwedish />
          </Accordion>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

function AccordionItemSwedish(): JSX.Element | null {
  const nin = useAppSelector((state) => state.identities.nin);
  const phones = useAppSelector((state) => state.phones.phones);
  const hasVerifiedSwePhone = phones?.some((phone) => phone.verified && phone.number.startsWith("+46"));
  // this is where the buttons are generated
  const addedNin = Boolean(nin);

  // proofing via letter requires the user to have added a NIN first
  const letterProofingDisabled = !addedNin;
  // proofing via mobile requires the user to have added a NIN first, and have a verified Swedish mobile phone
  const lookupMobileDisabled = !addedNin || !hasVerifiedSwePhone;

  /* Show step two ("use one of these options to verify your NIN") only after step 1 (enter your NIN) is complete,
     and not in case the NIN is already verified. */
  return (
    <AccordionItemTemplate
      icon={<img height="35" className="circle-icon" alt="Sweden" src={SeFlag} />}
      title={
        <FormattedMessage
          description="accordion item swedish title"
          defaultMessage="Swedish personal ID or coordination number"
        />
      }
      additionalInfo={
        <FormattedMessage
          description="accordion item swedish additional info"
          defaultMessage="With a digital ID-card / By post / By phone"
        />
      }
      uuid="swedish"
    >
      {/* <h4>
        <FormattedMessage
          description="verify identity connect nin"
          defaultMessage="Verify that you have access to your id or coordination number"
        />
      </h4> */}
      <p>
        <FormattedMessage
          description="verify-identity.connect-nin_description"
          defaultMessage={`Verify that you have access to your ID- or coordination number.`}
        />
      </p>

      <Accordion allowMultipleExpanded allowZeroExpanded className="accordion accordion-nested">
        <AccordionItemTemplate
          icon={<img height="35" className="circle-icon bankid-icon" alt="BankID" src={BankIdFlag} />}
          title={<FormattedMessage description="BankID vetting button" defaultMessage={`with a BankID`} />}
          additionalInfo={
            <FormattedMessage
              description="verify identity vetting BankID tagline"
              defaultMessage={`For you able to use BankID`}
            />
          }
          uuid="se-bankID"
        >
          <BankID />
        </AccordionItemTemplate>
        <AccordionItemTemplate
          icon={<img height="35" className="circle-icon" alt="Freja+ eID" src={FrejaFlag} />}
          title={<FormattedMessage description="eidas vetting button freja" defaultMessage={`with a Freja+`} />}
          additionalInfo={
            <FormattedMessage
              description="verify identity vetting freja tagline"
              defaultMessage={`For you able to create a Freja+ by using the app or visiting one of the authorised agents`}
            />
          }
          uuid="se-freja"
        >
          <FrejaeID />
        </AccordionItemTemplate>
        <AccordionItemTemplate
          icon={<FontAwesomeIcon icon={faEnvelope as IconProp} className="circle-icon" />}
          title={<FormattedMessage defaultMessage="by post" description="explanation text for letter proofing" />}
          additionalInfo={
            <FormattedMessage
              defaultMessage="For you registered at your current address"
              description="explanation text for letter proofing"
            />
          }
          uuid="se-letter"
          //
        >
          <LetterProofing disabled={letterProofingDisabled} />
        </AccordionItemTemplate>
        <AccordionItemTemplate
          icon={<FontAwesomeIcon icon={faMobileScreen as IconProp} className="circle-icon" />}
          title={<FormattedMessage defaultMessage="by phone" description="explanation text for vetting phone" />}
          additionalInfo={
            <FormattedMessage
              defaultMessage="For you with a phone number registered in your name"
              description="explanation text for vetting phone"
            />
          }
          uuid="se-phone"
          //disabled={lookupMobileDisabled}
        >
          <LookupMobileProofing disabled={lookupMobileDisabled} />
        </AccordionItemTemplate>
      </Accordion>
    </AccordionItemTemplate>
  );
}

function AccordionItemEu(): JSX.Element | null {
  const dispatch = useAppDispatch();

  async function handleOnClick() {
    const response = await dispatch(eidasVerifyIdentity({ method: "eidas" }));
    if (eidasVerifyIdentity.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

  return (
    <AccordionItemTemplate
      icon={<img height="35" className="circle-icon" alt="European Union" src={EuFlag} />}
      title={<FormattedMessage description="accordion item eidas title" defaultMessage="EU citizen" />}
      additionalInfo={
        <FormattedMessage
          description="accordion item eidas additional info"
          defaultMessage="With eIDAS electronic identification"
        />
      }
      uuid="eu"
    >
      <p>
        <FormattedMessage
          description="verify identity"
          defaultMessage={`If you have an electronic ID from a country connected to eIDAS,
                           you can connect it to your eduID.`}
        />
      </p>
      <p>
        <FormattedMessage
          description="verify identity"
          defaultMessage={`The button below will take you to an external site where you log in with your
                         electronic ID to connect your identity to eduID.`}
        />
      </p>
      <EduIDButton buttonstyle={"primary"} size={"sm"} onClick={handleOnClick}>
        <FormattedMessage defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>
    </AccordionItemTemplate>
  );
}

function AccordionItemWorld(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const svipe_service_url = useAppSelector((state) => state.config.svipe_service_url);

  async function handleOnClick() {
    const response = await dispatch(svipeVerifyIdentity({ method: "svipe_id" }));
    if (svipeVerifyIdentity.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

  if (!svipe_service_url) {
    return null;
  }

  return (
    <AccordionItemTemplate
      disabled
      icon={<img height="35" className="circle-icon" alt="World" src={WorldFlag} />}
      title={<FormattedMessage description="accordion item svipe title" defaultMessage="All other countries" />}
      additionalInfo={
        <FormattedMessage
          description="accordion item Svipe ID additional info"
          defaultMessage="With Svipe ID cryptographic identity verification "
        />
      }
      uuid="world"
    >
      {/* <p>
        <FormattedMessage
          description="verify identity"
          defaultMessage="If you have a {Svipe_ID} you can connect it to your eduID."
          values={{
            Svipe_ID: (
              <a href=" https://www.svipe.com/get-started" target="_blank">
                Svipe ID
              </a>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          description="verify identity"
          defaultMessage={`The button below will take you to an external identification site, where you by
          identifying yourself with Svipe ID will verify your identity towards eduID.`}
        /> 
      </p> */}
      <p>
        <FormattedMessage description="svipe-na" defaultMessage={`This option is currently unavailable.`} />
      </p>
      <EduIDButton buttonstyle="primary" size="sm" disabled onClick={handleOnClick}>
        <FormattedMessage defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>
    </AccordionItemTemplate>
  );
}

export default VerifyIdentity;
