import React from "react";
import ButtonSecondary from "../../Buttons/ButtonSecondary";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useAppSelector } from "../../../app_init/hooks";

interface FrejaeIDProps {
  translate(msg: string): string;
}

const FrejaeID = ({ translate }: FrejaeIDProps): JSX.Element => {
  // compose external link
  const frejaUrlDomain = useAppSelector((state) => state.config.eidas_url);
  const idp = useAppSelector((state) => state.config.mfa_auth_idp);
  const startUrl = useAppSelector((state) => state.config.start_url);
  // ensure url has one slash at the end to be functional in the link
  const frejaUrlDomainSlash = frejaUrlDomain.endsWith("/") ? frejaUrlDomain : frejaUrlDomain.concat("/");

  return (
    <div className="secondary" tabIndex={0}>
      <div className="option">
        <p className="heading">{translate("login.mfa.secondary-option.title")}</p>
        <ButtonSecondary
          type="submit"
          onClick={() => {
            window.location.href = `${frejaUrlDomainSlash}mfa-authentication?idp=${idp}&next=${startUrl}`;
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
