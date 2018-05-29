
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, FormGroup, FormFeedback, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

import EduIDButton from "components/EduIDButton";

import 'style/Email.scss';


/* FORM */

const validate = values => {
    const errors = {},
          email = values.email,
          pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email) {
        errors.email = 'required';
    } else if (!pattern.test(email)) {
        errors.email = 'email.invalid_email'
    }
    return errors;
};

const renderLargeField = ({ input, id, type, placeholder, handleEmail, l10n, meta: { touched, error } }) => (
    <div className="input-group">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
      </div>
      <Input {...input}
             id={id}
             invalid={Boolean(error)}
             valid={!Boolean(error)}
             placeholder={placeholder}
             type={type}/>
      <EduIDButton className="btn-in-row eduid-button"
                   id="email-button"
                   onClick={handleEmail}>
         {l10n('email.sign-up-email')}
      </EduIDButton>
      <FormFeedback className="float-left">{touched && l10n(error)}</FormFeedback>
    </div>
)

const renderSmallField = ({ input, id, type, placeholder, handleEmail, l10n, meta: { touched, error } }) => (
    <div className="input-group">
      <Input {...input}
             id={id}
             invalid={Boolean(error)}
             valid={!Boolean(error)}
             placeholder={placeholder}
             type={type}/>
      <EduIDButton id="email-button"
                   onClick={handleEmail}>
         {l10n('email.sign-up-email')}
      </EduIDButton>
      <span className="float-left"><FormFeedback className="float-left">{touched && l10n(error)}</FormFeedback></span>
    </div>
)

const getField = (size) => {
    if (size === 'xs') return renderSmallField;
    return renderLargeField;
}

let EmailForm = props => (
    <div id="email-register">
      <Form className={(props.size === 'xs') && 'form-horizontal' || ''}>
        <Field type="email"
               name="email"
               id="email-input"
               component={getField(props.size)}
               handleEmail={props.handleEmail.bind(props)}
               l10n={props.l10n}
               placeholder="name@example.edu" />
      </Form>
    </div>
  );

EmailForm = reduxForm({
  form: 'emailForm',
  validate
})(EmailForm)

EmailForm = connect(
  state => ({
    enableReinitialize: true
  })
)(EmailForm)

/* COMPONENT */

class Email extends Component {

  render () {

    return ([
      <div key="0" className="row text-center">
        <div className="col-xl-2"></div>
        <div className="col-xl-8">
            <div id="clouds"></div>
            <h1>{this.props.l10n('main.welcome')}</h1>

            <p className="lead">{this.props.l10n('main.create-account')}</p>

            <EmailForm {...this.props} />
        </div>
        <div className="col-xl-2"></div>
      </div>,
      <div key="1" className="row text-center">
        <Modal isOpen={this.props.acceptingTOU}>
          <ModalHeader>{this.props.l10n('tou.header')}</ModalHeader>
          <ModalBody>{this.props.tou}</ModalBody>
          <ModalFooter>
            <EduIDButton className="btn-danger eduid-button"
                         onClick={this.props.handleReject}>
                  {this.props.l10n('tou.reject')}
            </EduIDButton>
            <EduIDButton onClick={this.props.handleAccept}>
                  {this.props.l10n('tou.accept')}
            </EduIDButton>
          </ModalFooter>
        </Modal>
      </div>
    ]);
  }
}

Email.propTypes = {
  acceptingTOU: PropTypes.bool,
  tou: PropTypes.string,
  size: PropTypes.string,
  l10n: PropTypes.func,
  handleAccept: PropTypes.func,
  handleReject: PropTypes.func,
}

export default Email;

