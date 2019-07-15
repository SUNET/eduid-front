import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import ScriptLoader from "react-script-loader-hoc";
import EduIDButton from "components/EduIDButton";
import DashboardNav from "components/DashboardNav";
import Recaptcha from "react-recaptcha";

import FetchingContext from "components/FetchingContext";

import "style/Captcha.scss";

class Captcha extends Component {
  componentWillMount() {}

  render() {
    if (this.props.fetching === this.props.scriptsLoadedSuccessfully) {
      this.props.setFetching(!this.props.scriptsLoadedSuccessfully);
    }

    return [
      <div key="0" id="register-container">
        {/* <div> */}
        {/* <h1>{this.props.l10n("captcha.one-step-left")}</h1> */}
        {/* <DashboardNav {...this.props} /> */}
        <h3 className="register-header">
          {this.props.l10n("captcha.verify-human")}
        </h3>
        ,
        <div key="1">
          <div id="captcha-buttons" className=" text-center">
            <Recaptcha
              sitekey={this.props.recaptcha_key}
              render="explicit"
              onloadCallback={this.props.loadedCaptcha}
              verifyCallback={this.props.handleCaptcha}
            />
            <EduIDButton
              className="modal-button captcha ok-button"
              onClick={this.props.sendCaptcha}
              id="send-captcha-button"
            >
              {this.props.l10n("captcha.submit")}
            </EduIDButton>
            <EduIDButton
              onClick={this.props.cancelCaptcha}
              className="modal-button captcha cancel-button"
              id="cancel-captcha-button"
            >
              {this.props.l10n("captcha.cancel")}
            </EduIDButton>
          </div>
        </div>
      </div>
    ];
  }
}

Captcha.propTypes = {
  recaptcha_key: PropTypes.string,
  handleCaptcha: PropTypes.func,
  fetching: PropTypes.bool,
  setFetching: PropTypes.func
};

const LoadingCaptcha = ScriptLoader(
  "https://www.google.com/recaptcha/api.js?render=explicit"
)(Captcha);

export default props => (
  <FetchingContext.Consumer>
    {({ fetching, setFetching }) => (
      <LoadingCaptcha
        {...props}
        fetching={fetching}
        setFetching={setFetching}
      />
    )}
  </FetchingContext.Consumer>
);
