import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import UsernamePw from "./UsernamePw";
import TermOfUse from "./TermsOfUse";
import MultiFactorAuth from "./MultiFactorAuth";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const Login = (props) => {
  // uncomment to let backend control render
  // const nextPage = useSelector((state) => state.login.next_page);
  const nextPage = "USERNAMEPASSWORD";
  return (
    <Fragment>
      {nextPage === "USERNAMEPASSWORD" ? (
        <UsernamePw {...props} />
      ) : nextPage === "TOU" ? (
        <TermOfUse {...props} />
      ) : nextPage === "MFA" ? (
        <MultiFactorAuth {...props} />
      ) : (
        <p className="heading">Loading</p>
      )}
    </Fragment>
  );
};

Login.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(Login);
