import { bankIDVerifyIdentity } from "apis/eduidBankid";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch } from "eduid-hooks";
import { Fragment } from "react";
import { FormattedMessage } from "react-intl";

function BankID(): JSX.Element {
  const dispatch = useAppDispatch();

  async function useBankID() {
    const response = await dispatch(bankIDVerifyIdentity({ method: "bankid" }));
    if (bankIDVerifyIdentity.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

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

      <EduIDButton buttonstyle="primary" size="sm" onClick={useBankID}>
        <FormattedMessage defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>
    </Fragment>
  );
}

export default BankID;
