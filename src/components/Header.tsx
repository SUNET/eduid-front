import { fetchLogout } from "apis/eduidLogin";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import { DashboardNav } from "./DashboardNav";

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
  const signup_url = useDashboardAppSelector((state) => state.config.signup_url);
  const dashboard_url = useDashboardAppSelector((state) => state.config.dashboard_url);
  const eduid_site_url = useDashboardAppSelector((state) => state.config.eduid_site_url);
  const login_url = useDashboardAppSelector((state) => state.config.login_base_url);
  const start_url = dashboard_url || eduid_site_url;
  let button;

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
    if (signup_url) {
      document.location.href = signup_url;
    }
  }

  function handleLogin() {
    if (dashboard_url) {
      document.location.href = dashboard_url;
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
    button = <DashboardNav handleLogout={handleLogout} login_url={login_url} />;
  } else {
    button = <div />;
  }

  return (
    <section className="banner">
      <header>
        <a href={start_url} aria-label="eduID start" title="eduID start">
          <div id="eduid-logo" className="eduid-logo" />
        </a>
        <div className="header-inner">{button}</div>
      </header>
    </section>
  );
}
