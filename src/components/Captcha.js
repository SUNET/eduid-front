import React, { Component } from "react";
import PropTypes from "prop-types";
import ScriptLoader from "react-script-loader-hoc";
import EduIDButton from "components/EduIDButton";
import Recaptcha from "react-recaptcha";
import FetchingContext from "components/FetchingContext";

class Captcha extends Component {
  componentWillMount() {}

  render() {
    if (this.props.fetching === this.props.scriptsLoadedSuccessfully) {
      this.props.setFetching(!this.props.scriptsLoadedSuccessfully);
    }

    return [
      <div key="0" id="content" className="vertical-content-margin">
        <h3 className="register-header">
          {this.props.translate("captcha.verify-human")}
        </h3>
        <div key="1" id="captcha-container">
          <div id="captcha">
            <Recaptcha
              sitekey={this.props.recaptcha_key}
              render="explicit"
              onloadCallback={this.props.loadedCaptcha}
              verifyCallback={this.props.handleCaptcha}
            />
          </div>
          <div id="captcha-buttons">
            <EduIDButton
              className="settings-button captcha"
              onClick={this.props.sendCaptcha}
              id="send-captcha-button"
            >
              {this.props.translate("captcha.submit")}
            </EduIDButton>
            <EduIDButton
              onClick={this.props.cancelCaptcha}
              className="modal-button captcha cancel-button"
              id="cancel-captcha-button"
            >
              {this.props.translate("captcha.cancel")}
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
