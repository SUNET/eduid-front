import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import i18n from "../../src/login/translation/InjectIntl_HOC_factory";
import { postAction, postActionFail, retry } from "actions/ActionMain";
import ActionMainContainer from "containers/ActionMain";

import "./style.scss";

const img = require("../../img/computer_animation.gif");

class Main extends Component {
  hasWebauthnSupport() {
    if (
      navigator.credentials &&
      navigator.credentials.get !== undefined &&
      navigator.credentials.create !== undefined
    ) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (this.hasWebauthnSupport()) {
      this.props.getCredentials.bind(this)();
    }
  }

  handleExternalMFAClick() {
    window.location = this.props.external_mfa_url;
  }

  render() {
    let mfa_fallback = (
      <div className="text-center">
        <div className="card" id="mfa-try-another-way">
          <div className="card-header">
            {this.props.translate("mfa.problems-heading")}
          </div>
          <div className="card-body">
            <button className="btn-link" onClick={this.props.retry}>
              {this.props.translate("mfa.try-again")}
            </button>
            <button
              className="btn-link"
              onClick={this.handleExternalMFAClick.bind(this)}
            >
              {this.props.translate("mfa.freja-eid")}
            </button>
          </div>
        </div>
      </div>
    );

    if (!this.hasWebauthnSupport()) {
      return (
        <ActionMainContainer>
          <div className="col-xs-12 text-center">
            <div className="webauthn-title">
              <h2>{this.props.translate("mfa.no-webauthn-support")}</h2>
            </div>
            <div>
              <p className="lead webauthn-text">
                {this.props.translate("mfa.no-webauthn-support-text")}
              </p>
            </div>
          </div>
          {mfa_fallback}
        </ActionMainContainer>
      );
    }

    let button = "";
    if (this.props.testing) {
      button = (
        <div id="tou-form-buttons" className="form-group">
          <div className="input-group">
            <div className="col-xs-12 col-sm-6">
              <input
                className="btn btn-success"
                type="submit"
                name="accept"
                id="accept"
                value={this.props.translate("mfa.fake-authn")}
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <ActionMainContainer>
        <div className="col-xs-12 text-center">
          <div className="webauthn-title">
            <h2>{this.props.translate("mfa.two-factor-authn")}</h2>
          </div>
          <div className="webauthn-subtitle">
            <h3>{this.props.translate("mfa.extra-security-enabled")}</h3>
          </div>
          <div className="key-animation" />
          <div>
            <p className="lead webauthn-text">
              <strong>{this.props.translate("mfa.login-tapit")}</strong>
            </p>
          </div>
          <div>
            <form method="POST" action="#" id="form" className="form-inline">
              {button}
              <input type="hidden" name="tokenResponse" id="tokenResponse" />
            </form>
          </div>
        </div>
        {mfa_fallback}
      </ActionMainContainer>
    );
  }
}

Main.propTypes = {
  webauthn_options: PropTypes.object,
  testing: PropTypes.bool,
  l10n: PropTypes.func,
  getCredentials: PropTypes.func,
  retry: PropTypes.func,
  external_mfa_url: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  let options = {};
  if (state.config.webauthn_options !== undefined) {
    try {
      options = { ...state.config.webauthn_options };
      options.publicKey = {
        ...options.publicKey,
        challenge: Uint8Array.from(
          Array.prototype.map.call(
            atob(options.publicKey.challenge),
            function (x) {
              return x.charCodeAt(0);
            }
          )
        ),
      };
      const allowCreds = options.publicKey.allowCredentials.map((v) => {
        return {
          ...v,
          id: Uint8Array.from(
            Array.prototype.map.call(atob(v.id), function (x) {
              return x.charCodeAt(0);
            })
          ),
        };
      });
      options.publicKey.allowCredentials = allowCreds;
    } catch (error) {
      // the credentials were registered as webauthn (not U2F)
      options = { ...state.config.webauthn_options };
    }
  }
  let external_mfa_url = "";
  if (
    state.config.eidas_url !== undefined &&
    state.config.mfa_authn_idp !== undefined
  ) {
    let eidas_sp_url = state.config.eidas_url;
    let mfa_auth_idp_url = state.config.mfa_authn_idp;
    let verify_path = "mfa-authentication";
    if (!eidas_sp_url.endsWith("/")) {
      eidas_sp_url.concat("/");
    }
    let next = window.location.toString();
    // add actions expected endpoint
    if (!next.endsWith("/")) {
      next.concat("/");
    }
    next = next + "redirect-action";
    external_mfa_url =
      eidas_sp_url + verify_path + "?idp=" + mfa_auth_idp_url + "&next=" + next;
    console.log(external_mfa_url);
  }
  return {
    webauthn_options: options,
    testing: state.config.testing,
    assertion: state.plugin.webauthn_assertion,
    external_mfa_url: external_mfa_url,
  };
};

export const WEBAUTHN_CREDS_GOT = "WEBAUTHN_CREDS_GOT";

const credentialsGot = (assertion) => ({
  type: WEBAUTHN_CREDS_GOT,
  payload: assertion,
});

let credentials_locked = false;

const mapDispatchToProps = (dispatch, props) => {
  return {
    getCredentials: function () {
      if (this.props.assertion === null && !credentials_locked) {
        let options = this.props.webauthn_options;
        if (options.publicKey !== undefined) {
          try {
            credentials_locked = true;
            navigator.credentials
              .get(options)
              .then((assertion) => {
                if (assertion === null) {
                  dispatch(postActionFail("mfa.error-getting-token"));
                } else {
                  dispatch(credentialsGot(assertion));
                }
                credentials_locked = false;
              })
              .catch((error) => {
                credentials_locked = false;
                console.log("Problem getting MFA credentials:", error);
                if (navigator.appVersion.indexOf("Edge") != -1) {
                  dispatch(postActionFail("mfa.edge-no-u2f"));
                  return;
                }
              });
          } catch (error) {
            credentials_locked = false;
            console.log("Error getting credentials:", error);
            dispatch(postActionFail("mfa.error-getting-token"));
          }
        } else {
          console.log("Webauthn data not available yet");
        }
      } else {
        console.log("Webauthn assertion already gotten");
      }
    },
    retry: function (e) {
      e.preventDefault();
      dispatch(retry());
    },
  };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default i18n(MainContainer);
