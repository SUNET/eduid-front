
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import { appFetching, postAction, postActionFail, retry } from "actions/ActionWrapper";
import ActionWrapperContainer from "containers/ActionWrapper";

import './style.scss';

const img = require('../../img/computer_animation.gif');

class Main extends Component {

    hasWebauthnSupport () {
        if (navigator.credentials && navigator.credentials.preventSilentAccess) {
            return true;
        }
        return false
    }

    componentDidUpdate () {
        if (this.hasWebauthnSupport()) {
            this.props.getCredentials.bind(this)();
        }
    }

    handleExternalMFAClick () {
        window.location = this.props.external_mfa_url;
    }

    render () {
        let mfa_fallback = (
          <div className="row justify-content-center">
            <div className="col-2">
                <div className="card" id="mfa-try-another-way">
                    <div className="card-header">
                        {this.props.l10n('mfa.problems-heading')}
                    </div>
                    <div className="card-body">
                        <button className="btn-link" onClick={this.props.retry}>{this.props.l10n('mfa.try-again')}</button>
                        <button className="btn-link" onClick={this.handleExternalMFAClick.bind(this)}>{this.props.l10n('mfa.freja-eid')}</button>
                    </div>
                </div>
            </div>
          </div>);

        if (! this.hasWebauthnSupport()) {
            return (
                <ActionWrapperContainer>
                <div className="col-xs-12 text-center">
                    <div className="webauthn-title">
                    <h2>{this.props.l10n('mfa.no-webauthn-support')}</h2>
                    </div>
                    <div>
                    <p className="lead webauthn-text">{this.props.l10n('mfa.no-webauthn-support-text')}</p>
                    </div>
                </div>
                {mfa_fallback}
                </ActionWrapperContainer>
            );
        }

        let button = '';
        if (this.props.testing) {
            button = (<div id="tou-form-buttons" className="form-group">
                         <div className="input-group">
                             <div className="col-xs-12 col-sm-6">
                                 <input className="btn btn-success" type="submit" name="accept" id="accept"
                                        value={this.props.l10n('mfa.fake-authn')} />
                             </div>
                         </div>
                     </div>);
        }

        return (
            <ActionWrapperContainer>
              <div className="col-xs-12 text-center">
                <div className="webauthn-title">
                  <h2>{this.props.l10n('mfa.two-factor-authn')}</h2>
                </div>
                <div className="webauthn-subtitle">
                  <h3>{this.props.l10n('mfa.extra-security-enabled')}</h3>
                </div>
                <div className="key-animation">
                </div>
                <div>
                  <p className="lead webauthn-text"><strong>{this.props.l10n('mfa.login-tapit')}</strong></p>
                </div>
                <div>
                  <form method="POST" action="#" id="form" className="form-inline">
                     {button}
                     <input type="hidden" name="tokenResponse" id="tokenResponse"/>
                  </form>
                </div>
              </div>
              {mfa_fallback}
            </ActionWrapperContainer>
        );
    }
}

Main.propTypes = {
    webauthn_options: PropTypes.object,
    testing: PropTypes.bool,
    l10n: PropTypes.func,
    getCredentials: PropTypes.func,
    retry: PropTypes.func,
    external_mfa_url: PropTypes.string
};

const mapStateToProps = (state, props) => {
    let options = {};
    if (state.main.webauthn_options !== undefined) {
        try {
            options = {...state.main.webauthn_options};
            options.publicKey = {
                ...options.publicKey,
                challenge: Uint8Array.from(Array.prototype.map.call(atob(options.publicKey.challenge),
                                                                    function (x) {
                                                                        return x.charCodeAt(0);
                                                                    }))
            };
            const allowCreds = options.publicKey.allowCredentials.map((v) => {
                return {
                    ...v,
                    id: Uint8Array.from(Array.prototype.map.call(atob(v.id),
                                                                 function (x) {
                                                                     return x.charCodeAt(0);
                                                                 }))
                }
            });
            options.publicKey.allowCredentials = allowCreds;
        } catch (error) {
            // the credentials were registered as webauthn (not U2F)
            options = {...state.main.webauthn_options};
        }
    }
    let external_mfa_url = '';
    if (state.main.eidas_url !== undefined && state.main.mfa_authn_idp !== undefined) {
        let eidas_sp_url = state.main.eidas_url;
        let mfa_auth_idp_url = state.main.mfa_authn_idp;
        let verify_path = "mfa-authentication";
        if (!eidas_sp_url.endsWith("/")) {
            eidas_sp_url.concat("/")
        }
        // base64 encode next argument to avoid our request sanitation
        let next = btoa(window.location);
        external_mfa_url = eidas_sp_url + verify_path + "?idp=" + mfa_auth_idp_url + "&next=" + next;
        console.log(external_mfa_url);
    }
    return {
        webauthn_options: options,
        testing: state.main.testing,
        assertion: state.plugin.webauthn_assertion,
        external_mfa_url: external_mfa_url
    }
};

export const WEBAUTHN_CREDS_GOT = "WEBAUTHN_CREDS_GOT";

const credentialsGot = (assertion) => ({
    type: WEBAUTHN_CREDS_GOT,
    payload: assertion
});

const mapDispatchToProps = (dispatch, props) => {
    return {
        getCredentials: function () {
            if (this.props.assertion === null) {
                let options = this.props.webauthn_options;
                if (options.publicKey !== undefined) {
                    try {
                        navigator.credentials.get(options)
                        .then( (assertion) => {
                            if (assertion === null) {
                                dispatch(postActionFail("mfa.error-getting-token"));
                            } else {
                                dispatch(credentialsGot(assertion));
                            }
                        })
                        .catch( (error) => {
                            console.log('Problem getting MFA credentials:', error)
                            dispatch(postActionFail("mfa.error-getting-token"));
                        });
                    } catch(error) {
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
    }
};

const MainContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);

export default i18n(MainContainer);

