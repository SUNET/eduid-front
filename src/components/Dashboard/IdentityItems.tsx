import { eidasVerifyIdentity } from "apis/eduidEidas";
import { svipeVerifyIdentity } from "apis/eduidSvipe";
import AccordionItemTemplate from "components/Common/AccordionItemTemplate";
import EduIDButton from "components/Common/EduIDButton";
import { FrejaeID } from "components/Login/FrejaeID";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage } from "react-intl";
import EuFlag from "../../../img/flags/eu.svg";
import SeFlag from "../../../img/flags/se.svg";
import WorldFlag from "../../../img/flags/world.svg";
import AddNin from "./AddNin";
import LetterProofing from "./LetterProofing";
import LookupMobileProofing from "./LookupMobileProofing";

export function AccordionItemSwedish(): JSX.Element | null {
  const nin = useDashboardAppSelector((state) => state.identities.nin);
  const phones = useDashboardAppSelector((state) => state.phones.phones);
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
        <FormattedMessage description="accordion item swedish title" defaultMessage="Swedish personal ID number" />
      }
      additionalInfo={
        <FormattedMessage
          description="accordion item swedish additional info"
          defaultMessage="With a digital ID-card / By post / By phone"
        />
      }
      uuid="swedish"
    >
      <ol className="listed-steps">
        <li>
          <h4>
            <FormattedMessage description="verify identity add nin heading" defaultMessage="Add your id number" />
          </h4>
          <AddNin />
        </li>
        <li>
          <h4>
            <FormattedMessage description="verify identity connect nin" defaultMessage="Verify your id number" />
          </h4>
          <p className="x-adjust">
            <FormattedMessage
              description="verify-identity.connect-nin_description"
              defaultMessage={`Choose a suitable method to verify that you have access to the added id number.`}
            />
          </p>
          <Accordion allowMultipleExpanded allowZeroExpanded className="accordion accordion-nested x-adjust">
            <AccordionItemTemplate
              title={
                <FormattedMessage description="eidas vetting button freja" defaultMessage={`with a digital ID-card`} />
              }
              additionalInfo={
                <FormattedMessage
                  description="verify identity vetting freja tagline"
                  defaultMessage={`For you able to create a Freja eID+ by visiting one of the authorised agents`}
                />
              }
              uuid="se-freja"
            >
              <FrejaeID />
            </AccordionItemTemplate>
            <AccordionItemTemplate
              title={<FormattedMessage defaultMessage="by post" description="explanation text for letter proofing" />}
              additionalInfo={
                <FormattedMessage
                  defaultMessage="For you registered at your current address"
                  description="explanation text for letter proofing"
                />
              }
              uuid="se-letter"
              disabled={letterProofingDisabled}
            >
              <LetterProofing disabled={letterProofingDisabled} />
            </AccordionItemTemplate>
            <AccordionItemTemplate
              title={<FormattedMessage defaultMessage="by phone" description="explanation text for vetting phone" />}
              additionalInfo={
                <FormattedMessage
                  defaultMessage="For you with a phone number registered in your name"
                  description="explanation text for vetting phone"
                />
              }
              uuid="se-phone"
              disabled={lookupMobileDisabled}
            >
              <LookupMobileProofing disabled={lookupMobileDisabled} />
            </AccordionItemTemplate>
          </Accordion>
        </li>
      </ol>
    </AccordionItemTemplate>
  );
}

export function AccordionItemEu(): JSX.Element | null {
  const dispatch = useDashboardAppDispatch();

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

export function AccordionItemWorld(): JSX.Element | null {
  const dispatch = useDashboardAppDispatch();
  const svipe_url = useDashboardAppSelector((state) => state.config.svipe_url);

  async function handleOnClick() {
    const response = await dispatch(svipeVerifyIdentity({ method: "svipe_id" }));
    if (svipeVerifyIdentity.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

  if (!svipe_url) {
    return null;
  }

  return (
    <AccordionItemTemplate
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
      <p>
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
      </p>
      <EduIDButton buttonstyle="primary" size="sm" onClick={handleOnClick}>
        <FormattedMessage defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>
    </AccordionItemTemplate>
  );
}
