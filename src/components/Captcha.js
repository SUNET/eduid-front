
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ScriptLoader from 'react-script-loader-hoc';
import EduIDButton from 'components/EduIDButton';
import Recaptcha from "react-recaptcha";

import { FetchingContext } from "components/Main";

import 'style/Captcha.scss';

let recaptchaInstance;

class Captcha extends Component {

  render () {

    if (this.props.fetching === this.props.scriptsLoadedSuccessfully) {
    	this.props.setFetching(!(this.props.scriptsLoadedSuccessfully));
    } 

    return ([
      <div className="row text-center" key="0">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
            <h1>{this.props.l10n('captcha.one-step-left')}</h1>

            <p className="lead">{this.props.l10n('captcha.verify-human')}</p>

        </div>
        <div className="col-lg-3"></div>
      </div>,
      <div className="row text-center" key="1">
        <div className="col-lg-5"></div>
        <div className="col-lg-2 recaptcha-holder">
             <Recaptcha
                 sitekey={this.props.recaptcha_key}
                 render="explicit"
                 onloadCallback={this.props.loadedCaptcha}
                 verifyCallback={this.props.handleCaptcha} />
        </div>
        <div className="col-lg-5"></div>
      </div>,
      <div className="row text-center" key="2">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
            <EduIDButton className="btn-in-row"
                    color="primary"
                    onClick={this.props.sendCaptcha}>
                {this.props.l10n('captcha.submit')}
            </EduIDButton>
            <EduIDButton className="btn-in-row"
                    color="light">
                {this.props.l10n('captcha.cancel')}
            </EduIDButton>
        </div>
        <div className="col-lg-3"></div>
      </div>
    ]);
  }
}

Captcha.propTypes = {
  recaptcha_key: PropTypes.string,
  handleCaptcha: PropTypes.func
}

const LoadingCaptcha = ScriptLoader('https://www.goppppogle.com/recaptcha/api.js?render=explicit')(Captcha);

export default props => (
      <FetchingContext.Consumer>
        {({fetching, setFetching}) => <LoadingCaptcha {...props} fetching={fetching} setFetching={setFetching} />}
      </FetchingContext.Consumer>
);
