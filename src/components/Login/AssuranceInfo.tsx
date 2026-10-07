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
  const serviceName = service_info?.display_name?.en;

  return (
    <>
      <h1>
        <FormattedMessage
          id="assuranceInfo.title"
          defaultMessage="Identity assurance level too low"
          description="Assurance info - title"
        />
      </h1>
      <div className="lead">
        <p>
          <FormattedMessage
            id="assuranceInfo.lead"
            defaultMessage="The service you are logging in to requires a higher identity assurance level than your eduID account currently has."
            description="Assurance info - lead"
          />
        </p>
      </div>
      <div className="notice-box">
        <p>
          <FormattedMessage
            id="assuranceInfo.info"
            defaultMessage="{serviceName} requires assurance level {requiredLevel}, but your current level is {currentLevel}. You can continue, but access will probably be denied by the service."
            description="Assurance info - message"
            values={{
              serviceName: <strong>{serviceName ?? "The service"}</strong>,
              requiredLevel: <strong>{assurance?.required_level}</strong>,
              currentLevel: <strong>{assurance?.current_level}</strong>,
            }}
          />
        </p>
        <p>
          <FormattedMessage
            id="assuranceInfo.help"
            defaultMessage="To raise your assurance level, verify your identity on the Identity page in eduID."
            description="Assurance info - help"
          />
        </p>
      </div>
      <div className="buttons">
        <EduIDButton buttonstyle="primary" onClick={props.onContinue}>
          <FormattedMessage
            id="assuranceInfo.continue"
            defaultMessage="Continue"
            description="Assurance info - continue button"
          />
        </EduIDButton>
      </div>
    </>
  );
}
