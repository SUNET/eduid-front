import { eidasVerifyIdentity } from "apis/eduidEidas";
import Eidas from "components/Eidas";
import LetterProofingButton from "components/LetterProofing";
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import LookupMobileProofing from "login/components/LookupMobileProofing/LookupMobileProofing";
import React, { Fragment } from "react";
import { Accordion } from "react-accessible-accordion";
import { CircleFlag } from "react-circle-flags";
import { FormattedMessage } from "react-intl";
import AccordionItemTemplate from "./AccordionItemTemplate";
import AddNin from "./AddNin";
import EduIDButton from "./EduIDButton";

/* UUIDs of accordion elements that we want to selectively pre-expand */
type accordionUUID = "swedish" | "eu" | "world";

function VerifyIdentity(): JSX.Element | null {
  const isAppLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);
  const identities = useDashboardAppSelector((state) => state.identities);

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

  const preExpanded: accordionUUID[] = [];

  if (identities.is_verified) {
  } else {
    if (identities.nin) {
      /* If the user has a Swedish NIN, pre-expand the "Swedish" option. */
      preExpanded.push("swedish");
    }
  }

  return (
    <Fragment>
      <div className="intro">
        <h1>
          <FormattedMessage
            description="verify identity unverified main title"
            defaultMessage={`Connect your identity to your eduID`}
          />
        </h1>
        <VerifyIdentityIntro />
      </div>

      <Accordion allowMultipleExpanded allowZeroExpanded preExpanded={preExpanded}>
        <AccordionItemSwedish />
        <AccordionItemEu />
        <AccordionItemWorld />
        <AccordionItemNoIcon />
        <AccordionItemOnlyTitle />
      </Accordion>
    </Fragment>
  );
}

