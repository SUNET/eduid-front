import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import securityApi from "apis/eduidSecurity";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";
import { appLoadingSlice } from "slices/AppLoading";
import registerIcon from "../../img/register-icon.png";
import securityIcon from "../../img/security-icon.svg";
import EduIDButton from "./Common/EduIDButton";
import Splash from "./Common/Splash";

export function Index() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const frontend_action = useAppSelector((state) => state.authn?.response?.frontend_action);
  const eduid_site_link = useAppSelector((state) => state.config.eduid_site_link);
  const [postDeleteAcccount_trigger] = securityApi.useLazyPostDeleteAccountQuery()

  async function redirectToLogin() {
    dispatch(appLoadingSlice.actions.appLoaded());
    if (dashboard_link) {
      document.location.href = dashboard_link;
    }
  }

  async function deleteAccount() {
    const response = await postDeleteAcccount_trigger();
    if (response.isSuccess) {
      window.location.assign(response.data.payload.location);
    }
  }

  useEffect(() => {
    if (frontend_action === "terminateAccountAuthn") {
      deleteAccount();
    }
  }, [frontend_action]);

  return (
    <Splash showChildren={frontend_action !== "terminateAccountAuthn"}>
      <div className="landing-content horizontal-content-margin">
        <h1 className="tagline">
          <FormattedMessage defaultMessage="Safer and easier login with eduID" description="eduID index" />
        </h1>
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
            defaultMessage="You can read more about eduID at {Sunet} website or in the"
            description="read more at Sunet"
            values={{
              Sunet: (
                <a href="https://www.sunet.se/services/identifiering/eduid" target="_blank">
                  Sunet
                </a>
              ),
            }}
          />
          &nbsp;
          <a className="text-link" href={`${eduid_site_link}/help`} target="_blank">
            <FormattedMessage description="help link" defaultMessage="Help" />
          </a>
          &nbsp;
          <FormattedMessage
            defaultMessage="link in the footer. You can also register or log in using the buttons below!"
            description="read more in the help link"
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
      <div className="flex-between landing-howTo">
        <div>
          <FormattedMessage defaultMessage="Create a basic account with your email address." description="how-to 1" />

          <span className="icon-holder">
            <img height="24" src={registerIcon} alt="Register" />
          </span>
        </div>
        <div>
          <FormattedMessage defaultMessage="Prove that you are YOU." description="how-to 2" />

          <span className="icon-holder">
            <FontAwesomeIcon icon={faIdCard as IconProp} />
          </span>
        </div>
        <div>
          <FormattedMessage defaultMessage="Level up your login security." description="how-to 3" />

          <span className="icon-holder">
            <img height="24" src={securityIcon} alt="Security" />
          </span>
        </div>
        <div>
          <FormattedMessage defaultMessage="Level up again - proving that YOU are logging in." description="how-to 4" />

          <span className="icon-holder">
            <FontAwesomeIcon icon={faIdCard as IconProp} />
            <img height="24" src={securityIcon} alt="Security" />
          </span>
        </div>
      </div>
    </Splash>
  );
}
