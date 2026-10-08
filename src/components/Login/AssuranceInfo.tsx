import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons/faCircleExclamation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);

  const goToDashboard = () => {
    if (dashboard_link) {
      document.location.href = dashboard_link;
    }
  };

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
      <div className="status-box m-b-md">
        <div className="checkbox-wrapper">
          <FontAwesomeIcon icon={faCircleExclamation} className="disabled" />
        </div>
        <div className="text-wrapper">
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
      </div>
      <AssuranceHelp />
      <div className="buttons-center">
        <EduIDButton buttonstyle="primary" onClick={props.onContinue}>
          <FormattedMessage
            id="assuranceInfo.continue"
            defaultMessage="Continue anyway"
            description="Assurance info - continue button"
          />
        </EduIDButton>
        <EduIDButton id="to-eduid-link" buttonstyle="link normal-case" onClick={goToDashboard}>
          <FormattedMessage id="common.goToEduid" defaultMessage="go to eduID" description="Login MFA link" />
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
  const heading = (
    <h2>
      <FormattedMessage
        id="multiFactorAuth.optionsHeading"
        defaultMessage="Options available in the eduID settings:"
        description="Login MFA"
      />
    </h2>
  );

  if (!assurance) {
    return null;
  }

  if (assurance.current_level === "al1" && assurance.required_level === "al3") {
    return (
      <>
        {heading}
        <ul className="bullets">
          <li>
            <FormattedMessage
              id="assuranceInfo.help.verifyAndKey.step1"
              defaultMessage="Click Go to eduID below, then go to the Identity page. Choose an identity verification method available to you, such as BankID or Freja+, eIDAS and follow the instructions to verify your identity."
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
        {heading}
        <ul className="bullets">
          <li>
            <FormattedMessage
              id="assuranceInfo.help.verify.step1"
              defaultMessage="Click Go to eduID below, then go to the Identity page. Choose an identity verification method available to you, such as BankID or Freja+, eIDAS and follow the instructions to verify your identity."
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
      {heading}
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
