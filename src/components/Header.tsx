import { fetchLogout } from "apis/eduidLogin";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { Squash as Hamburger } from "hamburger-react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import DashboardNav from "./DashboardNav";

interface HeaderProps {
  email?: string;
  showLogin?: boolean;
  showLogout?: boolean;
  showRegister?: boolean;
  loginRef?: string;
}

export function Header(props: HeaderProps): JSX.Element | null {
  const dispatch = useDashboardAppDispatch();
  const signup_url = useDashboardAppSelector((state) => state.config.signup_url);
  const dashboard_url = useDashboardAppSelector((state) => state.config.dashboard_url);
  const eduid_site_url = useDashboardAppSelector((state) => state.config.eduid_site_url);
  const [isOpen, setOpen] = useState<boolean>(false);
  const login_url = useDashboardAppSelector((state) => state.config.login_base_url);
  const start_url = dashboard_url || eduid_site_url;
  const eppn = useDashboardAppSelector((state) => state.personal_data?.eppn);

  let header;

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
    header = (
      <header>
        <a href={start_url} aria-label="eduID start" title="eduID start">
          <div id="eduid-logo" className="eduid-logo" />
        </a>

        <div className="nav-wrapper">
          <div>
            <EduIDButton buttonstyle="secondary" size="sm" id="login" onClick={handleLogin}>
              <FormattedMessage defaultMessage="Log in" description="Header login" />
            </EduIDButton>
          </div>
        </div>
      </header>
    );
  } else if (props.showLogout && !eppn) {
    // } else if (props.showLogout) {
    header = (
      <header>
        <a href={start_url} aria-label="eduID start" title="eduID start">
          <div id="eduid-logo" className="eduid-logo" />
        </a>

        <div className="nav-wrapper">
          <div>
            <EduIDButton buttonstyle="secondary" size="sm" id="logout" onClick={handleLogout} disabled={!login_url}>
              <FormattedMessage defaultMessage="Log out" description="Header logout" />
            </EduIDButton>
          </div>
        </div>
      </header>
    );
  } else if (eppn) {
    header = (
      <header>
        <a href={start_url} aria-label="eduID start" title="eduID start">
          <div id="eduid-logo" className="eduid-logo" />
        </a>

        <Hamburger rounded duration={0.2} label="Menu" size={28} toggled={isOpen} toggle={setOpen} />

        <div className={"nav-wrapper " + (isOpen ? "show-menu" : undefined)}>
          <DashboardNav toggle={setOpen} />
          <div>
            <EduIDButton buttonstyle="secondary" size="sm" id="logout" onClick={handleLogout} disabled={!login_url}>
              <FormattedMessage defaultMessage="Log out" description="Header logout" />
            </EduIDButton>
          </div>
        </div>
      </header>
    );
  } else if (props.showRegister) {
    header = (
      <header>
        <a href={start_url} aria-label="eduID start" title="eduID start">
          <div id="eduid-logo" className="eduid-logo" />
        </a>

        <div className="nav-wrapper">
          <div>
            <EduIDButton buttonstyle="secondary" size="sm" id="register" onClick={handleRegister}>
              <FormattedMessage defaultMessage="Register" description="Header register" />
            </EduIDButton>
          </div>
        </div>
      </header>
    );
  } else {
    header = null;
  }

  return <section className="banner">{header}</section>;
}
