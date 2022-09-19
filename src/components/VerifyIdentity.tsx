import { eidasVerifyIdentity } from "apis/eduidEidas";
import FrejaeID from "components/Eidas";
import LetterProofing from "components/LetterProofing";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import LookupMobileProofing from "login/components/LookupMobileProofing/LookupMobileProofing";
import React, { Fragment } from "react";
import { Accordion } from "react-accessible-accordion";
import { CircleFlag } from "react-circle-flags";
import { FormattedMessage } from "react-intl";
import AccordionItemTemplate from "./AccordionItemTemplate";
import AddNin from "./AddNin";
import EduIDButton from "./EduIDButton";
import NinDisplay from "./NinDisplay";
import NinForm from "./NinForm";

/* UUIDs of accordion elements that we want to selectively pre-expand */
type accordionUUID = "swedish" | "eu" | "world";
type swedishAccordionUUID = "se-freja";

function VerifyIdentity(): JSX.Element | null {
  const isAppLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);

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
      <div className="intro">
        <h1>
          <FormattedMessage
            description="verify identity unverified main title"
            defaultMessage={`Connect your identity to your eduID`}
          />
        </h1>
        <VerifyIdentityIntro />
      </div>
    </Fragment>
  );
}

function VerifyIdentityIntro(): JSX.Element {
  const identities = useDashboardAppSelector((state) => state.identities);

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
        <div className="lead">
          <p>
            <FormattedMessage
              description="verify identity verified title"
              defaultMessage="Your eduID is ready to use"
            />
          </p>
        </div>
        <h3>
          <FormattedMessage
            description="verify identity verified description"
            defaultMessage="The identities below are now connected to your eduID"
          />
        </h3>
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
      <h3>
        <FormattedMessage
          description="verify identity non verified description"
          defaultMessage="Choose your principal identification method"
        />
      </h3>
      <Accordion allowMultipleExpanded allowZeroExpanded preExpanded={preExpanded}>
        <AccordionItemSwedish />
        <AccordionItemEu />
        <AccordionItemWorld />
      </Accordion>
    </React.Fragment>
  );
}

function VerifiedIdentitiesTable(): JSX.Element {
  const identities = useDashboardAppSelector((state) => state.identities);
  return (
    <figure className="table-responsive identity-summary">
      <table className="table">
        <tbody>
          {identities.nin?.verified && (
            <tr className="border-row">
              <td>
                <CircleFlag countryCode="se" height="35" className="circle-icon" />
              </td>
              <td>
                <strong>
                  <FormattedMessage defaultMessage="Swedish national identity number" description="Verified identity" />
                </strong>
              </td>
              <td>
                <NinDisplay nin={identities.nin} allowDelete={true} />
              </td>
            </tr>
          )}

          {identities.eidas?.verified && (
            <tr className="border-row">
              <td>
                <CircleFlag countryCode="european_union" height="35" className="circle-icon" />
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

  const swedishOptions: swedishAccordionUUID[] = [];

  if (nin) {
    /* If the user has a Swedish NIN, pre-expand the "Swedish" option. */
    swedishOptions.push("se-freja");
  }

  /* Show step two ("use one of these options to verify your NIN") only after step 1 (enter your NIN) is complete,
     and not in case the NIN is already verified. */
  return (
    <AccordionItemTemplate
      icon={<CircleFlag countryCode="se" height="35" className="circle-icon" />}
      title="Swedish personal ID number"
      additionalInfo="With a digital ID-card / By post / By phone"
      uuid="swedish"
    >
      {nin?.verified ? (
        <React.Fragment>
          <NinDisplay />
        </React.Fragment>
      ) : (
        <ol className="listed-steps">
          <li>
            <h4>
              <FormattedMessage description="verify identity add nin heading" defaultMessage="Add your id number" />
            </h4>
            <AddNin />
          </li>
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

            <Accordion
              allowMultipleExpanded
              allowZeroExpanded
              className="accordion accordion-nested x-adjust"
              preExpanded={swedishOptions}
            >
              <FrejaeID />
              <LetterProofing disabled={letterProofingDisabled} />
              <LookupMobileProofing disabled={lookupMobileDisabled} />
            </Accordion>
          </React.Fragment>
        </ol>
      )}
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
      icon={<CircleFlag countryCode="european_union" height="35" className="circle-icon" />}
      title="EU citizen"
      additionalInfo="eIDAS"
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
  return (
    <AccordionItemTemplate
      icon={<CircleFlag countryCode="placeholder" height="35" className="circle-icon" />}
      title="All other countries"
      additionalInfo="Svipe ID"
      uuid="world"
    >
      <p>
        Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti quam
        sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos dolor ut sequi minus iste? Quas?
      </p>
    </AccordionItemTemplate>
  );
}

export default VerifyIdentity;
