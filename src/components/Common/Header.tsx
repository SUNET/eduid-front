import { fetchLogout } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { HeaderNav } from "./HeaderNav";

interface HeaderProps {
  email?: string;
  showMenu?: boolean;
  loginRef?: string;
}

export function Header(props: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const signup_link = useAppSelector((state) => state.config.signup_link);
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const eduid_site_url = useAppSelectorr((state) => state.config.eduid_site_url);
  const login_url = useAppSelector((state) => state.config.login_service_url);
  const start_url = dashboard_link || eduid_site_url;

  let button = null;
  const navigate = useNavigate();

  async function handleLogout() {
    const resp = await dispatch(fetchLogout({ ref: props.loginRef }));
    if (fetchLogout.fulfilled.match(resp)) {
      const goto_url = resp.payload.location || eduid_site_url || start_url;
      if (goto_url) {
        window.location.assign(goto_url);
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
      <a href={start_url} aria-label="eduID start" title="eduID start">
        <div id="eduid-logo" className="eduid-logo" />
      </a>

      {button}
    </header>
  );
}
