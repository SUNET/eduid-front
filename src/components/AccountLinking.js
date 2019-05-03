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
          <h4>{this.props.l10n("account_linking.main_title")}</h4>
          <p>{this.props.l10n("account_linking.long_description")}</p>
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
