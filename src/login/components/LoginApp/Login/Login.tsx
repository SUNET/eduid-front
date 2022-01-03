import { fetchAuthnOptions, fetchNext, fetchUseOtherDevice } from "apis/eduidLogin";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import loginSlice from "../../../redux/slices/loginSlice";
import MultiFactorAuth from "./MultiFactorAuth";
import LoginOtherDevice from "./OtherDevice";
import SubmitSamlResponse from "./SubmitSamlResponse";
import TermsOfUse from "./TermsOfUse";
import UseAnotherDevice from "./UseAnotherDevice";
import UsernamePw from "./UsernamePw";

// URL parameters passed to this component
interface LoginParams {
  ref?: string;
}

const Login = (): JSX.Element => {
  const history = useHistory();
  const base_url = useAppSelector((state) => state.config.base_url);
  const next_page = useAppSelector((state) => state.login.next_page);
  const params = useParams() as LoginParams;
  const dispatch = useAppDispatch();
  let ref = useAppSelector((state) => state.login.ref);

  if (ref === undefined && params.ref !== undefined) {
    ref = params.ref; // need ref below too
    dispatch(loginSlice.actions.addLoginRef({ ref: ref, start_url: window.location.href }));
  }

  useEffect(() => {
    // Fetching authn_options depends on state.config being loaded first (base_url being set)
    if (base_url && ref) {
      dispatch(fetchAuthnOptions({ ref: ref }));
    }
  }, [base_url, ref]);

  useEffect(() => {
    // Ask the backend what to do
    if (base_url && !next_page && ref) {
      dispatch(fetchNext({ ref }));
    }
  }, [base_url, ref, next_page]);

  useEffect(() => {
    /* Changing URL is apparently what triggers browsers password managers, so we
     * change to/from 'login/password' when that module is used.
     */
    if (next_page === "USERNAMEPASSWORD") {
      history.push(`/login/password/${ref}`);
    } else {
      history.push(`/login/${ref}`);
    }
  }, [next_page]);

  return (
    <React.Fragment>
      {next_page === "USERNAMEPASSWORD" ? (
        <UsernamePw />
      ) : next_page === "ANOTHER_DEVICE" ? (
        <UseAnotherDevice />
      ) : next_page === "TOU" ? (
        <TermsOfUse />
      ) : next_page === "MFA" ? (
        <MultiFactorAuth />
      ) : next_page === "FINISHED" ? (
        <RenderFinished />
      ) : next_page !== undefined ? (
        <h2 className="heading">
          <FormattedMessage defaultMessage="Ooops, how did you get here? Unknown login state." />
        </h2>
      ) : // show nothing before next_page is initialised
      null}
    </React.Fragment>
  );
};

function RenderFinished(): JSX.Element {
  const SAMLParameters = useAppSelector((state) => state.login.saml_parameters);
  const target = useAppSelector((state) => state.login.post_to);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // refresh other_device2 state on component load
    if (!SAMLParameters && target) {
      // the 'target' from the FINISHED next response holds the state_id
      dispatch(fetchUseOtherDevice({ state_id: target }));
    }
  }, []);

  return <React.Fragment>{SAMLParameters ? <SubmitSamlResponse /> : <LoginOtherDevice />}</React.Fragment>;
}

export default Login;
