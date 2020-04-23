import React, { Component } from "react";
import PropTypes from "prop-types";

import NameDisplay from "containers/NameDisplay";
import NinDisplay from "containers/NinDisplay";
import PhoneDisplay from "containers/PhoneDisplay";
import EmailDisplay from "containers/EmailDisplay";
import { withRouter } from "react-router-dom";

import "style/base.scss";

class Profile extends Component {
  render() {
    return (
      <div key="1" id="profile-grid">
        <NameDisplay key="0" />
        <NinDisplay key="1" {...this.props} />
        <PhoneDisplay key="2" />
        <EmailDisplay key="3" />
      </div>
    );
  }
}

Profile.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default withRouter(Profile);
