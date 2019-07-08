import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDom from "react-dom";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import FormText from "reactstrap/lib/FormText";
import Label from "reactstrap/lib/Label";
import Button from "reactstrap/lib/Button";
import ButtonGroup from "reactstrap/lib/ButtonGroup";

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

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customPassword: true
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick() {
    this.setState(prevState => ({
      customPassword: !prevState.customPassword
    }));
    // this.setState({ buttonText: "Suggest a password for me" });
  }

  render() {
    let form,
      button,
      helpCustom = "";

    if (this.state.customPassword) {
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

      button = (
        <EduIDButton
          value="custom"
          className="btn-link"
          onClick={() => this.onRadioBtnClick("custom")}

          // disabled={this.state.rSelected === "custom"}
        >
          Suggest a password for me
        </EduIDButton>
      );

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
          label={"Suggested password"}
          disabled={true}
        />
      );
      button = (
        <EduIDButton
          value="custom"
          className="btn-link"
          onClick={() => this.onRadioBtnClick("custom")}
        >
          I don't want a suggested password
        </EduIDButton>
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
          {/* <p>Choose You can accept the generated password by clicking "Change password" or you can opt to choose your own password using the checkbox.</p> */}

          <div className="form-field-error-area">
            <FormText />
          </div>
        </fieldset>
        {helpCustom}
        <fieldset>{form}</fieldset>
        <div id="password-suggestion">
          <ButtonGroup>
            {/* <EduIDButton
                value="suggested"
                onClick={() => this.onRadioBtnClick("suggested")}
                disabled={this.state.rSelected === "suggested"}
              >
                Suggested
              </EduIDButton> */}
            {button}
          </ButtonGroup>
        </div>
        <fieldset id="chpass-form" className="tabpane">
          <EduIDButton
            id="chpass-button"
            onClick={this.props.handleStartPasswordChange.bind(this)}
            // disabled={this.props.invalid}
          >
            {this.props.l10n("chpass.change-password")}
          </EduIDButton>
          <EduIDButton
            className="cancel-button eduid-cancel-button"
            onClick={this.props.handleStopPasswordChange.bind(this)}
          >
            {this.props.l10n("cm.cancel")}
          </EduIDButton>
        </fieldset>
      </form>
    );
  }
}

ChangePasswordForm = reduxForm({
  form: "chpass",
  validate
})(ChangePasswordForm);

ChangePasswordForm = connect(state => {
  const initialValues = {};
  initialValues[pwFieldSuggestedName] = state.chpass.suggested_password;
  return {
    initialValues: initialValues,
    enableReinitialize: true
  };
})(ChangePasswordForm);

ChangePasswordForm = i18n(ChangePasswordForm);

ChangePasswordForm.propTypes = {
  user_input: PropTypes.array,
  next_url: PropTypes.string,
  password_entropy: PropTypes.number,
  handleChoice: PropTypes.func,
  noop: PropTypes.func,
  handleStartPasswordChange: PropTypes.func,
  cancel_to: PropTypes.string
};

export default ChangePasswordForm;
