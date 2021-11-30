import React, { Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import UsernamePw from "./UsernamePw";
import TermOfUse from "./TermsOfUse";
import MultiFactorAuth from "./MultiFactorAuth";
import SubmitSamlResponse from "./SubmitSamlResponse";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import loginSlice from "../../../redux/slices/loginSlice";

interface LoginProps {
  translate(msg: string): string;
}

// URL parameters passed to this component
interface LoginParams {
  ref?: string;
}

const Login = (props: LoginProps): JSX.Element => {
  const history = useHistory();
  const next_page = useAppSelector((state) => state.login.next_page);
  const params = useParams() as LoginParams;
  const dispatch = useAppDispatch();
  let ref = useAppSelector((state) => state.login.ref);

  if (ref === undefined && params.ref !== undefined) {
    ref = params.ref; // need ref below too
    dispatch(loginSlice.actions.addLoginRef({ ref: ref, start_url: window.location.href }));
  }

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
        <UsernamePw {...props} />
      ) : next_page === "TOU" ? (
        <TermOfUse {...props} />
      ) : next_page === "MFA" ? (
        <MultiFactorAuth {...props} />
      ) : next_page === "FINISHED" ? (
        <SubmitSamlResponse />
      ) : null}
    </Fragment>
  );
};

// InjectIntl 'invents' the translate prop
export default InjectIntl(Login);
