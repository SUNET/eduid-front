import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UsernamePw from "./UsernamePw";
import TermOfUse from "./TermsOfUse";
import MultiFactorAuth from "./MultiFactorAuth";
import SubmitSamlResponse from "./SubmitSamlResponse";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import PropTypes from "prop-types";

const Login = (props) => {
  let history = useHistory();
  const next_page = useSelector((state) => state.login.next_page);
  const ref = useSelector((state) => state.login.ref);
  useEffect(() => {
    if (next_page === "USERNAMEPASSWORD") {
      history.push(`/login/password/${ref}`);
    } else if (next_page === "TOU") {
      history.push(`/login/tou/${ref}`);
    } else if (next_page === "MFA") {
      history.push(`/login/mfa/${ref}`);
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

Login.propTypes = {
  history: PropTypes.object,
  location: PropTypes.shape({ pathname: PropTypes.string }),
};

export default InjectIntl(Login);
