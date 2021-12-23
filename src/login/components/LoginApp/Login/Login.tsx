import { fetchAuthnOptions } from "apis/eduidLogin";
import React, { Fragment, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import loginSlice from "../../../redux/slices/loginSlice";
import MultiFactorAuth from "./MultiFactorAuth";
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
    <Fragment>
      {next_page === "USERNAMEPASSWORD" ? (
        <UsernamePw />
      ) : next_page === "ANOTHER_DEVICE" ? (
        <UseAnotherDevice />
      ) : next_page === "TOU" ? (
        <TermsOfUse />
      ) : next_page === "MFA" ? (
        <MultiFactorAuth />
      ) : next_page === "FINISHED" ? (
        <SubmitSamlResponse />
      ) : next_page !== undefined ? (
        <h2 className="heading">
          <FormattedMessage defaultMessage="Ooops, how did you get here? Unknown login state." />
        </h2>
      ) : // show nothing before next_page is initialised
      null}
    </Fragment>
  );
};

export default Login;
