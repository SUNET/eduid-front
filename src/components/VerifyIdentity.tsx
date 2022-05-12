import React, { Fragment } from "react";
import LetterProofingButton from "components/LetterProofing";
import EidasContainer from "containers/Eidas";
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import { useDashboardAppSelector } from "dashboard-hooks";
import LookupMobileProofing from "login/components/LookupMobileProofing/LookupMobileProofing";
import AddNin from "./AddNin";
import { FormattedMessage } from "react-intl";
import { PhoneInfo } from "apis/eduidPhone";

function VerifyIdentity(): JSX.Element | null {
  // page text depend on nin status (verified or not)
  let pageHeading, pageText, vettingButtons;

  const nin = useDashboardAppSelector((state) => state.nins.first_nin);
  const isConfigured = useDashboardAppSelector((state) => state.config.is_configured);
  const phones = useDashboardAppSelector((state) => state.phones.phones as PhoneInfo[]);

  const hasVerifiedNin = !!nin?.verified;
  const hasVerifiedSwePhone = phones.some((phone) => phone.verified && phone.number.startsWith("+46"));

  pageHeading = (
    <FormattedMessage
      description="verify identity unverified main title"
      defaultMessage={`Connect your identity to your eduID`}
    />
  );

  // translate("verify-identity.unverified_main_title");
  pageText = (
    <FormattedMessage
      description={"verify identity unverified description"}
      defaultMessage={`To be able
            to use eduID you have to prove your identity. Add your national id number and verify it in real life.`}
    />
  );

  if (!isConfigured) {
    return null;
  }

  // nin is not verified (add nin)
  const AddNumber = () => {
    return (
      <>
        <h4>
          <FormattedMessage description="verify identity add nin heading" defaultMessage="1. Add your id number" />
        </h4>
      </>
    );
  };

  const NumberAdded = () => {
    // nin is verified (nin added)
    pageHeading = (
      <FormattedMessage description="verify identity verified title" defaultMessage="Your eduID is ready to use" />
    );

    pageText = (
      <FormattedMessage
        id="verify identity verified description"
        defaultMessage={`The below id number is now connected to this eduID. Use your eduID to log in to services related to higher education.`}
      />
    );

    return (
      <>
        <h4>{pageHeading}</h4>
        <p className="x-adjust">{pageText}</p>
      </>
    );
  };

  // top half of page: add nin/nin added
  const VerifyIdentity_Step1 = () => {
    if (hasVerifiedNin) {
      return <NumberAdded />;
    } else {
      return <AddNumber />;
    }
  };

  // this is where the buttons are generated
  // this needs to be outside of <VerifyIdentity_Step2> for the second modal to render
  if (isConfigured && !hasVerifiedNin) {
    // BUG: used to be 'vettingRegistry(!this.props.valid_nin);' but there is no such prop.
    //      I guess the intent was to disable the buttons when the user is verified already?
    const disabled = !undefined;

    const addedNin = !!nin;

    const buttonHelpText = (msg: JSX.Element, disabled_if?: boolean) => {
      return <p className={"proofing-btn-help" + (disabled_if === true ? " disabled" : "")}>{msg}</p>;
    };

    // proofing via letter requires the user to have added a NIN first
    const letterProofingDisabled = !addedNin;
    // proofing via mobile requires the user to have added a NIN first, and have a verified Swedish mobile phone
    const lookupMobileDisabled = !addedNin || !hasVerifiedSwePhone;
    // TODO: Maybe the help texts ought to move into the containers? Isn't that what containers are for - to group components?

    vettingButtons = (
      <div id="nins-btn-grid" className="x-adjust">
        <div>
          <LetterProofingButton disabled={letterProofingDisabled} />
          {buttonHelpText(
            <FormattedMessage
              description="letter initialize proofing help text"
              defaultMessage={`The letter will contain a code that for security reasons expires in two weeks.`}
            />,
            letterProofingDisabled
          )}
        </div>
        <div>
          <LookupMobileProofing disabled={lookupMobileDisabled} />
          {buttonHelpText(
            <FormattedMessage
              description="lmp initialize proofing help text"
              defaultMessage={`The phone number registry is maintained by phone operators at their convenience and may not include all registered phone numbers.`}
            />,
            lookupMobileDisabled
          )}
        </div>
        <div>
          <EidasContainer disabled={disabled} />
          {buttonHelpText(
            <FormattedMessage
              description="eidas initialize proofing help text"
              defaultMessage={`To use this option you will need to first create a digital ID-card in the {freja_eid_link} app.`}
              values={{
                freja_eid_link: (
                  <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">
                    Freja eID+
                  </a>
                ),
              }}
            />
          )}
        </div>
        <div>
          <OpenidConnectContainer disabled={disabled} />
        </div>
        <div>
          <OpenidConnectFrejaContainer disabled={disabled} />
        </div>
      </div>
    );
  }

  // bottom half of page: vetting on added nin
  const VerifyIdentity_Step2 = () => {
    if (!hasVerifiedNin) {
      return (
        <li>
          <h4>
            <FormattedMessage description="verify identity connect nin" defaultMessage={`2. Verify your id number`} />
            ),
          </h4>
          <p className="x-adjust">
            <FormattedMessage
              description="verify-identity.connect-nin_description"
              defaultMessage={`Choose a method to verify that you have access to the added id number. 
              If you are unable to use a method you need to try another.`}
            />
          </p>
        </li>
      );
    } else {
      return (
        <li>
          <h4>
            <FormattedMessage
              defaultMessage={`Improve your identification`}
              description="verify identity improve security heading"
            />
          </h4>
          <p className="x-adjust">
            <FormattedMessage
              defaultMessage={`Add a phone number or a security key to your eduID to keep your identity at 
              password reset under Settings.`}
              description="verify identity improve security description"
            />
          </p>
        </li>
      );
    }
  };

  return (
    <Fragment>
      <div className="intro">
        <h1>{pageHeading}</h1>
        <div className="lead">
          <p>{pageText}</p>
        </div>
      </div>
      <ol className="listed-steps">
        <li>
          <VerifyIdentity_Step1 />
          <AddNin />
        </li>

        <VerifyIdentity_Step2 />
        {vettingButtons}
      </ol>
    </Fragment>
  );
}

export default VerifyIdentity;
