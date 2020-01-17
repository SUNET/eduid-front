import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import i18n from "i18n-messages";
import { ButtonGroup, Form } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { FormFeedback } from "reactstrap";

import EduIDButton from "components/EduIDButton";
import { validate } from "components/Email";
import TextInput from "components/EduIDTextInput";

import "./InitialResetForm.scss";


let InitForm = props => (
  <div id="init-reset-input-group">
    <fieldset id="init-reset-form">
      <Field
        type="email"
        name="email"
        componentClass="input"
        id="email-input"
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
      {props.l10n("reset.send")}
    </EduIDButton>
    <FormFeedback>{props.touched && props.l10n(error)}</FormFeedback>
  </div>
);

InitForm = reduxForm({
  form: "initialForm",
  validate
})(InitForm);

const mapStateToProps = (state, props) => {
  return {
    enableReinitialize: true
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
  };
};

const InitFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InitForm);

export default i18n(InitFormContainer);
