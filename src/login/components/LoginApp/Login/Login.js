import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import UsernamePw from "./UsernamePw";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const Login = (props) => {
  const page = useSelector((state) => state.login.next_page);
  return (
    <Fragment>
      {page === "USERNAMEPASSWORD" ? (
        <UsernamePw {...props} />
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
