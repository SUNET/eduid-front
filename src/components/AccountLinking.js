import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Orcid from "components/Orcid";

// import "style/AccountLinking.scss";
import "../login/styles/index.scss";

class AccountLinking extends Component {
  render() {
    return (
      <div id="orcid-connect-container">
        <div className="intro">
          <h4>{this.props.translate("account_linking.main_title")}</h4>
          <p>{this.props.translate("account_linking.long_description")}</p>
        </div>
        <Orcid {...this.props} />
      </div>
    );
  }
}

AccountLinking.propTypes = {
  orcid: PropTypes.object,
  handleOrcidConnect: PropTypes.func,
  handleOrcidDelete: PropTypes.func,
  langs: PropTypes.array
};

export default AccountLinking;