function VerifyIdentityIntro(): JSX.Element {
  const identities = useDashboardAppSelector((state) => state.identities);

  if (identities.is_verified) {
    /* User has a verified identity. Show which one (or ones) it is.
     *   TODO: Support other types of identities than NINs.
     */
    return (
      <React.Fragment>
        <h4>
          <FormattedMessage description="verify identity verified title" defaultMessage="Your eduID is ready to use" />
        </h4>
        <p className="x-adjust">
          <FormattedMessage
            description="verify identity verified description"
            defaultMessage="The identities below are now connected to your eduID."
          />
        </p>
        <VerifiedIdentitiesTable />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="lead">
        <p>
          <FormattedMessage
            description="verify identity unverified description"
            defaultMessage={`Some services need to know your real life identity. Connect your identity to your eduID
            to get the most out of it.`}
          />
        </p>
      </div>
    </React.Fragment>
  );
}

function VerifiedIdentitiesTable(): JSX.Element {
  const identities = useDashboardAppSelector((state) => state.identities);
  return (
    <figure className="table-responsive">
      <table className="table">
        <tbody>
          {identities.nin?.verified && (
            <tr className="border-row">
              <td>
                <CircleFlag countryCode="se" height="35" />
              </td>
              <td>
                <strong>
                  <FormattedMessage defaultMessage="Swedish national identity number" description="Verified identity" />
                </strong>
              </td>
              <td>
                <AddNin />
              </td>
            </tr>
          )}

          {identities.eidas?.verified && (
            <tr className="border-row">
              <td>
                <CircleFlag countryCode="european_union" height="35" />
              </td>
              <td>
                <strong>
                  <FormattedMessage defaultMessage="European EIDAS identity" description="Verified identity" />
                </strong>
              </td>
              <td>
                {identities.eidas.country_code}&nbsp;{identities.eidas.date_of_birth}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </figure>
  );
}

function AccordionItemSwedish(): JSX.Element | null {
  const nin = useDashboardAppSelector((state) => state.identities.nin);
  const phones = useDashboardAppSelector((state) => state.phones.phones);
  const hasVerifiedSwePhone = phones.some((phone) => phone.verified && phone.number.startsWith("+46"));

  // this is where the buttons are generated
  const addedNin = Boolean(nin);
  const disabled = false;

  // proofing via letter requires the user to have added a NIN first
  const letterProofingDisabled = !addedNin;
  // proofing via mobile requires the user to have added a NIN first, and have a verified Swedish mobile phone
  const lookupMobileDisabled = !addedNin || !hasVerifiedSwePhone;

  /* Show step two ("use one of these options to verify your NIN") only after step 1 (enter your NIN) is complete,
     and not in case the NIN is already verified. */
  //const showStepTwo = Boolean(nin?.number) && !nin?.verified;
  const showStepTwo = true;

  return (
    <AccordionItemTemplate
      icon={<CircleFlag countryCode="se" height="35" />}
      title="Swedish personal ID number"
      additionalInfo=""
      uuid="swedish"
    >
      <ol className="listed-steps">
        <li>
          <h4>
            <FormattedMessage description="verify identity add nin heading" defaultMessage="Add your id number" />
          </h4>
          <AddNin />
        </li>
        {showStepTwo && (
          <React.Fragment>
            <li>
              <h4>
                <FormattedMessage description="verify identity connect nin" defaultMessage="Verify your id number" />
              </h4>
              <p className="x-adjust">
                <FormattedMessage
                  description="verify-identity.connect-nin_description"
                  defaultMessage={`Choose a method to verify that you have access to the added id number.
          If you are unable to use a method you need to try another.`}
                />
              </p>
            </li>
            <div id="nins-btn-grid" className="x-adjust">
              <LookupMobileProofing disabled={lookupMobileDisabled} />
              <Eidas />
              <OpenidConnectContainer disabled={disabled} />
              <OpenidConnectFrejaContainer disabled={disabled} />
            </div>
            {/* Fixa bättre sätt att lägga till modifierande accordion klass.. samt aktiv item klass! */}
            <Accordion allowZeroExpanded className="accordion accordion-nested">
              <LetterProofingButton disabled={letterProofingDisabled} />
              <PhoneProofingAccordionItem />
            </Accordion>
          </React.Fragment>
        )}
      </ol>
    </AccordionItemTemplate>
  );
}

// function LetterProofingAccordionItem(): JSX.Element | null {
//   return (
//     <AccordionItemTemplate
//       title="Letter to your official address"
//       additionalInfo="Only available in Sweden, and takes 2-10 days"
//       uuid="se-letter"
//     >
//       <p>With this option, a code is sent to your official registered address from the Swedish tax authority.</p>
//       <EduIDButton buttonstyle={"primary"}>Request letter</EduIDButton>
//     </AccordionItemTemplate>
//   );
// }

function PhoneProofingAccordionItem(): JSX.Element | null {
  return (
    <AccordionItemTemplate
      title="Using phone subscription records"
      additionalInfo="Requires a Swedish phone number registered in your name"
      uuid="se-phone"
    >
      <p>Lookup your identity in a database maintained by Swedish phone operators.</p>
      <EduIDButton buttonstyle={"primary"} size={"sm"}>
        Proceed
      </EduIDButton>
    </AccordionItemTemplate>
  );
}

function AccordionItemEu(): JSX.Element | null {
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
      icon={<CircleFlag countryCode="european_union" height="35" />}
      title="EU citizen"
      additionalInfo="eIDAS"
      uuid="eu"
    >
      <p>If you have an electronic ID from a country connected to EIDAS, you can connect it to your eduID.</p>
      <EduIDButton buttonstyle={"primary"} size={"sm"} onClick={handleOnClick}>
        Proceed
      </EduIDButton>
    </AccordionItemTemplate>
  );
}

function AccordionItemWorld(): JSX.Element | null {
  return (
    <AccordionItemTemplate
      icon={<CircleFlag countryCode="placeholder" height="35" />}
      title="All other countries"
      additionalInfo="Svipe ID"
      uuid="world"
    >
      Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti quam
      sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos dolor ut sequi minus iste? Quas?
    </AccordionItemTemplate>
  );
}

function AccordionItemNoIcon(): JSX.Element | null {
  return (
    <AccordionItemTemplate title="No icon Example" additionalInfo="Additional Info">
      Great content
    </AccordionItemTemplate>
  );
}

function AccordionItemOnlyTitle(): JSX.Element | null {
  return (
    <AccordionItemTemplate title="Only title example" additionalInfo="">
      Other great content
    </AccordionItemTemplate>
  );
}

export default VerifyIdentity;
