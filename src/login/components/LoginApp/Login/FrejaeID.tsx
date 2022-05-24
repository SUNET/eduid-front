import React from "react";
import EduIDButton from "components/EduIDButton";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useAppSelector } from "../../../app_init/hooks";

interface FrejaeIDProps {
  translate(msg: string): string;
}

const FrejaeID = ({ translate }: FrejaeIDProps): JSX.Element => {
  // compose external link
  const frejaUrlDomain = useAppSelector((state) => state.config.eidas_url);
  const idp = useAppSelector((state) => state.config.mfa_auth_idp);
  const startUrl = useAppSelector((state) => state.login.start_url);
  // ensure url has one slash at the end to be functional in the link
  const frejaUrlDomainSlash = frejaUrlDomain.endsWith("/") ? frejaUrlDomain : frejaUrlDomain.concat("/");

  return (
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
  );
};

export default InjectIntl(FrejaeID);
