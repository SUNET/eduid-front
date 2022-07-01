import React, { Fragment } from "react";
import LetterProofingButton from "components/LetterProofing";
import Eidas from "components/Eidas";
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import { useDashboardAppSelector } from "dashboard-hooks";
import LookupMobileProofing from "login/components/LookupMobileProofing/LookupMobileProofing";
import AddNin from "./AddNin";
import { FormattedMessage } from "react-intl";
import AccordionTemplate from "./Accordion";
import { CircleFlag } from "react-circle-flags";
import { Accordion } from "react-accessible-accordion";

function VerifyIdentity(): JSX.Element | null {
  // page text depend on nin status (verified or not)
  let vettingButtons;
  const nin = useDashboardAppSelector((state) => state.identities.nin);
  const isConfigured = useDashboardAppSelector((state) => state.config.is_configured);
  const phones = useDashboardAppSelector((state) => state.phones.phones);
  const hasVerifiedNin = !!nin?.verified;
  const hasVerifiedSwePhone = phones.some((phone) => phone.verified && phone.number.startsWith("+46"));

  if (!isConfigured) {
    return null;
  }

  // this is where the buttons are generated
  if (isConfigured && !hasVerifiedNin) {
    // BUG: used to be 'vettingRegistry(!this.props.valid_nin);' but there is no such prop.
    //      I guess the intent was to disable the buttons when the user is verified already?
    const disabled = !undefined;
    const addedNin = !!nin;

    // proofing via letter requires the user to have added a NIN first
    const letterProofingDisabled = !addedNin;
    // proofing via mobile requires the user to have added a NIN first, and have a verified Swedish mobile phone
    const lookupMobileDisabled = !addedNin || !hasVerifiedSwePhone;

    vettingButtons = (
      <div id="nins-btn-grid" className="x-adjust">
        <LetterProofingButton disabled={letterProofingDisabled} />
        <LookupMobileProofing disabled={lookupMobileDisabled} />
        <Eidas />
        <OpenidConnectContainer disabled={disabled} />
        <OpenidConnectFrejaContainer disabled={disabled} />
      </div>
    );
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
        <div className="lead">
          <p>
            <FormattedMessage
              description="verify identity unverified description"
              defaultMessage={`To be able to use eduID you have to prove your identity. Add your national id number
              and verify it in real life.`}
            />
          </p>
        </div>
      </div>

      {!hasVerifiedNin ? (
        <Fragment>
          <Accordion allowMultipleExpanded allowZeroExpanded>
            <AccordionSe />
            <AccordionEu />
            <AccordionWorld />
            <NoIconExample />
            <OnlyTitleExample />
          </Accordion>

          {/* Move vetting into individual accordion functions? */}
          {vettingButtons}
        </Fragment>
      ) : (
        <Fragment>
          <ol className="listed-steps">
            <li>
              <h4>
                <FormattedMessage
                  description="verify identity verified title"
                  defaultMessage="Your eduID is ready to use"
                />
              </h4>
              <p className="x-adjust">
                <FormattedMessage
                  description="verify identity verified description"
                  defaultMessage={`The below id number is now connected to this eduID. Use your eduID to log in to
                  services related to higher education.`}
                />
              </p>
              <AddNin />
            </li>
            <li>
              <h4>
                <FormattedMessage
                  description="verify identity improve security heading"
                  defaultMessage={`Improve your identification`}
                />
              </h4>
              <p className="x-adjust">
                <FormattedMessage
                  description="verify identity improve security description"
                  defaultMessage={`Add a phone number or a security key to your eduID to keep your identity at
                      password reset under Settings.`}
                />
              </p>
            </li>
          </ol>
        </Fragment>
      )}
    </Fragment>
  );
}

function AccordionSe(): JSX.Element | null {
  return (
    <AccordionTemplate
      icon={<CircleFlag countryCode="se" height="35" />}
      title="Swedish personal ID number"
      additionalInfo=""
      content={
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
                defaultMessage={`Choose a method to verify that you have access to the added id number.
          If you are unable to use a method you need to try another.`}
              />
            </p>
          </li>
        </ol>
      }
    />
  );
}

function AccordionEu(): JSX.Element | null {
  return (
    <AccordionTemplate
      icon={<CircleFlag countryCode="european_union" height="35" />}
      title="EU citizen"
      additionalInfo="eIDAS"
      content={`Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!`}
    />
  );
}

function AccordionWorld(): JSX.Element | null {
  return (
    <AccordionTemplate
      icon={<CircleFlag countryCode="placeholder" height="35" />}
      title="All other countries"
      additionalInfo="Svipe ID"
      content={`Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
  quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
  dolor ut sequi minus iste? Quas?`}
    />
  );
}

function NoIconExample(): JSX.Element | null {
  return <AccordionTemplate icon="" title="No icon Example" additionalInfo="Additional Info" content="Great content" />;
}

function OnlyTitleExample(): JSX.Element | null {
  return <AccordionTemplate icon="" title="Only title example" additionalInfo="" content="Other great content" />;
}

export default VerifyIdentity;
