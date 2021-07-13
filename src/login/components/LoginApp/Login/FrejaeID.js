import React from "react";
import { useSelector } from "react-redux";
import ButtonSecondary from "../../Buttons/ButtonSecondary";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let FrejaeID = ({ translate }) => {
  // compose external link
  const frejaUrlDomain = useSelector((state) => state.config.eidas_url);
  const idp = useSelector((state) => state.config.mfa_auth_idp);
  const mfaPage = window.location.href; // return to mfa page on completion
  // ensure url has one slash at the end to be functional in the link
  const frejaUrlDomainSlash = frejaUrlDomain.endsWith("/")
    ? frejaUrlDomain
    : frejaUrlDomain.concat("/");
  return (
    <div className="secondary">
      <div className="option">
        <p className="heading">
          {translate("login.mfa.secondary-option.title")}
        </p>
        <ButtonSecondary
          type="submit"
          onClick={() => {
            window.location = `${frejaUrlDomainSlash}mfa-authentication?idp=${idp}&next=${mfaPage}`;
          }}
          id="mfa-freja"
        >
          {translate("login.mfa.secondary-option.button")}
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default InjectIntl(FrejaeID);
