import EduIDButton from "components/Common/EduIDButton";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";

function BankID(): JSX.Element {
  // const bank_id_url = useDashboardAppSelector((state) => state.config.bank_id_url);
  // const token_verify_idp = useDashboardAppSelector((state) => state.config.token_verify_idp);
  // let eidas_sp_url = bank_id_url;
  // const freja_idp_url = token_verify_idp;

  // if (eidas_sp_url && !eidas_sp_url.endsWith("/")) {
  //   eidas_sp_url = eidas_sp_url.concat("/");
  // }

  // function useBankID(event?: React.MouseEvent<HTMLElement>) {
  //   if (event) {
  //     event.preventDefault();
  //   }

  //   window.location.href = bankidURL;
  // }

  return (
    <Fragment>
      <p className="proofing-btn-help">
        <FormattedMessage
          description="bankID proofing help text"
          defaultMessage={`To use this option you will need to first create a digital ID-card in the 
            {bankID_link} app.`}
          values={{
            bankID_link: (
              <a href="https://www.bankid.com/privat/skaffa-bankid" target="_blank">
                BankID
              </a>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          description="verify identity"
          defaultMessage={`The button below will take you to an external identification site, where you by
          identifying yourself with BankID will verify your identity towards eduID.`}
        />
      </p>

      <EduIDButton buttonstyle="primary" size="sm" onClick={() => console.log("hi")}>
        <FormattedMessage defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>
    </Fragment>
  );
}

export default BankID;
