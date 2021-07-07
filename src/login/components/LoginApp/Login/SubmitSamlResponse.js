import React, { useEffect } from "react";
import { useSelector } from "react-redux"
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const SubmitSamlResponse = () => {
  const SAMLResponse = useSelector(
    (state) => state.login.mfa.parameters.SAMLResponse
  );
  const targetUrl = useSelector((state) => state.login.post_to);

  useEffect(() => {
    document.forms[0].submit();
  })

  return (
    <form action={targetUrl} method="post">
      <input type="hidden" name="SAMLResponse" value={SAMLResponse} />
      <noscript>
        <input type="submit" value="Continue" />
      </noscript>
    </form>
  );
};


export default InjectIntl(SubmitSamlResponse);
