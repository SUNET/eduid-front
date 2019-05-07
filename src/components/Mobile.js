import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import TextInput from "components/EduIDTextInput";
import EduIDButton from "components/EduIDButton";
import TableList from "components/TableList";
import ConfirmModal from "components/ConfirmModal";

import "style/Mobile.scss";

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
    <form id="mobilesview-form" className="form-horizontal" role="form">
      <fieldset id="mobile-form" className="tabpane">
        <Field
          component={TextInput}
          componentClass="input"
          type="text"
          name="number"
          placeholder={props.l10n("phones.input_placeholder")}
          helpBlock={props.l10n("phones.input_help_text")}
        />

        <EduIDButton
          id="mobile-button"
          disabled={!props.valid_phone}
          onClick={props.handleAdd}
        >
          {props.l10n("mobile.button_add")}
        </EduIDButton>
      </fieldset>
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
  render() {
    return (
      <div className="mobileview-form-container ">
        <div className="intro">
          <h4>{this.props.l10n("phones.main_title")}</h4>
          <p>{this.props.l10n("phones.long_description")}</p>
          <p>
            {this.props.l10n("faq_link")}{" "}
            <a href="https://www.eduid.se/faq.html">FAQ</a>
          </p>
        </div>
        <TableList
          entries={this.props.phones}
          handleStartConfirmation={this.props.handleStartConfirmation}
          handleRemove={this.props.handleRemove}
          handleMakePrimary={this.props.handleMakePrimary}
        />
        <div className="form-content">
          <PhoneForm {...this.props} />
        </div>
        <ConfirmModal
          modalId="phoneConfirmDialog"
          id="phoneConfirmDialogControl"
          title={this.props.l10n("mobile.confirm_title", {
            phone: this.props.confirming
          })}
          resendLabel={this.props.l10n("cm.enter_code")}
          resendHelp={this.props.l10n("cm.lost_code")}
          resendText={this.props.l10n("cm.resend_code")}
          placeholder={this.props.l10n("mobile.placeholder")}
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
