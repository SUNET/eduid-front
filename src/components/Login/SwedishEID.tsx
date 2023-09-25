import { bankIDMfaAuthenticate } from "apis/eduidBankid";
import { eidasMfaAuthenticate } from "apis/eduidEidas";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";

import { FormattedMessage } from "react-intl";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";

export function SwedishEID(): JSX.Element {
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const ref = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();
  // TODO: when backend is updated to swedish_eid, we should be able to rename this.
  const notAvailable = !authn_options.freja_eidplus;

  async function handleOnClickBankID() {
    const response = await dispatch(
      bankIDMfaAuthenticate({ method: "bankid", frontend_action: "loginMfaAuthn", frontend_state: ref })
    );
    if (bankIDMfaAuthenticate.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

  async function handleOnClickFrejaeID() {
    const response = await dispatch(
      eidasMfaAuthenticate({ method: "freja", frontend_action: "loginMfaAuthn", frontend_state: ref })
    );
    if (eidasMfaAuthenticate.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

  return (
    <div className="option-wrapper">
      <div className="option">
        <h3>
          <FormattedMessage defaultMessage={`Swedish eID`} />
        </h3>

        {notAvailable && (
          <p className="help-text">
            <FormattedMessage
              description="MFA Freja help text"
              defaultMessage="Requires a confirmed Swedish national identity number."
            />
          </p>
        )}

        <EduIDButton
          buttonstyle="secondary"
          type="submit"
          className="btn-icon"
          onClick={handleOnClickBankID}
          id="mfa-bankid"
          disabled={notAvailable}
        >
          <img height="35" alt="BankID" src={BankIdFlag} />
          <FormattedMessage
            defaultMessage={`Use my {bankID}`}
            values={{ bankID: <span className="verbatim">&nbsp;BankID</span> }}
          />
        </EduIDButton>
        <EduIDButton
          buttonstyle="secondary"
          type="submit"
          onClick={handleOnClickFrejaeID}
          id="mfa-freja"
          className="btn-icon freja-icon"
          disabled={notAvailable}
        >
          <img height="35" alt="Freja+" src={FrejaFlag} />
          <FormattedMessage
            defaultMessage={`Use my {freja_eidplus_verbatim}`}
            values={{ freja_eidplus_verbatim: <span className="verbatim">&nbsp;Freja+</span> }}
          />
        </EduIDButton>
      </div>
    </div>
  );
}
