import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postDeleteAccount } from "apis/eduidSecurity";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { appLoadingSlice } from "slices/AppLoading";
import accountIcon from "../../img/account-icon.svg";
import securityIcon from "../../img/security-icon.svg";
import EduIDButton from "./Common/EduIDButton";
import Splash from "./Common/Splash";

export function Index() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const frontend_action = useAppSelector((state) => state.authn?.response?.frontend_action);

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
      <div className="landing">
        <h1 className="tagline">
          <FormattedMessage defaultMessage="Safer and easier login with eduID" description="eduID index" />
        </h1>
        <div className="lead">
          <p>
            <strong>
              <FormattedMessage
                defaultMessage={`Create an eduID and connect it to your identity for access to services and 
                organisations related to higher education.`}
                description="eduID index lead text"
              />
            </strong>
          </p>
          <p>
            <FormattedMessage
              defaultMessage={`eduID is easier because you only have one login and safer 
             because it's connected to a real individual - you.`}
              description="eduID index lead text"
            />
          </p>
          <p className="med-txt">
            <FormattedMessage
              defaultMessage="You can read more about eduID at {Sunet} website and by clicking on the eduID {Help} link always in the footer, or go ahead and register or login using the buttons below!"
              description="read more at Sunet"
              values={{
                Sunet: (
                  <a href="https://www.sunet.se/services/identifiering/eduid" target="_blank">
                    Sunets
                  </a>
                ),
                Help: (
                  <Link className="text-link" to={`../../help`} target="_blank">
                    <FormattedMessage description="help link" defaultMessage="Help" />
                  </Link>
                ),
              }}
            />
          </p>
          <div className="buttons">
            <EduIDButton onClick={() => navigate("/register")} buttonstyle="primary" id="sign-up-button">
              <FormattedMessage defaultMessage="Create your eduID" description="Signup button" />
            </EduIDButton>
            <EduIDButton onClick={redirectToLogin} buttonstyle="secondary" id="login-button">
              <FormattedMessage defaultMessage="log in" description="login button" />
            </EduIDButton>
          </div>
        </div>
        <h2 className="heading-5">How it works:</h2>
        <div className="flex-between landing-how-to">
          <div>
            Create a basic account with your email address.
            <span className="icon-holder">
              <img height="24" src={accountIcon} alt="Account" />
            </span>
          </div>
          <div>
            Prove that you are YOU.{" "}
            <span className="icon-holder">
              <FontAwesomeIcon icon={faIdCard as IconProp} />
            </span>
          </div>
          <div>
            Level up your login security.{" "}
            <span className="icon-holder">
              <img height="24" src={securityIcon} alt="Security" />
            </span>
          </div>
          <div>
            Level up again - proving that YOU are logging in.{" "}
            <span className="icon-holder">
              <FontAwesomeIcon icon={faIdCard as IconProp} />
              <img height="24" src={securityIcon} alt="Security" />
            </span>
          </div>
        </div>
      </div>
    </Splash>
  );
}
