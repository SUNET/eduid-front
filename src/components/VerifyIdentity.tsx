import Eidas from "components/Eidas";
import LetterProofingButton from "components/LetterProofing";
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import { useDashboardAppSelector } from "dashboard-hooks";
import LookupMobileProofing from "login/components/LookupMobileProofing/LookupMobileProofing";
import React, { Fragment } from "react";
import { Accordion } from "react-accessible-accordion";
import { CircleFlag } from "react-circle-flags";
import { FormattedMessage } from "react-intl";
import AccordionItemTemplate from "./AccordionItemTemplate";
import AddNin from "./AddNin";

/* UUIDs of accordion elements that we want to selectively pre-expand */
type accordionUUID = "se" | "eu" | "world";

function VerifyIdentity(): JSX.Element | null {
  const isAppLoaded = useDashboardAppSelector((state) => state.config.is_configured);
  const nin = useDashboardAppSelector((state) => state.identities.nin);

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

  let preExpanded: accordionUUID[] = [];

  if (nin) {
    /* If the user has a Swedish NIN, pre-expand the "Swedish" option. */
    preExpanded = ["se"];
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
        <AccordionItemSe />
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
            defaultMessage={`The below id number is now connected to this eduID.
            Use your eduID to log in to services related to higher education.`}
          />
        </p>
        <AddNin />
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

function AccordionItemSe(): JSX.Element | null {
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
  const showStepTwo = Boolean(nin?.number) && !nin?.verified;

  return (
    <AccordionItemTemplate
      icon={<CircleFlag countryCode="se" height="35" />}
      title="Swedish personal ID number"
      additionalInfo=""
      uuid="se"
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
              <LetterProofingButton disabled={letterProofingDisabled} />
              <LookupMobileProofing disabled={lookupMobileDisabled} />
              <Eidas />
              <OpenidConnectContainer disabled={disabled} />
              <OpenidConnectFrejaContainer disabled={disabled} />
            </div>
          </React.Fragment>
        )}
      </ol>
    </AccordionItemTemplate>
  );
}

function AccordionItemEu(): JSX.Element | null {
  return (
    <AccordionItemTemplate
      icon={<CircleFlag countryCode="european_union" height="35" />}
      title="EU citizen"
      additionalInfo="eIDAS"
      uuid="eu"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!
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
    <AccordionItemTemplate icon="" title="No icon Example" additionalInfo="Additional Info">
      Great content
    </AccordionItemTemplate>
  );
}

function AccordionItemOnlyTitle(): JSX.Element | null {
  return (
    <AccordionItemTemplate icon="" title="Only title example" additionalInfo="">
      Other great content
    </AccordionItemTemplate>
  );
}

export default VerifyIdentity;
