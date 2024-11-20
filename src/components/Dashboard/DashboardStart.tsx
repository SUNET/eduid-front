import { faHome } from "@fortawesome/free-solid-svg-icons";
import { fetchLetterProofingState } from "apis/eduidLetterProofing";
import Splash from "components/Common/Splash";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { AccountId } from "./AccountId";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import { Recommendations } from "./Recommendations";

/**
 * Renders the start page
 */
export default function Start(): JSX.Element {
  const intl = useIntl();
  const chosen_given_name = useAppSelector((state) => state.personal_data.response?.chosen_given_name);
  const given_name = useAppSelector((state) => state.personal_data.response?.given_name);
  const surname = useAppSelector((state) => state.personal_data.response?.surname);
  const emails = useAppSelector((state) => state.emails.emails);
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const dispatch = useAppDispatch();
  let username;

  if (!chosen_given_name && !given_name && emails.length > 0) {
    username = emails.filter((mail) => mail.primary)[0].email;
  } else if (chosen_given_name) {
    username = `${chosen_given_name} ${surname}`;
  } else if (given_name) {
    username = `${given_name} ${surname}`;
  }

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Start",
      defaultMessage: "Start | eduID",
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      dispatch(fetchLetterProofingState());
    }
  }, [isLoaded]);

  return (
    <Splash showChildren={isLoaded}>
      <DashboardBreadcrumbs pageIcon={faHome} currentPage="Start" />
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
