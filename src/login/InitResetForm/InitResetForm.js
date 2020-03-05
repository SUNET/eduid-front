import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "i18n-messages";

import { ButtonGroup, Form } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { FormFeedback } from "reactstrap";

import EduIDButton from "components/EduIDButton";
import { validate } from "components/Email";
import TextInput from "components/EduIDTextInput";

import "./InitResetForm.scss";


let InitForm = props => (
  <Form
    id="init-reset-form"
    role="form">
    <div id="init-reset-input-group">
      <fieldset id="init-reset-form-fieldset">
        <Field
          type="email"
          name="email"
          componentClass="input"
          component={TextInput}
          l10n={props.l10n}
          placeholder="example@email.com"
        />
      </fieldset>
      <EduIDButton
        className="settings-button"
        id="register-button"
        disabled={props.invalid}
        onClick={props.handleEmail}
      >
        {props.l10n("resetpw.send")}
      </EduIDButton>
      <FormFeedback>{props.touched && props.l10n(error)}</FormFeedback>
    </div>
  </Form>
);

InitForm = reduxForm({
  form: "init-reset-form",
  validate
})(InitForm);


class InitResetForm extends Component {

  render() {
    let markup;
    if (this.props.email_sent) {
      markup = (
        <div>
          <h3 className="resetting-password-header">
            {this.props.l10n("resetpw.email-sent-title")}
          </h3>
          {this.props.l10n("resetpw.email-sent")}
        </div>
      );
    } else {
      markup = (
        <div>
          <h3 className="reset-password-header">
            {this.props.l10n("resetpw.main_title")}
          </h3>
          {this.props.l10n("resetpw.main-body")}
          <InitForm {...this.props} />
        </div>
      );
    }
    return (markup);
  }
}

InitResetForm.propTypes = {
  email_sent: PropTypes.bool,
  handleEmail: PropTypes.func,
  l10n: PropTypes.func,
};

export default InitResetForm;
