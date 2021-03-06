import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Form from "reactstrap/lib/Form";
import CustomInput from "../login/components/Inputs/CustomInput";
import EduIDButton from "./EduIDButton";
import DataTable from "../login/components/DataTable/DataTable";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
import "../login/styles/index.scss";
import { validate } from "../login/app_utils/validation/validateEmail";
import { longCodePattern } from "../login/app_utils/validation/regexPatterns";

let EmailForm = (props) => {
  return (
    <Form id="emailsview-form" role="form" onSubmit={props.handleAdd}>
      <fieldset id="emails-form" className="tabpane">
        <Field
          label={props.translate("profile.email_display_title")}
          component={CustomInput}
          componentClass="input"
          type="text"
          name="email"
          placeholder="example@example.com"
          helpBlock={props.translate("emails.input_help_text")}
        />
      </fieldset>
      <EduIDButton
        id="email-button"
        className="settings-button"
        disabled={!props.valid_email}
        onClick={props.handleAdd}
      >
        {props.translate("emails.button_add")}
      </EduIDButton>
    </Form>
  );
};

EmailForm = reduxForm({
  form: "emails",
  validate,
})(EmailForm);

EmailForm = connect((state) => ({
  initialValues: { email: state.emails.email },
  enableReinitialize: true,
}))(EmailForm);

class Emails extends Component {
  constructor(props) {
    super(props);
    this.showEmailForm = this.showEmailForm.bind(this);
    this.state = { formClass: "hide", addLinkClass: "btn-link" };
  }

  showEmailForm() {
    this.setState(() => {
      return {
        formClass: "form-content",
        addLinkClass: "hide",
      };
    });
  }

  render() {
    return (
      <div className="emailsview-form-container">
        <div className="intro">
          <h4>{this.props.translate("emails.main_title")}</h4>
          <p>{this.props.translate("emails.long_description")}</p>
        </div>
        <div id="email-display">
          <DataTable
            {...this.props}
            data={this.props.emails}
            handleStartConfirmation={this.props.handleStartConfirmation}
            handleRemove={this.props.handleRemove}
            handleMakePrimary={this.props.handleMakePrimary}
          />
          <div className={this.state.formClass}>
            <EmailForm {...this.props} />
          </div>

          <EduIDButton
            id="add-more-button"
            className={this.state.addLinkClass}
            onClick={this.showEmailForm}
          >
            {this.props.translate("emails.button_add_more")}
          </EduIDButton>
        </div>
        <ConfirmModal
          modalId="emailConfirmDialog"
          id="emailConfirmDialogControl"
          title={this.props.translate("emails.confirm_title", {
            email: this.props.confirming,
          })}
          resendLabel={this.props.translate("cm.enter_code")}
          resendHelp={this.props.translate("cm.lost_code")}
          resendText={this.props.translate("cm.resend_code")}
          placeholder={this.props.translate("emails.placeholder")}
          showModal={Boolean(this.props.confirming)}
          closeModal={this.props.handleStopConfirmation}
          handleResend={this.props.handleResend}
          handleConfirm={this.props.handleConfirm}
          helpBlock={this.props.translate("emails.confirm_help_text")}
          validationPattern={longCodePattern}
          validationError={"confirmation.code_invalid_format"}
        />
      </div>
    );
  }
}

Emails.propTypes = {
  longDescription: PropTypes.string,
  emails: PropTypes.array,
  confirming: PropTypes.string,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveEmail: PropTypes.func,
};

export default Emails;
