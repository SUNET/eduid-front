import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import TextInput from "components/EduIDTextInput";
import EduIDButton from "components/EduIDButton";
import TableList from "components/TableList";
import ConfirmModal from "components/ConfirmModal";

import "style/Emails.scss";
import "style/DashboardMain.scss";

const validate = values => {
  const errors = {},
    email = values.email,
    pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email) {
    errors.email = "required";
  } else if (!pattern.test(email)) {
    errors.email = "emails.invalid_email";
  }
  return errors;
};

let EmailForm = props => {
  return (
    <form id="emailsview-form" role="form">
      <fieldset id="emails-form" className="tabpane">
        <Field
          component={TextInput}
          componentClass="input"
          type="text"
          name="email"
          placeholder="example@example.com"
          helpBlock={props.l10n("emails.input_help_text")}
        />
      </fieldset>
      <EduIDButton
        id="email-button"
        disabled={!props.valid_email}
        onClick={props.handleAdd}
      >
        {props.l10n("emails.button_add")}
      </EduIDButton>
    </form>
  );
};

EmailForm = reduxForm({
  form: "emails",
  validate
})(EmailForm);

EmailForm = connect(state => ({
  initialValues: { email: state.emails.email },
  enableReinitialize: true
}))(EmailForm);

class Emails extends Component {
  constructor(props) {
    super(props);
    this.showEmailForm = this.showEmailForm.bind(this);
    this.state = { formClass: "hide", addLinkClass: "btn-link" };
  }

  showEmailForm() {
    console.log("hellow, you're showing the form");
    this.setState(
      (state, props) => {
        return {
          formClass: "form-content",
          addLinkClass: "hide"
        };
      },
      () => {
        console.log("formClass:",this.state.formClass);
      }
    );
    console.log("formClass state updated:", this.state.formClass);
  }

  render() {
    return (
      <div className="emailsview-form-container">
        <div className="intro">
          <h4>{this.props.l10n("emails.main_title")}</h4>
          <p>{this.props.l10n("emails.long_description")}</p>
          {/* <p>
{this.props.l10n("faq_link")}{" "}
<a href="https://www.eduid.se/faq.html">FAQ</a>
</p> */}
        </div>
        <div id="email-display">
          <TableList
            entries={this.props.emails}
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
            + add more
          </EduIDButton>
        </div>
        <ConfirmModal
          modalId="emailConfirmDialog"
          id="emailConfirmDialogControl"
          title={this.props.l10n("emails.confirm_title", {
            email: this.props.confirming
          })}
          resendLabel={this.props.l10n("cm.enter_code")}
          resendHelp={this.props.l10n("cm.lost_code")}
          resendText={this.props.l10n("cm.resend_code")}
          placeholder={this.props.l10n("emails.placeholder")}
          showModal={Boolean(this.props.confirming)}
          closeModal={this.props.handleStopConfirmation}
          handleResend={this.props.handleResend}
          handleConfirm={this.props.handleConfirm}
        />
      </div>
    );
  }
}

Emails.propTypes = {
  longDescription: PropTypes.string,
  emails: PropTypes.array,
  confirming: PropTypes.string,
  resending: PropTypes.object,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveEmail: PropTypes.func
};

export default Emails;
