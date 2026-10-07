import { EduIDButton } from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

/* Informs the user that the SP requires a higher assurance level than the one
 * the IdP is about to assert. The user can still choose to continue (the SP
 * makes the final decision), but is warned that access will probably be denied.
 */
export function AssuranceInfo(props: Readonly<{ onContinue: () => void }>): React.JSX.Element {
  const assurance = useAppSelector((state) => state.login.assurance);
  const service_info = useAppSelector((state) => state.login.service_info);
  const locale = useAppSelector((state) => state.intl.locale);
  const serviceName = service_info?.display_name?.[locale] || service_info?.display_name?.en;

  return (
    <>
      <h1>
        <FormattedMessage
          id="assuranceInfo.title"
          defaultMessage="Log in: More secure login method needed"
          description="Assurance info - title"
        />
      </h1>
      <div className="lead">
        <p>
          {assurance?.required_level === "al3" && assurance?.current_level !== "al1" ? (
            <FormattedMessage
              id="assuranceInfo.lead.securityKey"
              defaultMessage="{serviceName} requires you to log in with a security key that is verified with your identity in eduID."
              description="Assurance info - lead, security key needed"
              values={{
                serviceName: <strong>{serviceName ?? "The service you are logging in to"}</strong>,
              }}
            />
          ) : (
            <FormattedMessage
              id="assuranceInfo.lead"
              defaultMessage="{serviceName} requires you to verify your identity in eduID."
              description="Assurance info - lead"
              values={{
                serviceName: <strong>{serviceName ?? "The service you are logging in to"}</strong>,
              }}
            />
          )}
        </p>
      </div>
      <div className="notice-box">
        <AssuranceHelp />
        <p>
          <FormattedMessage
            id="assuranceInfo.info"
            defaultMessage="You can continue to {serviceName} without verifying, but access will probably be denied."
            description="Assurance info - message"
            values={{
              serviceName: <strong>{serviceName ?? "the service"}</strong>,
            }}
          />
        </p>
      </div>
      <div className="buttons">
        <EduIDButton buttonstyle="primary" onClick={props.onContinue}>
          <FormattedMessage
            id="assuranceInfo.continue"
            defaultMessage="Continue anyway"
            description="Assurance info - continue button"
          />
        </EduIDButton>
      </div>
    </>
  );
}

/* Tell the user what to do to reach the required assurance level:
 * - al1 -> al2: verify your identity
 * - al1 -> al3: verify your identity and add a verified security key
 * - al2 -> al3: add a verified security key
 */
function AssuranceHelp(): React.JSX.Element | null {
  const assurance = useAppSelector((state) => state.login.assurance);

  if (!assurance) {
    return null;
  }

  if (assurance.current_level === "al1" && assurance.required_level === "al3") {
    return (
      <>
        <h5>
          <FormattedMessage
            id="assuranceInfo.help.verifyAndKey"
            defaultMessage="How to get access:"
            description="Assurance info - help, identity not verified and security key needed"
          />
        </h5>
        <ul className="bullets">
          <li>
            <FormattedMessage
              id="assuranceInfo.help.verifyAndKey.step1"
              defaultMessage="Verify your identity on the Identity page, for example with digital ID."
              description="Assurance info - help, step 1 verify identity"
            />
          </li>
          <li>
            <FormattedMessage
              id="assuranceInfo.help.verifyAndKey.step2"
              defaultMessage="Add a security key on the Security page and verify it with your identity."
              description="Assurance info - help, step 2 add security key"
            />
          </li>
          <li>
            <FormattedMessage
              id="assuranceInfo.help.verifyAndKey.step3"
              defaultMessage="Then log in to this service again and you will get access."
              description="Assurance info - help, step 3 log in again"
            />
          </li>
        </ul>
      </>
    );
  }

  if (assurance.current_level === "al1") {
    return (
      <>
        <h5>
          <FormattedMessage
            id="assuranceInfo.help.verify"
            defaultMessage="How to get access:"
            description="Assurance info - help, identity not verified"
          />
        </h5>
        <ul className="bullets">
          <li>
            <FormattedMessage
              id="assuranceInfo.help.verify.step1"
              defaultMessage="Verify your identity on the Identity page, for example with digital ID."
              description="Assurance info - help, verify identity"
            />
          </li>
          <li>
            <FormattedMessage
              id="assuranceInfo.help.verify.step2"
              defaultMessage="Then log in to this service again and you will get access."
              description="Assurance info - help, log in again"
            />
          </li>
        </ul>
      </>
    );
  }

  return (
    <>
      <h5>
        <FormattedMessage
          id="assuranceInfo.help.securityKey"
          defaultMessage="How to get access:"
          description="Assurance info - help, verified security key needed"
        />
      </h5>
      <ul className="bullets">
        <li>
          <FormattedMessage
            id="assuranceInfo.help.securityKey.step1"
            defaultMessage="Add a security key on the Security page and verify it with your identity."
            description="Assurance info - help, add security key"
          />
        </li>
        <li>
          <FormattedMessage
            id="assuranceInfo.help.securityKey.step2"
            defaultMessage="Then log in to this service again and you will get access."
            description="Assurance info - help, log in again"
          />
        </li>
      </ul>
    </>
  );
}
