import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginApi } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import { eduidStore } from "eduid-init-app";
import { useCallback, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useLocation, useNavigate } from "react-router";
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
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    const response = await fetchLogout({ ref: props.loginRef });
    if (response.isSuccess) {
      // Make sure to reset the store
      eduidStore.dispatch({ type: "RESET_STORE" });
      if (eduid_site_link) {
        sessionStorage.clear();
        window.location.assign(eduid_site_link);
      }
    }
  }, [fetchLogout, props.loginRef, eduid_site_link]);

  const handleRegister = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const handleLogin = useCallback(() => {
    if (dashboard_link) {
      document.location.href = dashboard_link;
    }
  }, [dashboard_link]);

  const button = useMemo(() => {
    if (
      location.pathname.includes("register") ||
      location.pathname.includes("error") ||
      location.pathname.includes("errors") ||
      location.pathname.includes("reset-password")
    ) {
      return (
        <EduIDButton buttonstyle="secondary sm" id="login" onClick={handleLogin}>
          <FormattedMessage defaultMessage="Log in" description="Header login" />
        </EduIDButton>
      );
    } else if (authn_options.has_session) {
      return (
        <EduIDButton buttonstyle="secondary icon sm" id="logout" onClick={handleLogout} disabled={!login_url}>
          <FontAwesomeIcon icon={faArrowRightFromBracket as IconProp} />
          <FormattedMessage defaultMessage="Log out" description="Header logout" />
        </EduIDButton>
      );
    } else if (location.pathname.includes("login") && Object.keys(authn_options).length > 0) {
      return (
        <EduIDButton buttonstyle="secondary sm" id="register" onClick={handleRegister}>
          <FormattedMessage defaultMessage="create eduid" description="Header register" />
        </EduIDButton>
      );
    } else if (eppn) {
      return <HeaderNav handleLogout={handleLogout} login_url={login_url} />;
    }
  }, [authn_options, eppn, login_url, location.pathname, handleLogin, handleLogout, handleRegister]);

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
