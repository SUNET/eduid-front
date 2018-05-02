
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';

import 'style/Captcha.scss';


class Captcha extends Component {

  render () {

    return ([
        <div className="col-lg-3" key="0"></div>,
        <div className="col-lg-6" key="1">
             CAPTCHA
        </div>,
        <div className="col-lg-3" key="2"></div>
    ]);
  }
}

Captcha.propTypes = {
  is_fetching: PropTypes.bool
}

export default Captcha;


