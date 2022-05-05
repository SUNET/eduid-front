import LetterProofingButton from "components/LetterProofing";
import EidasContainer from "containers/Eidas";
import OpenidConnectContainer from "containers/OpenidConnect";
import OpenidConnectFrejaContainer from "containers/OpenidConnectFreja";
import { useDashboardAppSelector } from "dashboard-hooks";
import LookupMobileProofing from "login/components/LookupMobileProofing/LookupMobileProofing";
import { translate } from "login/translation";
import React, { Fragment } from "react";
import AddNin from "./AddNin";

// TODO: make a typed slice out of phone (like nins) and move this there
//       (and remove "as PhoneInfo[]" below, since it will be deduced automatically)
interface PhoneInfo {
  number: string;
  verified: boolean;
  primary: boolean;
}

function VerifyIdentity(): JSX.Element | null {
  // page text depend on nin status (verified or not)
  let pageHeading, pageText, vettingButtons;
  const recoverIdentityTip = translate("verify-identity.verified_pw_reset_extra_security");

  const nin = useDashboardAppSelector((state) => state.nins.first_nin);
  const isConfigured = useDashboardAppSelector((state) => state.config.is_configured);
  const phones = useDashboardAppSelector((state) => state.phones.phones as PhoneInfo[]);

  const hasVerifiedNin = !!nin?.verified;
  const hasVerifiedSwePhone = phones.some((phone) => phone.verified && phone.number.startsWith("+46"));

  if (!isConfigured) {
    return null;
  }

  // nin is not verified (add nin)
  const AddNumber = () => {
    pageHeading = translate("verify-identity.unverified_main_title");
    pageText = translate("verify-identity.unverified_page-description");
    return (
      <>
        <div className="intro">
          <h3>{pageHeading}</h3>
          <p>{pageText}</p>
        </div>
        <h4>{translate("verify-identity.add-nin_heading")}</h4>
      </>
    );
  };

  const NumberAdded = () => {
    // nin is verified (nin added)
    pageHeading = translate("verify-identity.verified_main_title");
    pageText = translate("verify-identity.verified_page-description");
    return (
      <>
        <h3>{pageHeading}</h3>
        <p>{pageText}</p>
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

    const buttonHelpText = (msg: string, disabled_if?: boolean) => {
      return <p className={"proofing-btn-help" + (disabled_if === true ? " disabled" : "")}>{translate(msg)}</p>;
    };

    // proofing via letter requires the user to have added a NIN first
    const letterProofingDisabled = !addedNin;
    // proofing via mobile requires the user to have added a NIN first, and have a verified Swedish mobile phone
    const lookupMobileDisabled = !addedNin || !hasVerifiedSwePhone;
    // TODO: Maybe the help texts ought to move into the containers? Isn't that what containers are for - to group components?

    vettingButtons = (
      <div id="nins-btn-grid">
        <div>
          <LetterProofingButton disabled={letterProofingDisabled} />
          {buttonHelpText("letter.initialize_proofing_help_text", letterProofingDisabled)}
        </div>
        <div>
          <LookupMobileProofing disabled={lookupMobileDisabled} />
          {buttonHelpText("lmp.initialize_proofing_help_text", lookupMobileDisabled)}
        </div>
        <div>
          <EidasContainer disabled={disabled} />
          {buttonHelpText("eidas.initialize_proofing_help_text")}
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
        <>
          <h4>{translate("verify-identity.connect-nin_heading")}</h4>
          <p>{translate("verify-identity.connect-nin_description")}</p>
        </>
      );
    } else {
      return <div />;
    }
  };

  return (
    <Fragment>
      <VerifyIdentity_Step1 />
      <AddNin />
      {hasVerifiedNin && <p className="help-text">{recoverIdentityTip}</p>}
      <VerifyIdentity_Step2 />
      {vettingButtons}
    </Fragment>
  );
}

export default VerifyIdentity;
