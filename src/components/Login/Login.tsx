import { loginApi } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router";
import { clearNotifications } from "slices/Notifications";
import loginSlice from "../../slices/Login";
import { MultiFactorAuth } from "./MultiFactorAuth";
import { NewDevice, initKnownDevice } from "./NewDevice";
import SubmitSamlResponse from "./SubmitSamlResponse";
import TermsOfUse from "./TermsOfUse";
import UseOtherDevice1 from "./UseOtherDevice1";
import UseOtherDevice2 from "./UseOtherDevice2";
import UsernamePw from "./UsernamePw";

// URL parameters passed to this component
interface LoginParams {
  ref?: string;
}

/* keep all use through functions in this module */
export const HAS_READ_ANNOUNCEMENT = "hasReadAnnouncement";

function Login(): React.JSX.Element {
  const navigate = useNavigate();
  const params = useParams() as LoginParams;
  const dispatch = useAppDispatch();
  const base_url = useAppSelector((state) => state.config.login_service_url);
  const next_page = useAppSelector((state) => state.login.next_page);
  const fetching_next = useAppSelector((state) => state.login.fetching_next);
  const this_device = useAppSelector((state) => state.login.this_device);
  const remember_me = useAppSelector((state) => state.login.remember_me);
  const ref = useAppSelector((state) => state.login.ref);
  const error_state = useAppSelector((state) => state.login.error);
  const intl = useIntl();
  const [fetchNext] = loginApi.useLazyFetchNextQuery();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Log in",
      defaultMessage: "Log in | eduID",
    });
  }, [intl]);

  useEffect(() => {
    // if this_device and remember_me haven't been set in redux state yet, initialise them from local storage
    const { init_this_device, init_remember_me } = initKnownDevice(this_device, remember_me, dispatch);

    let init_ref = ref;
    if (ref === undefined && params.ref !== undefined) {
      const url_ref = params.ref;
      init_ref = url_ref;
      dispatch(loginSlice.actions.addLoginRef({ ref: url_ref, start_url: window.location.href }));
    }

    // Ask the backend what to do
    if (base_url && !next_page && init_ref && !fetching_next && init_remember_me !== undefined && !error_state) {
      fetchNext({ ref: init_ref, this_device: init_this_device, remember_me: init_remember_me });
    }
  }, [base_url, ref, this_device, remember_me, next_page, params, dispatch, fetching_next, error_state, fetchNext]);

  useEffect(() => {
    if (ref !== undefined) {
      /* Changing URL is apparently what triggers browsers password managers, so we
       * change to/from 'login/password' when that module is used.
       */
      if (next_page === "USERNAMEPASSWORD") {
        navigate(`/login/password/${ref}`);
      } else if (next_page === "PASSWORD") {
        navigate(`/login/mfa/password/${ref}`);
      } else {
        navigate(`/login/${ref}`);
      }
    }
  }, [navigate, next_page, ref]);

  return (
    <React.Fragment>
      {next_page === "NEW_DEVICE" && <NewDevice />}
      {next_page === "OTHER_DEVICE" && <UseOtherDevice1 />}
      {next_page === "USERNAMEPASSWORD" && <UsernamePw />}
      {next_page === "TOU" && <TermsOfUse />}
      {next_page === "MFA" && <MultiFactorAuth />}
      {/* TODO: Remove when the backend no longer uses next_page === "PASSWORD" */}
      {next_page === "PASSWORD" && <UsernamePw />}
      {next_page === "FINISHED" && <RenderFinished />}
      {error_state === "login.user_terminated" && <UserTerminated />}
    </React.Fragment>
  );
}

function RenderFinished(): React.JSX.Element {
  const SAMLParameters = useAppSelector((state) => state.login.saml_parameters);

  let ComponentToRender;
  if (!SAMLParameters) {
    ComponentToRender = <UseOtherDevice2 />;
  } else {
    ComponentToRender = <SubmitSamlResponse />;
  }

  return ComponentToRender;
}
export default Login;

function UserTerminated(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error_state = useAppSelector((state) => state.login.error);
  const [fetchLogout] = loginApi.useLazyFetchLogoutQuery();

  useEffect(() => {
    // If we have an error and localStorage is not empty, we need to logout the user from the session
    if (error_state && window.localStorage.length > 0) {
      // make sure the backend idp logs out the user from the session to get out of a stuck state
      fetchLogout({});
      // clear localStorage so that the same user is not used again
      window.localStorage.clear();
    }
  }, [error_state, fetchLogout]);

  function reset_password() {
    dispatch(clearNotifications());
    navigate("/reset-password");
  }

  return (
    <section>
      <h1>
        <FormattedMessage defaultMessage="Account terminated" description="Account terminated - heading" />
      </h1>

      <p>
        <FormattedMessage
          defaultMessage="This account has recently been terminated and can not be used to log in. It is possible to re-activate the account shortly afterwards by resetting the password using the link below."
          description="Account terminated - paragraph"
        />
      </p>

      <div>
        <EduIDButton onClick={() => reset_password()} buttonstyle="link normal-case">
          <FormattedMessage
            defaultMessage="Go to reset password page"
            description="Account terminated - reset password link"
          />
        </EduIDButton>
      </div>

      <p className="text-small">
        <FormattedMessage
          defaultMessage="To log in with another account go to the start page by clicking the eduID logo in the header, or create a new account using the Register button."
          description="Account terminated - help text"
        />
      </p>
    </section>
  );
}
