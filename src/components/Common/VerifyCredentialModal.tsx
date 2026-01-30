import { WebauthnMethods } from "apis/eduidEidas";
import React from "react";
import { FormattedMessage } from "react-intl";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import EuFlag from "../../../img/flags/EuFlag.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";
import EduIDButton from "./EduIDButton";

interface VerifyCredentialModalProps {
  readonly showVerifyWebauthnModal: boolean;
  readonly setShowVerifyWebauthnModal: (value: boolean) => void;
  readonly handleVerificationWebauthnToken: (token: string | undefined, type: WebauthnMethods) => Promise<void> | void;
  tokenKey: string;
}

export function VerifyCredentialModal(props: Readonly<VerifyCredentialModalProps>): React.JSX.Element {
  return (
    <dialog
      open={props.showVerifyWebauthnModal}
      id="verify-webauthn-token-modal"
      data-backdrop="true"
      aria-modal="true"
      aria-labelledby="verify-webauthn-token-modal-title"
    >
      <div className={props.showVerifyWebauthnModal ? "modal fade show" : "modal"} tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="verify-webauthn-token-modal-title">
                <FormattedMessage
                  defaultMessage="Verify your added security key"
                  description="verify webauthn token modal title"
                />
              </h4>
              <EduIDButton
                id="verify-webauthn-token-modal-close-button"
                buttonstyle="close float-right"
                onClick={() => props.setShowVerifyWebauthnModal(false)}
              ></EduIDButton>
            </div>
            <div className="modal-body">
              <FormattedMessage
                description="verify webauthn token modal body text"
                defaultMessage="Please click either the BankID, Freja+ or eIDAS button to verify your security key"
              />
              <p className="help-text">
                <FormattedMessage
                  description="verify webauthn token modal body note text"
                  defaultMessage={`Note: your added security keys can also be verified later in the "Manage your security keys" settings.`}
                />
              </p>
            </div>
            <div className="modal-footer">
              <div className="buttons">
                <EduIDButton
                  id="verify-webauthn-token-modal-continue-bankID-button"
                  buttonstyle="primary icon"
                  aria-label="Proceed with BankID"
                  onClick={() => props.handleVerificationWebauthnToken(props.tokenKey, "bankid")}
                >
                  <img className="circle-icon bankid-icon" height="24" alt="BankID" src={BankIdFlag} />
                  <span>BankID</span>
                </EduIDButton>
                <EduIDButton
                  buttonstyle="primary icon"
                  id="verify-webauthn-token-modal-continue-frejaID-button"
                  aria-label="Proceed with Freja eID"
                  onClick={() => props.handleVerificationWebauthnToken(props.tokenKey, "freja")}
                >
                  <img className="freja" height="24" alt="Freja+" src={FrejaFlag} />
                  <span>Freja+</span>
                </EduIDButton>
                <EduIDButton
                  buttonstyle="primary icon"
                  id="verify-webauthn-token-modal-continue-eidas-button"
                  aria-label="Proceed with eIDAS"
                  onClick={() => props.handleVerificationWebauthnToken(props.tokenKey, "eidas")}
                >
                  <img className="freja" height="24" alt="eIDAS" src={EuFlag} />
                  <span>eidas</span>
                </EduIDButton>
              </div>
              <EduIDButton
                id="verify-webauthn-token-modal-close-link"
                buttonstyle="link verbatim"
                onClick={() => props.setShowVerifyWebauthnModal(false)}
              >
                <FormattedMessage description="verify later link" defaultMessage={`Not now`} />
              </EduIDButton>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
