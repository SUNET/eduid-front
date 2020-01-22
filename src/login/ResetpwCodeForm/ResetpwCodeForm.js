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

import "./ResetpwCodeForm.scss";


class CodeForm extends Component {

  render() {
    return (
      <Form
        id="code-reset-form"
        onLoad={this.props.onLoad}
        role="form">
        <div id="code-reset-input-group">
          <span>{this.props.l10n("resetpw.title-reset-code")}</span>
        </div>
      </Form>
    );
  }
}  

CodeForm = reduxForm({
  form: "code-reset-form",
  validate
})(CodeForm);

export default CodeForm;
