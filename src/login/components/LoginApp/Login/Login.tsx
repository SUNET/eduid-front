import { fetchNext } from "apis/eduidLogin";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app_init/hooks";
import loginSlice from "../../../redux/slices/loginSlice";
import MultiFactorAuth from "./MultiFactorAuth";
import { NewDevice, THIS_DEVICE_KEY } from "./NewDevice";
import SubmitSamlResponse from "./SubmitSamlResponse";
import TermsOfUse from "./TermsOfUse";
import UseOtherDevice1 from "./UseOtherDevice1";
import UseOtherDevice2 from "./UseOtherDevice2";
import UsernamePw from "./UsernamePw";

// URL parameters passed to this component
interface LoginParams {
  ref?: string;
}

const Login = (): JSX.Element => {
  const history = useHistory();
  const params = useParams() as LoginParams;
  const dispatch = useAppDispatch();
  const base_url = useAppSelector((state) => state.config.base_url);
  const next_page = useAppSelector((state) => state.login.next_page);
  const fetching_next = useAppSelector((state) => state.login.fetching_next);
  let this_device = useAppSelector((state) => state.login.this_device);
  let ref = useAppSelector((state) => state.login.ref);

  useEffect(() => {
    if (!this_device) {
      console.log("Load this_device from local storage, key ", THIS_DEVICE_KEY);
      // try to initialise this_device from local storage
      if (window.localStorage) {
        this_device = window.localStorage.getItem(THIS_DEVICE_KEY) || undefined;
        if (this_device) {
          dispatch(loginSlice.actions.addThisDevice(this_device));
        }
      }
    }

    // Ask the backend what to do
    if (base_url && !next_page && ref && !fetching_next) {
      dispatch(fetchNext({ ref, this_device }));
    }
    if (ref === undefined && params.ref !== undefined) {
      ref = params.ref; // need ref below too
      dispatch(loginSlice.actions.addLoginRef({ ref: ref, start_url: window.location.href }));
    }
  }, [base_url, ref, this_device, next_page, params]);

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
      {next_page === "NEW_DEVICE" && <NewDevice />}
      {next_page === "OTHER_DEVICE" && <UseOtherDevice1 />}
      {next_page === "USERNAMEPASSWORD" && <UsernamePw />}
      {next_page === "TOU" && <TermsOfUse />}
      {next_page === "MFA" && <MultiFactorAuth />}
      {next_page === "FINISHED" && <RenderFinished />}
      {/* show nothing before next_page is initialised */}
    </React.Fragment>
  );
};

function RenderFinished(): JSX.Element {
  const SAMLParameters = useAppSelector((state) => state.login.saml_parameters);

  return <React.Fragment>{SAMLParameters ? <SubmitSamlResponse /> : <UseOtherDevice2 />}</React.Fragment>;
}

export default Login;
