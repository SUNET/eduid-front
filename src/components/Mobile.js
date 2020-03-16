import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import TextInput from "components/EduIDTextInput";
import EduIDButton from "components/EduIDButton";
import TableList from "components/TableList";
import ConfirmModal from "components/ConfirmModal";

import "style/Emails.scss";
import "style/Mobile.scss";
import "style/DashboardMain.scss";

const validate = (values, props) => {
  let phone = values.number;
  if (!phone) {
    return { number: "required" };
  }
  phone = phone.replace(/ /g, "");
  if (phone.startsWith("00")) {
    return { number: "phone.e164_format" };
  }
  if (phone.startsWith("0")) {
    phone = "+" + props.default_country_code + phone.substr(1);
  }
  const pattern = /^\+[1-9]\d{6,20}$/;
  if (!pattern.test(phone)) {
    return { number: "phone.phone_format" };
  }
};

let PhoneForm = props => {
  return (
    <form id="phonesview-form" role="form" onSubmit={props.handleAdd}>
      <fieldset id="phone-form" className="tabpane">
        <Field
          component={TextInput}
          componentClass="input"
          type="text"
          name="number"
          placeholder={props.translate("phones.input_placeholder")}
          helpBlock={props.translate("phones.input_help_text")}
        />
      </fieldset>
      <EduIDButton
        id="mobile-button"
        className="settings-button"
        disabled={!props.valid_phone}
        onClick={props.handleAdd}
      >
        {props.translate("mobile.button_add")}
      </EduIDButton>
    </form>
  );
};

PhoneForm = reduxForm({
  form: "phones",
  validate
})(PhoneForm);

PhoneForm = connect(state => ({
  initialValues: { number: state.phones.phone },
  enableReinitialize: true
}))(PhoneForm);

class Mobile extends Component {
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
        console.log("formClass:", this.state.formClass);
      }
    );
    console.log("formClass state updated:", this.state.formClass);
  }

  render() {
    return (
      <div className="phoneview-form-container">
        <div className="intro">
          <h4>{this.props.translate("phones.main_title")}</h4>
          <p>{this.props.translate("phones.long_description")}</p>
        </div>
        <div id="phone-display">
          <TableList
            entries={this.props.phones}
            handleStartConfirmation={this.props.handleStartConfirmation}
            handleRemove={this.props.handleRemove}
            handleMakePrimary={this.props.handleMakePrimary}
          />
          <div className={this.state.formClass}>
            <PhoneForm {...this.props} />
          </div>
          <EduIDButton
            id="add-more-button"
            className={this.state.addLinkClass}
            onClick={this.showEmailForm}
          >
            {this.props.translate("phones.button_add_more")}
          </EduIDButton>
        </div>
        <ConfirmModal
          modalId="phoneConfirmDialog"
          id="phoneConfirmDialogControl"
          title={this.props.translate("mobile.confirm_title", {
            phone: this.props.confirming
          })}
          resendLabel={this.props.translate("cm.enter_code")}
          resendHelp={this.props.translate("cm.lost_code")}
          resendText={this.props.translate("cm.resend_code")}
          placeholder={this.props.translate("mobile.placeholder")}
          showModal={Boolean(this.props.confirming)}
          closeModal={this.props.handleStopConfirmation}
          handleResend={this.props.handleResend}
          handleConfirm={this.props.handleConfirm}
        />
      </div>
    );
  }
}

Mobile.propTypes = {
  phones: PropTypes.array,
  confirming: PropTypes.string,
  resending: PropTypes.object,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveMobile: PropTypes.func
};

export default Mobile;
