import { postDeleteAccount } from "apis/eduidSecurity";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { appLoadingSlice } from "slices/AppLoading";
import EduIDButton from "./Common/EduIDButton";
import Splash from "./Common/Splash";

export function Index() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const frontend_action = useAppSelector((state) => state.authn.frontend_action);

  async function redirectToLogin() {
    dispatch(appLoadingSlice.actions.appLoaded());
    if (dashboard_link) {
      document.location.href = dashboard_link;
    }
  }

  async function deleteAccount() {
    const response = await dispatch(postDeleteAccount());
    if (postDeleteAccount.fulfilled.match(response)) {
      window.location.assign(response.payload.location);
    }
  }

  useEffect(() => {
    if (frontend_action === "terminateAccountAuthn") {
      deleteAccount();
    }
  }, [frontend_action]);

  return (
    <Splash showChildren={frontend_action !== "terminateAccountAuthn"}>
      <h1 className="tagline">
        <FormattedMessage defaultMessage="eduID is easier and safer login." description="eduID index" />
      </h1>
      <div className="lead">
        <p>
          <strong>
            <FormattedMessage
              defaultMessage={`Create an eduID and connect it to your identity to gain access to services and 
                organisations related to higher education.`}
              description="eduID index lead text"
            />
          </strong>
        </p>
        <p>
          <FormattedMessage
            defaultMessage={`eduID is easier for you because you only have to remember one password and safer 
              for the Universities because it is connected to a real individual.`}
            description="eduID index lead text"
          />
        </p>
        <p>
          <FormattedMessage
            defaultMessage=" You can read more about eduID at {Sunet}"
            description="read more at Sunet"
            values={{
              Sunet: (
                <a href="https://www.sunet.se/services/identifiering/eduid" target="_blank">
                  Sunet
                </a>
              ),
            }}
          />
        </p>
      </div>
      <div className="buttons">
        <EduIDButton onClick={() => navigate("/register")} buttonstyle="primary" id="sign-up-button">
          <FormattedMessage defaultMessage="Create your eduID" description="Signup button" />
        </EduIDButton>
        <EduIDButton onClick={redirectToLogin} buttonstyle="secondary" id="login-button">
          <FormattedMessage defaultMessage="log in" description="login button" />
        </EduIDButton>
      </div>
    </Splash>
  );
}
