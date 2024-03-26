import { fetchLogout } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { HeaderNav } from "./HeaderNav";

interface HeaderProps {
  readonly loginRef?: string;
}

export function Header(props: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const eduid_site_link = useAppSelector((state) => state.config.eduid_site_link);
  const login_url = useAppSelector((state) => state.config.login_service_url);
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const eppn = useAppSelector((state) => state.personal_data.eppn);

  const initialButton = (
    <EduIDButton buttonstyle="secondary" size="sm" id="login" onClick={handleLogin}>
      <FormattedMessage defaultMessage="Log in" description="Header login" />
    </EduIDButton>
  );

  let button = initialButton;

  const navigate = useNavigate();

  async function handleLogout() {
    const resp = await dispatch(fetchLogout({ ref: props.loginRef }));
    if (fetchLogout.fulfilled.match(resp)) {
      if (eduid_site_link) {
        window.location.assign(eduid_site_link);
      }
    }
  }

  function handleRegister() {
    navigate("/register");
  }

  function handleLogin() {
    if (dashboard_link) {
      document.location.href = dashboard_link;
    }
  }

  if (window.location.pathname.includes("register")) {
    button = (
      <EduIDButton buttonstyle="secondary" size="sm" id="login" onClick={handleLogin}>
        <FormattedMessage defaultMessage="Log in" description="Header login" />
      </EduIDButton>
    );
  } else if (authn_options.has_session) {
    button = (
      <EduIDButton buttonstyle="secondary" size="sm" id="logout" onClick={handleLogout} disabled={!login_url}>
        <FormattedMessage defaultMessage="Log out" description="Header logout" />
      </EduIDButton>
    );
  } else if (window.location.pathname.includes("login")) {
    button = (
      <EduIDButton buttonstyle="secondary" size="sm" id="register" onClick={handleRegister}>
        <FormattedMessage defaultMessage="Register" description="Header register" />
      </EduIDButton>
    );
  } else if (eppn) {
    button = <HeaderNav handleLogout={handleLogout} login_url={login_url} />;
  }

  return (
    <header id="header">
      <a href={eppn ? dashboard_link : eduid_site_link} aria-label="eduID start" title="eduID start">
        <div id="eduid-logo" className="eduid-logo" />
      </a>
      {button}
    </header>
  );
}
