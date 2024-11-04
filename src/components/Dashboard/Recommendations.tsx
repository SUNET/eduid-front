import { CredentialType, requestCredentials } from "apis/eduidSecurity";
import { advancedSettingsPath, identityPath, settingsPath } from "components/IndexMain";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import AccordionItemTemplate from "../Common/AccordionItemTemplate";

function AssuranceLevel3(): JSX.Element | null {
  return (
    <AccordionItemTemplate
      title={
        <FormattedMessage
          description="accordion item Assurance Level AL3"
          defaultMessage="Assurance Level AL3 Requirements"
        />
      }
      additionalInfo={
        <FormattedMessage
          description="accordion item Assurance Level AL3"
          defaultMessage="ex: Digital national prov, NICE"
        />
      }
      uuid="assurance-level3"
    >
      <p>
        <strong>
          <FormattedMessage
            description="accordion item Assurance Level AL3"
            defaultMessage="To achieve assurance level AL3, complete the following steps:"
          />
        </strong>
      </p>
      <ol className="listed-steps">
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL3 step1"
            defaultMessage="Go to {link}, Complete connect your identity to your eduID with using swedish alternative"
            values={{
              link: (
                <Link key="verify-identity" to={advancedSettingsPath}>
                  Identity
                </Link>
              ),
            }}
          />
        </li>
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL3 step2"
            defaultMessage="Go to {link}, Add security key for Two-factor authentication(2FA)"
            values={{
              link: (
                <Link key="verify-identity" to={advancedSettingsPath}>
                  Advanced Settings
                </Link>
              ),
            }}
          />
        </li>
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL3 step2"
            defaultMessage="In {link}, Verify the security key using Freja+ or bankID"
            values={{
              link: (
                <Link key="verify-identity" to={advancedSettingsPath}>
                  Advanced Settings
                </Link>
              ),
            }}
          />
        </li>
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL3 step2"
            defaultMessage="Go to {link}, Set the display name you want to use your external services"
            values={{
              link: (
                <Link key="verify-identity" to={settingsPath}>
                  Settings
                </Link>
              ),
            }}
          />
        </li>
      </ol>
    </AccordionItemTemplate>
  );
}

function AssuranceLevel2(): JSX.Element | null {
  return (
    <AccordionItemTemplate
      title={
        <FormattedMessage
          description="accordion item Assurance Level AL2"
          defaultMessage="Assurance Level AL2 Requirements"
        />
      }
      additionalInfo={
        <FormattedMessage
          description="accordion item Assurance Level AL3"
          defaultMessage="ex: Ladok, Higher education institutions, password reset at higher education institutions"
        />
      }
      uuid="assurance-level2"
    >
      <p>
        <strong>
          <FormattedMessage
            description="accordion item Assurance Level AL2"
            defaultMessage="To achieve assurance level AL2, complete the following steps: "
          />
        </strong>
      </p>
      <ol className="listed-steps">
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL2 step1"
            defaultMessage="Go to {link}, Complete connect your identity to your eduID"
            values={{
              link: (
                <Link key="verify-identity" to={identityPath}>
                  Identity
                </Link>
              ),
            }}
          />
        </li>
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL2 step2"
            defaultMessage="Go to {link}, Add a security key for Two-factor authentication(2FA)"
            values={{
              link: (
                <Link key="verify-identity" to={advancedSettingsPath}>
                  Advanced Settings
                </Link>
              ),
            }}
          />
        </li>
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL2 step2"
            defaultMessage="In {link}, Verify the security key using {Freja} or {BankID}"
            values={{
              link: (
                <Link key="verify-identity" to={advancedSettingsPath}>
                  Advanced Settings
                </Link>
              ),
              Freja: <em>Freja+</em>,
              BankID: <em>BankID+</em>,
            }}
          />
        </li>
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL2 step2"
            defaultMessage="Go to {link}, Set the display name you want to use your external services"
            values={{
              link: (
                <Link key="verify-identity" to={settingsPath}>
                  Settings
                </Link>
              ),
            }}
          />
        </li>
      </ol>
    </AccordionItemTemplate>
  );
}

function AssuranceLevel1(): JSX.Element | null {
  return (
    <AccordionItemTemplate
      title={
        <FormattedMessage
          description="accordion item Assurance Level AL1"
          defaultMessage="Assurance Level AL1 Requirements"
        />
      }
      additionalInfo={null}
      uuid="assurance-level1"
    >
      <p>
        <strong>
          <FormattedMessage
            description="accordion item Assurance Level AL1"
            defaultMessage="To achieve assurance level AL1, complete the following steps: "
          />
        </strong>
      </p>
      <ol className="listed-steps">
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL1 step1"
            defaultMessage="Go to {link}, Add a security key for Two-factor authentication(2FA)"
            values={{
              link: (
                <Link key="verify-identity" to={advancedSettingsPath}>
                  Advanced Settings
                </Link>
              ),
            }}
          />
        </li>
        <li>
          <FormattedMessage
            description="accordion item Assurance Level AL1 step2"
            defaultMessage="In {link}, Verify the security key using Freja+ or bankID "
            values={{
              link: (
                <Link key="verify-identity" to={advancedSettingsPath}>
                  Advanced Settings
                </Link>
              ),
            }}
          />
        </li>
      </ol>
    </AccordionItemTemplate>
  );
}

/**
 * This component is responsible for rendering the recommendations accordion.
 */
export function Recommendations(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const given_name = useAppSelector((state) => state.personal_data.response?.given_name);
  const credentials = useAppSelector((state) => state.security.credentials);
  const identities = useAppSelector((state) => state.personal_data.response?.identities);
  const tokens = credentials.filter(
    (cred: CredentialType) =>
      cred.credential_type == "security.u2f_credential_type" ||
      cred.credential_type == "security.webauthn_credential_type"
  );

  useEffect(() => {
    if (isLoaded) {
      // call requestCredentials once app is loaded
      dispatch(requestCredentials());
    }
  }, [isLoaded]);

  if (identities?.nin?.verified && tokens.length && given_name) {
    return null;
  }

  return (
    <article>
      <h2>
        <FormattedMessage description="recommendation title" defaultMessage="Suggested Steps for You" />
      </h2>
      <p>
        <FormattedMessage
          description="recommendation title"
          defaultMessage="To get the most out of eduID, we recommend following the steps below. "
        />
      </p>
      <Accordion allowMultipleExpanded allowZeroExpanded>
        <AssuranceLevel1 />
        <AssuranceLevel2 />
        <AssuranceLevel3 />
      </Accordion>
    </article>
  );
}
