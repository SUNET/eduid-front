import { loginApi } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";
import { HeaderNav } from "./HeaderNav";

interface HeaderProps {
  readonly loginRef?: string;
}

export function Header(props: HeaderProps): React.JSX.Element {
  const dashboard_link = useAppSelector((state) => state.config.dashboard_link);
  const eduid_site_link = useAppSelector((state) => state.config.eduid_site_link);
  const login_url = useAppSelector((state) => state.config.login_service_url);
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const eppn = useAppSelector((state) => state.personal_data.eppn);
  const [fetchLogout] = loginApi.useLazyFetchLogoutQuery();

  let button = null;

  const navigate = useNavigate();

  async function handleLogout() {
    const response = await fetchLogout({ ref: props.loginRef });
    if (response.isSuccess) {
      if (eduid_site_link) {
        window.location.assign(eduid_site_link);
        sessionStorage.clear();
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

  if (
    window.location.pathname.includes("register") ||
    window.location.pathname.includes("error") ||
    window.location.pathname.includes("errors") ||
    window.location.pathname.includes("reset-password")
  ) {
    button = (
      <EduIDButton buttonstyle="secondary sm" id="login" onClick={handleLogin}>
        <FormattedMessage defaultMessage="Log in" description="Header login" />
      </EduIDButton>
    );
  } else if (authn_options.has_session) {
    button = (
      <EduIDButton buttonstyle="secondary sm" id="logout" onClick={handleLogout} disabled={!login_url}>
        <FormattedMessage defaultMessage="Log out" description="Header logout" />
      </EduIDButton>
    );
  } else if (window.location.pathname.includes("login")) {
    button = (
      <EduIDButton buttonstyle="secondary sm" id="register" onClick={handleRegister}>
        <FormattedMessage defaultMessage="get eduid" description="Header register" />
      </EduIDButton>
    );
  } else if (eppn) {
    button = <HeaderNav handleLogout={handleLogout} login_url={login_url} />;
  }

  return (
    <header id="header">
      <a
        href={eppn ? dashboard_link : eduid_site_link}
        aria-label="eduID start"
        title="eduID start"
        className="eduid-logo"
      >
        <div id="eduid-logo" />
      </a>
      {button}
    </header>
  );
}
