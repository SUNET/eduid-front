import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "i18n-messages";

import { Redirect } from 'react-router-dom';
import { ButtonGroup, Form } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { FormFeedback } from "reactstrap";

import EduIDButton from "components/EduIDButton";

import "./Resetting.scss";


class Resetting extends Component {

  render() {
    let phone_alternatives = '';
    if (this.props.alternatives && this.props.alternatives.phone_numbers) {
      // for each verified phone number, provide an option to reset the password with extra security
      phone_alternatives = this.props.alternatives.phone_numbers.map((alt, index) => {
        return (
            <div className="row" key={index}>
                <Form
                  id="init-reset-form"
                  role="form">
                  <div>
                    <EduIDButton
                      className="ok-button"
                      onClick={this.props.handlePhoneNumber(alt.index)}>
                      {alt.number}
                    </EduIDButton>
                  </div>
                </Form>
            </div>
        );
      });
    }

    if (phone_alternatives !== '') {
      phone_alternatives = (
        <div className="intro">
          <h3>{this.props.l10n("resetpw.extrasec-sms")}</h3>
          <p>{this.props.l10n("resetpw.send-sms")}</p>
          {phone_alternatives}
        </div>
      );
    }

    let token_alternatives = '';
    let hasSupport = navigator.credentials &&
                     navigator.credentials.get !== undefined &&
                     navigator.credentials.create !== undefined;
    if (this.props.alternatives && this.props.alternatives.tokens && hasSupport) {
      // If the user has registered security tokens, and the browser supports it, offer the possibility
      // to reset the password with extra secirity provided by them tokens.
      token_alternatives = (
        <div className="intro">
          <h3>{this.props.l10n("resetpw.extrasec-key")}</h3>
          <p>{this.props.l10n("resetpw.use-key")}</p>
          <Form
            id="init-reset-form"
            role="form">
            <EduIDButton
              className="ok-button"
              onClick={this.props.handleToken()}>
              {this.props.l10n("resetpw.key")}
            </EduIDButton>
          </Form>
        </div>
      );
    }

    if (this.props.is_app_loaded && !phone_alternatives && ! token_alternatives) {
      return <Redirect to="/reset-password/choose/" />;
    }

    return (
      <div>
        <h2 className="reset-password-code-header">
          {this.props.l10n("resetpw.code-title")}
        </h2>
        <p className="reset-password-code-header">
          {this.props.l10n("resetpw.code-body")}
        </p>
        <div>
          {phone_alternatives}
        </div>
        <div>
          {token_alternatives}
        </div>
        <div>
          <div className="intro">
            <h3>{this.props.l10n("resetpw.extrasec-none")}</h3>
            <p>{this.props.l10n("resetpw.use-no-extrasec")}</p>
          </div>
          <Form>
            <EduIDButton
              className="ok-button"
              onClick={this.props.handleNoExtraSec}>
              {this.props.l10n("resetpw.no-extra-sec")}
            </EduIDButton>
          </Form>
        </div>
      </div>
    );
  }
}

Resetting.propTypes = {
  alternatives: PropTypes.object,
  handlePhoneNumber: PropTypes.func,
  handleToken: PropTypes.func,
  l10n: PropTypes.func,
  handleNoExtraSec: PropTypes.func,
};

export default Resetting;
