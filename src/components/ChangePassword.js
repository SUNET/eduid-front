import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { FormText } from "reactstrap";
import { Label } from "reactstrap";
import { Button, ButtonGroup } from "reactstrap";

import i18n from "i18n-messages";

import EduIDButton from "components/EduIDButton";
import TextInput from "components/EduIDTextInput";

import "style/ChangePassword.scss";

export const pwFieldCustomName = "custom-password-field",
  pwFieldRepeatName = "repeat-password-field",
  pwFieldOldName = "old-password-field",
  pwFieldSuggestedName = "suggested-password-field",
  pwFieldChooser = "choose-custom-field";

const validate = (values, props) => {
  const errors = {};
  if (!values[pwFieldOldName]) {
    errors[pwFieldOldName] = "required";
  }
  if (values.hasOwnProperty(pwFieldCustomName)) {
    if (!values[pwFieldCustomName]) {
      errors[pwFieldCustomName] = "required";
    } else if (props.custom_ready) {
      errors[pwFieldCustomName] = "chpass.low-password-entropy";
    }
    if (!values[pwFieldRepeatName]) {
      errors[pwFieldRepeatName] = "required";
    } else if (values[pwFieldRepeatName] !== values[pwFieldCustomName]) {
      errors[pwFieldRepeatName] = "chpass.different-repeat";
    }
  }
  return errors;
};

class ChpassForm extends Component {
  constructor(props) {
    super(props);
    this.state = { rSelected: "suggested" };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  render() {
    let form,
      helpCustom = "";

    if (this.state.rSelected === "custom") {
      const meterHelpBlock = [
        <meter
          max="4"
          value={this.props.password_score}
          id="password-strength-meter"
          key="0"
        />,
        <div className="form-field-error-area" key="1">
          <FormText>
            {this.props.l10n(this.props.password_strength_msg)}
          </FormText>
        </div>
      ];

      form = (
        <div>
          <Field
            component={TextInput}
            componentClass="input"
            type="password"
            label={this.props.l10n("pwfield.enter_password")}
            helpBlock={meterHelpBlock}
            id={pwFieldCustomName}
            name={pwFieldCustomName}
          />
          <Field
            component={TextInput}
            componentClass="input"
            type="password"
            id={pwFieldRepeatName}
            label={this.props.l10n("pwfield.repeat_password")}
            name={pwFieldRepeatName}
          />
        </div>
      );

      helpCustom = (
        <div
          className="password-format"
          dangerouslySetInnerHTML={{
            __html: this.props.l10n("chpass.help-text-newpass")
          }}
        />
      );
    } else {
      form = (
        <Field
          component={TextInput}
          componentClass="input"
          type="text"
          name={pwFieldSuggestedName}
          id={pwFieldSuggestedName}
          label={this.props.l10n("chpass.suggested_password")}
          disabled={true}
        />
      );
    }

    return (
      <form id="passwordsview-form" role="form">
        <fieldset>
          <Field
            component={TextInput}
            componentClass="input"
            type="password"
            id={pwFieldOldName}
            label={this.props.l10n("chpass.old_password")}
            name={pwFieldOldName}
          />

          <Label>{this.props.l10n("chpass.use-custom-label")}</Label>
          <ButtonGroup>
            <EduIDButton
              value="custom"
              onClick={() => this.onRadioBtnClick("custom")}
              disabled={this.state.rSelected === "custom"}
            >
              {this.props.l10n("chpass.use-custom")}
            </EduIDButton>
            <EduIDButton
              value="suggested"
              onClick={() => this.onRadioBtnClick("suggested")}
              disabled={this.state.rSelected === "suggested"}
            >
              {this.props.l10n("chpass.use-suggested")}
            </EduIDButton>
          </ButtonGroup>
          <div className="form-field-error-area">
            <FormText />
          </div>
        </fieldset>
        {helpCustom}
        <fieldset>{form}</fieldset>
        <fieldset id="chpass-form" className="tabpane">
          <EduIDButton
            className="cancel-button eduid-cancel-button"
            onClick={this.props.handleStopPasswordChange.bind(this)}
          >
            {this.props.l10n("cm.cancel")}
          </EduIDButton>
          <EduIDButton
            id="chpass-button"
            onClick={this.props.handleStartPasswordChange.bind(this)}
            disabled={this.props.invalid}
          >
            {this.props.l10n("chpass.change-password")}
          </EduIDButton>
        </fieldset>
      </form>
    );
  }
}

ChpassForm = reduxForm({
  form: "chpass",
  validate
})(ChpassForm);

ChpassForm = connect(state => {
  const initialValues = {};
  initialValues[pwFieldSuggestedName] = state.chpass.suggested_password;
  return {
    initialValues: initialValues,
    enableReinitialize: true
  };
})(ChpassForm);

ChpassForm = i18n(ChpassForm);

class ChangePassword extends Component {
  componentWillMount() {
    this.props.loadZxcvbn();
  }

  render() {
    return (
      <div>
        <h3>{this.props.l10n("chpass.title-general")}</h3>

        <div id="changePasswordDialog" className="well">
          <p>{this.props.l10n("chpass.help-text-general")}</p>

          <ChpassForm {...this.props} />
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  user_input: PropTypes.array,
  next_url: PropTypes.string,
  password_entropy: PropTypes.number,
  handleChoice: PropTypes.func,
  noop: PropTypes.func,
  handleStartPasswordChange: PropTypes.func,
  cancel_to: PropTypes.string
};

export default ChangePassword;
