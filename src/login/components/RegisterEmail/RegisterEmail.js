import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomInput from "../Inputs/CustomInput";
import { Field, reduxForm, submit } from "redux-form";
import { Form } from "reactstrap";
import EduIDButton from "components/EduIDButton";
import NotificationModal from "../Modals/NotificationModal";
import { validate } from "../../app_utils/validation/validateEmail";
import * as actions from "actions/Email";
import { useIntl } from "react-intl";

const submitEmailForm = (values, dispatch) => {
  const { email } = values;
  if (email) {
    dispatch(actions.addEmail(email));
  }
};

/* FORM */
const EmailForm = (props) => {
  const { handleSubmit } = props;
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.email",
    defaultMessage: "name@example.com",
    description: "placeholder text for email input",
  });
  return (
    <Form id="register-form" role="form" onSubmit={handleSubmit(submitEmailForm)}>
      <fieldset>
        <Field
          type="email"
          name="email"
          label={props.translate("signup.registering-input")}
          componentClass="input"
          id="email-input"
          component={CustomInput}
          translate={props.translate}
          placeholder={placeholder}
        />
        <div className="buttons">
          <EduIDButton
            buttonstyle="primary"
            id="register-button"
            disabled={props.invalid}
            onClick={() => props.dispatch(submit("emailForm"))}
          >
            {props.translate("email.sign-up-email")}
          </EduIDButton>
        </div>
      </fieldset>
    </Form>
  );
};

let EmailReduxForm = reduxForm({
  form: "emailForm",
  validate,
  onSubmit: submitEmailForm,
})(EmailForm);

EmailReduxForm = connect(() => ({
  enableReinitialize: true,
  destroyOnUnmount: false,
}))(EmailReduxForm);

/* COMPONENT */

class RegisterEmail extends Component {
  render() {
    return [
      <div key="0" id="content" className="horizontal-content-margin content">
        <h1 className="heading">{this.props.translate("register.sub-heading")}</h1>
        <p className="preamble">{this.props.translate("register.paragraph")}</p>

        <EmailReduxForm {...this.props} />
        <p>
          {this.props.translate("register.toLogin")}&nbsp;
          <a className="text-link" href={this.props.dashboard_url}>
            {this.props.translate("text.link")}
          </a>
        </p>
      </div>,
      <div key="1">
        <NotificationModal
          modalId="register-modal"
          title={this.props.translate("tou.header")}
          showModal={this.props.acceptingTOU}
          closeModal={this.props.handleReject}
          acceptModal={this.props.handleAccept}
          mainText={this.props.tou}
          acceptButtonText={this.props.translate("tou.accept")}
          closeButtonText={this.props.translate("tou.cancel")}
          acceptButtonId={"accept-tou-button"}
          closeButtonId={"reject-tou-button"}
        />
      </div>,
    ];
  }
}

RegisterEmail.propTypes = {
  acceptingTOU: PropTypes.bool,
  tou: PropTypes.string,
  translate: PropTypes.func,
  handleAccept: PropTypes.func,
  handleReject: PropTypes.func,
};

export default RegisterEmail;
