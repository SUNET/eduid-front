import React from "react";
import EduIDButton from "components/EduIDButton";
import { useAppSelector } from "../../../app_init/hooks";
import { translate } from "login/translation";

function FrejaeID(): JSX.Element | null {
  // compose external link
  const frejaUrlDomain = useAppSelector((state) => state.config.eidas_url);
  const idp = useAppSelector((state) => state.config.mfa_auth_idp);
  const startUrl = useAppSelector((state) => state.login.start_url);

  if (!frejaUrlDomain) {
    return null;
  }

  // ensure url has one slash at the end to be functional in the link
  const frejaUrlDomainSlash = frejaUrlDomain.endsWith("/") ? frejaUrlDomain : frejaUrlDomain.concat("/");

  return (
    <div className="option-wrapper">
      <div className="option">
        <h4>{translate("login.mfa.secondary-option.title")}</h4>
        <EduIDButton
          buttonstyle="secondary"
          type="submit"
          onClick={() => {
            window.location.href = `${frejaUrlDomainSlash}mfa-authentication?idp=${idp}&next=${startUrl}`;
          }}
          id="mfa-freja"
        >
          {translate("login.mfa.secondary-option.button")}
        </EduIDButton>
      </div>
    </div>
  );
}

export default FrejaeID;
