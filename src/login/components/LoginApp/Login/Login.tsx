import { fetchNext } from "apis/eduidLogin";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import loginSlice from "../../../redux/slices/loginSlice";
import MultiFactorAuth from "./MultiFactorAuth";
import { initKnownDevice, NewDevice, RememberMeCheckbox } from "./NewDevice";
import SubmitSamlResponse from "./SubmitSamlResponse";
import TermsOfUse from "./TermsOfUse";
import UseOtherDevice1 from "./UseOtherDevice1";
import UseOtherDevice2 from "./UseOtherDevice2";
import UsernamePw from "./UsernamePw";

// URL parameters passed to this component
interface LoginParams {
  ref?: string;
}

function Login(): JSX.Element {
  const history = useHistory();
  const params = useParams() as LoginParams;
  const dispatch = useAppDispatch();
  const base_url = useAppSelector((state) => state.config.base_url);
  const next_page = useAppSelector((state) => state.login.next_page);
  const fetching_next = useAppSelector((state) => state.login.fetching_next);
  let this_device = useAppSelector((state) => state.login.this_device);
  let remember_me = useAppSelector((state) => state.login.remember_me);
  let ref = useAppSelector((state) => state.login.ref);

  useEffect(() => {
    // if this_device and remember_me haven't been set in redux state yet, initialise them from local storage
    ({ this_device, remember_me } = initKnownDevice(this_device, remember_me, dispatch));

    if (ref === undefined && params.ref !== undefined) {
      ref = params.ref; // need ref below too
      dispatch(loginSlice.actions.addLoginRef({ ref: ref, start_url: window.location.href }));
    }

    // Ask the backend what to do
    if (base_url && !next_page && ref && !fetching_next && remember_me !== undefined) {
      dispatch(fetchNext({ ref, this_device, remember_me }));
    }
  }, [base_url, ref, this_device, remember_me, next_page, params]);

  useEffect(() => {
    if (ref !== undefined) {
      /* Changing URL is apparently what triggers browsers password managers, so we
       * change to/from 'login/password' when that module is used.
       */
      if (next_page === "USERNAMEPASSWORD") {
        history.push(`/login/password/${ref}`);
      } else {
        history.push(`/login/${ref}`);
      }
    }
  }, [next_page, ref]);

  return (
    <React.Fragment>
      {next_page === "NEW_DEVICE" && <NewDevice />}
      {next_page === "OTHER_DEVICE" && <UseOtherDevice1 />}
      {next_page === "USERNAMEPASSWORD" && <UsernamePw />}
      {next_page === "TOU" && <TermsOfUse />}
      {next_page === "MFA" && <MultiFactorAuth />}
      {next_page === "FINISHED" && <RenderFinished />}
      {/* show nothing before next_page is initialised */ next_page && <RememberMeCheckbox />}
    </React.Fragment>
  );
}

function RenderFinished(): JSX.Element {
  const SAMLParameters = useAppSelector((state) => state.login.saml_parameters);

  return <React.Fragment>{SAMLParameters ? <SubmitSamlResponse /> : <UseOtherDevice2 />}</React.Fragment>;
}
export default Login;
