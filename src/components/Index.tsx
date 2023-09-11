import { fetchJsConfig } from "apis/eduidJsConfig";
import { LOGIN_CONFIG_URL } from "globals";
import { useIndexAppDispatch, useIndexAppSelector as useLoginAppSelector } from "index-hooks";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { appLoadingSlice } from "slices/AppLoading";
import EduIDButton from "./Common/EduIDButton";

export function Index() {
  const navigate = useNavigate();
  const dispatch = useIndexAppDispatch();
  const dashboard_url = useLoginAppSelector((state) => state.config.dashboard_url);

  async function getLoginConfig() {
    const config = await dispatch(fetchJsConfig({ url: LOGIN_CONFIG_URL }));
    if (fetchJsConfig.fulfilled.match(config)) {
      dispatch(appLoadingSlice.actions.appLoaded());
      if (dashboard_url) {
        document.location.href = dashboard_url;
      }
    }
  }
  return (
    <>
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
        <EduIDButton onClick={getLoginConfig} buttonstyle="secondary" id="login-button">
          <FormattedMessage defaultMessage="log in" description="login button" />
        </EduIDButton>
      </div>
    </>
  );
}
