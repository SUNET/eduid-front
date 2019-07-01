import React, { Component } from "react";
import PropTypes from "prop-types";

import EduIDButton from "components/EduIDButton";
import Orcid from "components/Orcid";

import "style/AccountLinking.scss";

class AccountLinking extends Component {
  render() {
    return (
      <div>
        <div className="intro">
          <h4>For reseachers</h4>
          <div className="orcid-logo-container">
            <span className="orcid-logo" />
            <label>{this.props.l10n("orc.title")}</label>
          </div>
       
          {/* <p>
            {this.props.l10n("faq_link")}{" "}
            <a href="https://www.eduid.se/faq.html">FAQ</a>
          </p> */}
        </div>
        <div id="orcid">
          <Orcid {...this.props} />
        </div>
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
