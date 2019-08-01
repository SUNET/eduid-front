import React, { Component } from "react";
import { connect } from "react-redux";
import i18n from "i18n-messages";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class EmailDisplay extends Component {
  render() {
    let text = "";
    if (this.props.emails.length) {
      text = [
        <p key="0" id="nin-number" className="verified">
          {this.props.emails[0].email}
        </p>
      ];
    } else {
      text = [
        <p key="0" id="nin-number" className="no-data">
          {this.props.l10n("profile.email_display_no_data")}
        </p>
      ];
    }
    return (
      <div key="3" className="profile-card">
        <label key="0">{this.props.l10n("profile.email_display_title")}</label>
        <div key="1" id="nin-number-container">
          {text}
        </div>
      </div>
    );
  }
}

// export default EmailDisplay;

const mapStateToProps = (state, props) => {
  const emailAddress = state.emails.emails.filter(email => email.primary);
  return {
    emails: emailAddress // all info about primary email
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const EmailDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailDisplay);

export default i18n(EmailDisplayContainer);
