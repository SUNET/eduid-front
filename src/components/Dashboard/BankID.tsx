import { bankIDApi } from "apis/eduidBankid";
import { EduIDButton } from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import { BANK_ID_URL_EN, BANK_ID_URL_SV } from "helperFunctions/constants";
import { useCallback } from "react";
import { FormattedMessage } from "react-intl";

export function BankID() {
  const locale = useAppSelector((state) => state.intl.locale);
  const [bankIDVerifyIdentity] = bankIDApi.useLazyBankIDVerifyIdentityQuery();
  const bankIdUrl = locale === "en" ? BANK_ID_URL_EN : BANK_ID_URL_SV;

  const useBankID = useCallback(async () => {
    const response = await bankIDVerifyIdentity({ method: "bankid" });
    if (response.isSuccess && response.data.payload.location) {
      globalThis.location.assign(response.data.payload.location);
    }
  }, [bankIDVerifyIdentity]);

  return (
    <>
      <p>
        <FormattedMessage
          description="bankID proofing help text"
          defaultMessage="To use this option you will need to first create a digital ID in the {bankID_link} app."
          values={{
            bankID_link: (
              <a href={bankIdUrl} target="_blank" rel="noreferrer">
                BankID
              </a>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          description="verify identity"
          defaultMessage="The button below will take you to an external identification site, where you by identifying yourself with BankID will verify your identity towards eduID."
        />
      </p>

      <EduIDButton buttonstyle="primary sm" onClick={useBankID} aria-label="Proceed with BankID">
        <FormattedMessage defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>
    </>
  );
}
