
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ScriptLoader from 'react-script-loader-hoc';
import { Button } from 'reactstrap';
import Recaptcha from "react-recaptcha";

import 'style/Captcha.scss';

let recaptchaInstance;

class Captcha extends Component {

  render () {

    return ([
        <div className="row" key="0">
          <div className="col-lg-3"></div>
          <div className="col-lg-6">
               <Recaptcha
                   sitekey={this.props.recaptcha_key}
                   render="explicit"
                   onloadCallback={this.props.loadedCaptcha}
                   verifyCallback={this.props.handleCaptcha} />
          </div>
          <div className="col-lg-3"></div>
        </div>,
        <div className="row" key="1">
          <div className="col-lg-6">
              <Button onClick={this.props.sendCaptcha}>button</Button>
          </div>
          <div className="col-lg-6"></div>
        </div>
    ]);
  }
}

Captcha.propTypes = {
  is_fetching: PropTypes.bool,
  recaptcha_key: PropTypes.string,
  handleCaptcha: PropTypes.func
}

export default ScriptLoader('https://www.google.com/recaptcha/api.js?render=explicit')(Captcha);
