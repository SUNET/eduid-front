import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "i18n-messages";

import { ButtonGroup, Form } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { FormFeedback } from "reactstrap";

import EduIDButton from "components/EduIDButton";
import { hasWebauthnSupport } from "login/DoReset/DoReset_container";

import "./Resetting.scss";


class Resetting extends Component {

  render() {
    let phone_alternatives = [];
    if (this.props.alternatives && this.props.alternatives.phone_numbers) {
      phone_alternatives = this.props.alternatives.phone_numbers.map((alt, index) => {
        return (
            <div className="row" key={alt.number}>
                <Form
                  id="init-reset-form"
                  role="form">
                  {this.props.l10n("resetpw.send-sms")}
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
    let token_alternatives = [];
    if (this.props.alternatives && this.props.alternatives.tokens && hasWebauthnSupport()) {
      token_alternatives = (
            <div className="row">
                <Form
                  id="init-reset-form"
                  role="form">
                  {this.props.l10n("resetpw.use-key")}
                  <EduIDButton
                    className="ok-button"
                    onClick={this.props.handleToken()}>
                    {this.props.l10n("resetpw.key")}
                  </EduIDButton>
                </Form>
            </div>
        );
    }
    return (
      <div>
        <h3 className="reset-password-code-header">
          {this.props.l10n("resetpw.code-title")}
        </h3>
        <p className="reset-password-code-header">
          {this.props.l10n("resetpw.code-body")}
        </p>
        <div>
          {phone_alternatives}
        </div>
        <div>
          {token_alternatives}
        </div>
        <Form>
          <EduIDButton
            className="ok-button"
            onClick={this.props.handleNoExtraSec}>
            {this.props.l10n("resetpw.no-extra-sec")}
          </EduIDButton>
        </Form>
      </div>
    );
  }
}

Resetting.propTypes = {
};

export default Resetting;
