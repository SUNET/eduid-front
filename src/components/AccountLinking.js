import React, { Component } from "react";
import PropTypes from "prop-types";

import EduIDButton from "components/EduIDButton";
import Orcid from "components/Orcid";

import "style/AccountLinking.scss";

class AccountLinking extends Component {
  render() {
    return (
      <div id="orcid-connect-container">
        <div className="intro">
          <h4>Connect other accounts</h4>
          <p>Simplify login by connecting your eduID to other accounts</p>
          {/*<<div className="orcid-logo-container">
            <span className="orcid-logo" />
            <label>{this.props.l10n("orc.title")}</label>
          </div>

          p>
            {this.props.l10n("faq_link")}{" "}
            <a href="https://www.eduid.se/faq.html">FAQ</a> 
          </p>*/}
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
