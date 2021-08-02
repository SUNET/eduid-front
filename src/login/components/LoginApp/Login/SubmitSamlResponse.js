import React, { useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import Splash from "../../Splash/Splash_container";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const SubmitSamlResponse = () => {
  const SAMLResponse = useSelector(
    (state) => state.login.mfa.parameters.SAMLResponse
  );
  const targetUrl = useSelector((state) => state.login.post_to);

  useEffect(() => {
    document.forms[0].submit();
  });

  return (
    <Fragment>
      <Splash />
      <form action={targetUrl} method="post">
        <input type="hidden" name="SAMLResponse" value={SAMLResponse} />
        <noscript>
          <input type="submit" value="Continue" />
        </noscript>
      </form>
    </Fragment>
  );
};

export default InjectIntl(SubmitSamlResponse);
