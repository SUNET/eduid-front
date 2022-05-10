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
import { useIntl, FormattedMessage } from "react-intl";

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
    // TODO: Replace with existing ToU from login
    const ToU = (
      <React.Fragment>
        <p>
          <FormattedMessage defaultMessage="The following generally applies:" description="ToU paragraph 1 heading" />
        </p>
        <ul tabIndex={0}>
          {[
            <FormattedMessage
              defaultMessage="that all usage of user accounts follow the laws and by-laws of Sweden,"
              description="ToU first paragraph"
            />,
            <FormattedMessage
              defaultMessage={`that all personal information that you provide,
                             such as name and contact information shall be truthful,`}
              description="ToU first paragraph"
            />,
            <FormattedMessage
              defaultMessage={`that user accounts, password, security keys and codes are individual and
                             shall only be used by the intended individual,`}
              description="ToU first paragraph"
            />,
            <FormattedMessage
              defaultMessage="that SUNET's ethical rules regulate the “other” usage."
              description="ToU first paragraph"
            />,
          ].map((list, index) => {
            return <li key={index}>{list}</li>;
          })}
        </ul>
        <ul tabIndex={0}>
          <p>
            <FormattedMessage
              defaultMessage="SUNET judges unethical behaviour to be when someone:"
              description="ToU 2016-v1 paragraph 2 heading"
            />
          </p>
          {[
            <FormattedMessage
              defaultMessage="attempts to gain access to network resources that they do not have the right"
              description="ToU second paragraph"
            />,
            <FormattedMessage
              defaultMessage="attempts to conceal their user identity"
              description="ToU second paragraph"
            />,
            <FormattedMessage
              defaultMessage="attempts to interfere or disrupt the intended usage of the network"
              description="ToU second paragraph"
            />,
            <FormattedMessage
              defaultMessage="clearly wastes available resources (personnel, hardware or software)"
              description="ToU second paragraph"
            />,
            <FormattedMessage
              defaultMessage="attempts to disrupt or destroy computer-based information"
              description="ToU second paragraph"
            />,
            <FormattedMessage defaultMessage="infringes on the privacy of others" description="ToU second paragraph" />,
            <FormattedMessage
              defaultMessage="attempts to insult or offend others"
              description="ToU second paragraph"
            />,
          ].map((list, index) => {
            return <li key={index}>{list}</li>;
          })}
        </ul>
      </React.Fragment>
    );

    return [
      <div key="0" id="content" className="horizontal-content-margin content">
        <h1 className="heading">{this.props.translate("register.sub-heading")}</h1>
        <p>{this.props.translate("register.paragraph")}</p>

        <EmailReduxForm {...this.props} />
        <p>
          {this.props.translate("register.toLogin")}&nbsp;
          <a href={this.props.dashboard_url}>{this.props.translate("text.link")}</a>
        </p>
      </div>,
      <div key="1">
        <NotificationModal
          id="register-modal"
          title={<FormattedMessage defaultMessage="General rules for eduID users" description="tou.header" />}
          mainText={ToU}
          showModal={this.props.acceptingTOU}
          closeModal={this.props.handleReject}
          acceptModal={this.props.handleAccept}
          acceptButtonText={<FormattedMessage defaultMessage="accept" description="accept button" />}
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
