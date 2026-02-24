import { letterProofingApi } from "apis/eduidLetterProofing";
import Splash from "components/Common/Splash";
import { useAppSelector } from "eduid-hooks";
import { useEffect, useMemo } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { AccountId } from "./AccountId";
import { Recommendations } from "./Recommendations";

/**
 * Renders the start page
 */
export default function Start(): React.JSX.Element {
  const intl = useIntl();
  const chosen_given_name = useAppSelector((state) => state.personal_data.response?.chosen_given_name);
  const given_name = useAppSelector((state) => state.personal_data.response?.given_name);
  const surname = useAppSelector((state) => state.personal_data.response?.surname);
  const emails = useAppSelector((state) => state.emails.emails);
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const [letterProofingState] = letterProofingApi.useLazyLetterProofingStateQuery();

  const username = useMemo(() => {
    if (chosen_given_name) {
      return `${chosen_given_name} ${surname}`;
    }
    if (given_name) {
      return `${given_name} ${surname}`;
    }
    if (emails.length > 0) {
      return emails.find((mail) => mail.primary)?.email ?? "";
    }
    return "";
  }, [chosen_given_name, given_name, surname, emails]);

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Start",
      defaultMessage: "Start | eduID",
    });
  }, [intl]);

  useEffect(() => {
    if (isLoaded) {
      letterProofingState();
    }
  }, [isLoaded, letterProofingState]);

  return (
    <Splash showChildren={isLoaded}>
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Welcome, {username}!"
            description="start main title"
            values={{
              username: <strong>{username}</strong>,
            }}
          />
        </h1>
        <div className="lead">
          <AccountId />
        </div>
      </section>
      <Recommendations />
    </Splash>
  );
}
