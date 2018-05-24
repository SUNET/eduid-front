
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

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


const getEmailForm = (size) => {

    let EmailForm;

    if (size !== 'xs') {
        EmailForm = props => {

          return (
            <div id="email-register">
              <Form>
                  <div className="input-group">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                      </div>
                      <Input type="email"
                             name="email"
                             id="email-input"
                             placeholder="name@example.edu" />
                      <EduIDButton className="btn-in-row eduid-button"
                                   id="email-button"
                                   onClick={props.handleEmail}>
                         {props.l10n('email.sign-up-email')}
                      </EduIDButton>
                  </div>
              </Form>
            </div>
          )
        };
    } else {
        EmailForm = props => {

          return (
            <div id="email-register">
              <Form className="form-horizontal">
                  <div className="input-group">
                      <Input type="email"
                             name="email"
                             id="email-input"
                             placeholder="name@example.edu" />
                      <EduIDButton id="email-button"
                                   onClick={props.handleEmail}>
                         {props.l10n('email.sign-up-email')}
                      </EduIDButton>
                  </div>
              </Form>
            </div>
          )
        };
    }

    EmailForm = reduxForm({
      form: 'email',
      validate
    })(EmailForm)

    EmailForm = connect(
      state => ({
        enableReinitialize: true
      })
    )(EmailForm)

    return EmailForm;
}

/* COMPONENT */

class Email extends Component {

  render () {

    const EmailForm = getEmailForm(this.props.size);

    return ([
      <div key="0" className="row text-center">
        <div className="col-xl-2"></div>
        <div className="col-xl-8 jumbotron">
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

