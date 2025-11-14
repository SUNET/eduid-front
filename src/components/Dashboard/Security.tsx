import { MultiFactorAuthentication } from "components/Common/MultiFactorAuthentication";
import { WizardLink } from "components/Common/WizardLink";
import { ACCOUNT_PATH, IDENTITY_PATH } from "components/IndexMain";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";

/* The Dashboard "Advanced Settings" tab */
export function Security(): React.JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Security",
      defaultMessage: "Security | eduID",
    });
  }, [intl]);

  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          <FormattedMessage description="security main title" defaultMessage="Security" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
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
          id: "wizard link back identity",
          defaultMessage: "To Identity Settings",
        })}
        nextLink={ACCOUNT_PATH}
        nextText={intl.formatMessage({
          id: "wizard link next account",
          defaultMessage: "To Account Settings",
        })}
      />
    </React.Fragment>
  );
}
