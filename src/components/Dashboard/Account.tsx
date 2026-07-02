import { WizardLink } from "components/Common/WizardLink";
import { AccountIdDisplay } from "components/Dashboard/AccountId";
import { ChangePasswordDisplay } from "components/Dashboard/ChangePasswordDisplay";
import { DeleteAccount } from "components/Dashboard/DeleteAccount";
import { Emails } from "components/Dashboard/Emails";
import { LanguagePreference } from "components/Dashboard/Language";
import { SECURITY_PATH } from "components/IndexMain";
import { FormattedMessage, useIntl } from "react-intl";
import { AccountLinking } from "./AccountLinking";
import { LadokContainer } from "./Ladok";

/* The Dashboard "Account settings" tab */
export function Account() {
  const intl = useIntl();

  return (
    <>
      <section className="intro">
        <h1>
          <FormattedMessage description="settings main title" defaultMessage="Account" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="account settings lead title"
              defaultMessage="Update your eduID account settings, change password or delete your eduID."
            />
          </p>
        </div>
      </section>
      <AccountIdDisplay />
      <Emails />
      <LanguagePreference />
      <ChangePasswordDisplay />
      <AccountLinking />
      <LadokContainer />
      <DeleteAccount />
      <WizardLink
        previousLink={SECURITY_PATH}
        previousText={intl.formatMessage({
          id: "wizard link back security",
          defaultMessage: "To Security Settings",
        })}
      />
    </>
  );
}
