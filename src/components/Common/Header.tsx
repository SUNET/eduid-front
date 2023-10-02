import { fetchLogout } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import { HeaderNav } from "./HeaderNav";

interface HeaderProps {
  email?: string;
  showLogin?: boolean;
  showLogout?: boolean;
  showMenu?: boolean;
  showRegister?: boolean;
  loginRef?: string;
}

export function Header(props: HeaderProps): JSX.Element {
  const dispatch = useDashboardAppDispatch();
  const signup_link = useDashboardAppSelector((state) => state.config.signup_link);
  const dashboard_link = useDashboardAppSelector((state) => state.config.dashboard_link);
  const eduid_site_url = useDashboardAppSelector((state) => state.config.eduid_site_url);
  const login_url = useDashboardAppSelector((state) => state.config.login_base_url);
  const start_url = dashboard_link || eduid_site_url;
  let button = null;

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
    if (signup_link) {
      document.location.href = signup_link;
    }
  }

  function handleLogin() {
    if (dashboard_link) {
      document.location.href = dashboard_link;
    }
  }

  if (props.showLogin) {
    button = (
      <EduIDButton buttonstyle="secondary" size="sm" id="login" onClick={handleLogin}>
        <FormattedMessage defaultMessage="Log in" description="Header login" />
      </EduIDButton>
    );
  } else if (props.showLogout) {
    button = (
      <EduIDButton buttonstyle="secondary" size="sm" id="logout" onClick={handleLogout} disabled={!login_url}>
        <FormattedMessage defaultMessage="Log out" description="Header logout" />
      </EduIDButton>
    );
  } else if (props.showRegister) {
    button = (
      <EduIDButton buttonstyle="secondary" size="sm" id="register" onClick={handleRegister}>
        <FormattedMessage defaultMessage="Register" description="Header register" />
      </EduIDButton>
    );
  } else if (props.showMenu) {
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
