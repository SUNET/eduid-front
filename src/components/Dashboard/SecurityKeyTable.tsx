import { WebauthnMethods } from "apis/eduidEidas";
import securityApi, { ActionStatus, CredentialType } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import { filterTokensFromCredentials } from "components/Common/MultiFactorAuthentication";
import NotificationModal from "components/Common/NotificationModal";
import { ToolTip } from "components/Common/ToolTip";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import authnSlice from "slices/Authn";
import passKeyGray from "../../../img/pass-key-gray.svg";
import securityKeyGray from "../../../img/security-key-gray.svg";
import UseSecurityKeyToggle from "./UseSecurityKeyToggle";
interface SecurityKeyTable {
  readonly wrapperRef: React.RefObject<HTMLElement | null>;
  readonly handleVerificationWebauthnToken: (token: string, method: WebauthnMethods) => Promise<void>;
  readonly handleRemoveWebauthnToken: (credential_key: string) => Promise<void>;
}

export function SecurityKeyTable({
  wrapperRef,
  handleVerificationWebauthnToken,
  handleRemoveWebauthnToken,
}: SecurityKeyTable) {
  const credentialKey = useRef<string>("");
  let btnVerify;
  let date_success;
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => {
    return filterTokensFromCredentials(state);
  });
  const [showConfirmRemoveSecurityKeyModal, setShowConfirmRemoveSecurityKeyModal] = useState(false);
  const [getAuthnStatus] = securityApi.useLazyGetAuthnStatusQuery();

  async function handleConfirmDeleteModal(cred: CredentialType) {
    credentialKey.current = JSON.stringify({ credential: cred.key, description: cred.description });
    // Test if the user can directly execute the action or a re-auth security zone will be required
    // If no re-auth is required, then show the modal to confirm the removal
    // else show the re-auth modal and do now show the confirmation modal (show only 1 modal)
    const response = await getAuthnStatus({ frontend_action: "removeSecurityKeyAuthn" });
    if (response.isSuccess && response.data.payload.authn_status === ActionStatus.OK) {
      setShowConfirmRemoveSecurityKeyModal(true);
    } else {
      setShowConfirmRemoveSecurityKeyModal(false);
      // prepare authenticate() and AuthenticateModal
      dispatch(
        authnSlice.actions.setFrontendActionAndState({
          frontend_action: "removeSecurityKeyAuthn",
          frontend_state: credentialKey.current,
        })
      );
      dispatch(authnSlice.actions.setReAuthenticate(true));
    }
  }

  function handleRemoveSecurityKeyAccept() {
    setShowConfirmRemoveSecurityKeyModal(false);
    handleRemoveWebauthnToken(credentialKey.current);
  }

  // data that goes onto the table
  const securityKeyData =
    tokens.length === 0 ? (
      <figure>
        <em className="help-text">
          <FormattedMessage
            description="no security key has been added"
            defaultMessage="No security key has been added"
          />
        </em>
      </figure>
    ) : (
      tokens.map((cred: CredentialType) => {
        // date created
        const date_created = cred.created_ts.slice(0, "YYYY-MM-DD".length);
        const authenticatorIcon = cred.authenticator === "cross-platform" ? securityKeyGray : passKeyGray;
        // date last used
        if (cred.success_ts) {
          date_success = cred.success_ts.slice(0, "YYYY-MM-DD".length);
        } else {
          date_success = <FormattedMessage description="security last used date" defaultMessage="Never used" />;
        }

        // verify button/ verified badge
        if (cred.verified) {
          btnVerify = (
            <div aria-label="verification status" className="verified">
              <span>
                <FormattedMessage description="security key status" defaultMessage="Verification status:" />
                &nbsp;
                <strong>
                  <FormattedMessage description="security verified" defaultMessage="verified" />
                </strong>
              </span>
            </div>
          );
        } else {
          btnVerify = (
            <div aria-label="verify with freja or bankID">
              <span>
                <FormattedMessage description="security key status" defaultMessage="Verify with: " />
                &nbsp;
                <EduIDButton buttonstyle="link sm" onClick={() => handleVerificationWebauthnToken(cred.key, "bankid")}>
                  BankID
                </EduIDButton>
                <EduIDButton buttonstyle="link sm" onClick={() => handleVerificationWebauthnToken(cred.key, "freja")}>
                  Freja+
                </EduIDButton>
                <EduIDButton buttonstyle="link sm" onClick={() => handleVerificationWebauthnToken(cred.key, "eidas")}>
                  Eidas
                </EduIDButton>
              </span>
            </div>
          );
        }

        return (
          <figure
            key={cred.key}
            ref={wrapperRef}
            className={`webauthn-token-holder ${cred.verified ? "verified" : ""}`}
            data-token={cred.key}
          >
            <span className="security-key-icon" aria-hidden="true">
              <img
                className={`${authenticatorIcon} icon`}
                height="20"
                alt={`${authenticatorIcon} icon`}
                src={authenticatorIcon}
              />
            </span>
            <div>
              <div className="flex-between">
                <span aria-label="key name" className="key-name">
                  <FormattedMessage description="security description name" defaultMessage="Name:" />
                  &nbsp;
                  <strong>{cred.description}</strong>
                </span>
                <EduIDButton
                  aria-label="Remove"
                  id="remove-webauthn"
                  buttonstyle="remove sm"
                  onClick={() => handleConfirmDeleteModal(cred)}
                ></EduIDButton>
              </div>

              <div>
                <span aria-label="date created">
                  <FormattedMessage description="security creation date" defaultMessage="Created:" />
                  &nbsp;
                  <wbr />
                  {date_created}
                </span>

                <span aria-label="date used">
                  <FormattedMessage description="security last used" defaultMessage="Used:" />
                  &nbsp;
                  <wbr />
                  {date_success}
                </span>
              </div>
              {btnVerify}
            </div>
          </figure>
        );
      })
    );

  return (
    // unique ID to scroll to the correct section
    <article id="manage-security-keys">
      <div className="flex-between baseline">
        <h2>
          <FormattedMessage description="manage your tokens" defaultMessage="Manage your security keys" />
        </h2>
        <ToolTip />
      </div>

      <p>
        <FormattedMessage
          description="manage tokens paragraph"
          defaultMessage={`Your added security keys can be verified or deleted from the list below and the toggle controls whether a security key should always be used with your eduID.`}
        />
      </p>

      {Boolean(tokens.length) && <UseSecurityKeyToggle />}
      {securityKeyData}
      <NotificationModal
        id="remove-security-key"
        title={
          <FormattedMessage
            defaultMessage="Remove security key"
            description="settings.remove_security_key_modal_title"
          />
        }
        mainText={
          <FormattedMessage
            defaultMessage={`Are you sure you want to remove your security key?`}
            description="delete.remove_security_key_modal_text"
          />
        }
        showModal={showConfirmRemoveSecurityKeyModal}
        closeModal={() => setShowConfirmRemoveSecurityKeyModal(false)}
        acceptModal={handleRemoveSecurityKeyAccept}
        acceptButtonText={<FormattedMessage defaultMessage="Confirm" description="delete.confirm_button" />}
      />
    </article>
  );
}
