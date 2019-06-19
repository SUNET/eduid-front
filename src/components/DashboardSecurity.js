import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import { ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import AddNin from "./AddNin";
import AccountLinkingContainer from "containers/AccountLinking";
import SecurityContainer from "containers/Security";
import ChangePasswordContainer from "containers/ChangePassword";

import "style/Nins.scss";

class DashboardSecurity extends Component {
  render() {
    return (
      <div id="dashboard">
        <DashboardNav {...this.props} />
        <div id="add-nin-number-container">
          <AccountLinkingContainer />
          <SecurityContainer />
        </div>
      </div>
    );
  }
}

// Nins.propTypes = {
//   nin: PropTypes.string,
//   nins: PropTypes.array,
//   validateNin: PropTypes.func,
//   handleDelete: PropTypes.func,
//   proofing_methods: PropTypes.array
// };

// export default DashboardSecurity;

const mapStateToProps = (state, props) => {
  let confirmed;
  const nins = state.nins.nins.filter(nin => nin.verified);
  if (nins.length >= 1) {
    confirmed = "main.confirmed";
  } else {
    confirmed = "main.unconfirmed";
  }
  return {
    nins: state.nins.nins, // verified nin to see where to prompt user
    confirmed: confirmed // could be a boolean? to show what colour to display nin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleThingy: function (e) {
      console.log("do you need a function here?");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardSecurity);


