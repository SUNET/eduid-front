
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';

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
  let spinning = false,
      error = false;
  if (props.is_fetching) spinning = true;

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
              <Button color="primary"
                      id="email-button"
                      onClick={props.handleEmail}>
                 {props.l10n('email.sign-up-email')}
              </Button>
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
        <div className="col-lg-3" key="0"></div>,
        <div className="col-lg-6" key="1">
            <div id="clouds"></div>
            <h1>{this.props.l10n('main.welcome')}</h1>

            <p className="lead">{this.props.l10n('main.create-account')}</p>

            <EmailForm {...this.props} />
        </div>,
        <div className="col-lg-3" key="2"></div>
    ]);
  }
}

Email.propTypes = {
  is_fetching: PropTypes.bool
}

export default Email;

