import { fetchLogout } from "apis/eduidLogin";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";

interface HeaderProps {
  email?: string;
  showLogin?: boolean;
  showLogout?: boolean;
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
  let userName;
  let button;

  async function handleLogout() {
    const resp = await dispatch(fetchLogout({ ref: props.loginRef }));
    if (fetchLogout.fulfilled.match(resp)) {
      if (resp.payload.location) {
        window.location.assign(resp.payload.location);
      } else {
        if (start_url) {
          window.location.assign(start_url);
        }
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
    userName = <div className="header-user">{props.email}</div>;
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
  } else {
    button = <div />;
  }

  return (
    <section className="banner">
      <header>
        <a href={start_url} aria-label="eduID start" title="eduID start">
          <div id="eduid-logo" className="eduid-logo" />
        </a>
        {button}
        {userName}
      </header>
    </section>
  );
}
