
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import EduIDButton from "components/EduIDButton";

import 'style/Email.scss';


/* FORM */

const validate = values => {
    const errors = {};
    if (!values['email']) {
        errors['email'] = 'required'
    }
    return errors
}

let EmailForm = props => {

  return (
    <div id="email-register">
      <Form>
          <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">@</div>
              </div>
              <Input type="email"
                     name="email"
                     id="email-input"
                     placeholder="name@example.edu" />
              <EduIDButton color="primary"
                      id="email-button"
                      onClick={props.handleEmail}>
                 {props.l10n('email.sign-up-email')}
              </EduIDButton>
          </div>
      </Form>
    </div>
  )
};

EmailForm = reduxForm({
  form: 'email',
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
        <div className="col-lg-3"></div>
        <div className="col-lg-6 jumbotron">
            <div id="clouds"></div>
            <h1>{this.props.l10n('main.welcome')}</h1>

            <p className="lead">{this.props.l10n('main.create-account')}</p>

            <EmailForm {...this.props} />
        </div>
        <div className="col-lg-3"></div>
      </div>,
      <div key="1" className="row text-center">
        <Modal isOpen={this.props.acceptingTOU}>
          <ModalHeader>{this.props.l10n('tou.header')}</ModalHeader>
          <ModalBody>{this.props.tou}</ModalBody>
          <ModalFooter>
            <EduIDButton color="danger" onClick={this.props.handleReject}>{this.props.l10n('tou.reject')}</EduIDButton>
            <EduIDButton color="primary" onClick={this.props.handleAccept}>{this.props.l10n('tou.accept')}</EduIDButton>
          </ModalFooter>
        </Modal>
      </div>
    ]);
  }
}

Email.propTypes = {
  acceptingTOU: PropTypes.bool,
  tou: PropTypes.string,
  l10n: PropTypes.func,
  handleAccept: PropTypes.func,
  handleReject: PropTypes.func,
}

export default Email;

