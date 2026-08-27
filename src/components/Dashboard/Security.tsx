import { MultiFactorAuthentication } from "components/Common/MultiFactorAuthentication";
import { WizardLink } from "components/Common/WizardLink";
import { ACCOUNT_PATH, IDENTITY_PATH } from "components/IndexMain";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

/* The Dashboard "Advanced Settings" tab */
export function Security(): React.JSX.Element {
  const intl = useIntl();

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage id="common.security" description="security main title" defaultMessage="Security" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              id="security.title"
              description="security lead title"
              defaultMessage="Enhance and manage the security of your eduID."
            />
          </p>
        </div>
      </section>
      <MultiFactorAuthentication />
      <WizardLink
        previousLink={IDENTITY_PATH}
        previousText={intl.formatMessage({
          id: "security.identity",
          defaultMessage: "To Identity Settings",
        })}
        nextLink={ACCOUNT_PATH}
        nextText={intl.formatMessage({
          id: "security.account",
          defaultMessage: "To Account Settings",
        })}
      />
    </React.Fragment>
  );
}
