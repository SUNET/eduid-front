import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postWebauthnFromAuthenticatorFail } from "../../../redux/actions/postWebauthnFromAuthenticatorActions";
import Splash from "../../../../containers/Splash";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const SubmitSamlResponse = () => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const SAMLParameters = useSelector(
    (state) => state.login.saml_parameters
  );
  const targetUrl = useSelector((state) => state.login.post_to);
  useEffect(() => {
    if (
      document.forms[0] !== undefined ||
      SAMLParameters !== null ||
      targetUrl !== null
    ) {
      document.forms[0].submit();
    } else {
      setError(true);
      dispatch(postWebauthnFromAuthenticatorFail("error"));
    }
  }, []);
  return (
    <Fragment>
      {error ? null : <Splash />}
      <form action={targetUrl} method="post">
        <input type="hidden" name="SAMLResponse" value={SAMLParameters.SAMLResponse} />
        <input type="hidden" name="RelayState" value={SAMLParameters.RelayState} />
        <noscript>
          <input type="submit" value="Continue" />
        </noscript>
      </form>
    </Fragment>
  );
};

export default InjectIntl(SubmitSamlResponse);
