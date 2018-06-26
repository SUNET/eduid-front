
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EduIDButton from 'components/EduIDButton';

import 'style/CodeVerified.scss';


class CodeVerified extends Component {

  render () {

    let exits;

    if (this.props.gotten) {
        exits = (
            <div className="container-fluid">
              <div className="row text-center">
                <div className="col-lg-2"></div>
                <form method="GET" action={this.props.dashboard_url}>
                  <input type="hidden" name="eppn" value={this.props.eppn} />
                  <input type="hidden" name="nonce" value={this.props.nonce} />
                  <input type="hidden" name="ts" value={this.props.ts} />
                  <input type="hidden" name="token" value={this.props.token} />
                  <div className="col-lg-4 finish-action">
                    <h4>{this.props.l10n('finish.can-now-login')}</h4>
                    <p dangerouslySetInnerHTML={{__html: this.props.l10n('finish.accept-unconfirmed')}}></p>
                    <EduIDButton color="primary">{this.props.l10n('finish.finish')}</EduIDButton>
                  </div>
                  <div className="col-lg-4 finish-action">
                    <h4>{this.props.l10n('finish.access-more')}</h4>
                    <p>{this.props.l10n('finish.to-dashboard')}</p>
                    <EduIDButton type="submit"
                                 id="confirm-id-button"
                                 color="primary">
                        {this.props.l10n('finish.confirm-identity')}
                    </EduIDButton>
                  </div>
                </form>
                <div className="col-lg-2"></div>
              </div>
            </div>
        );
    } else {
        exits = ([
              <p key="0" className="lead">{this.props.l10n('finish.write-password')}</p>,
              <pre className="pre-big text-center" key="1">{this.props.password}</pre>,
              <EduIDButton key="2"
                           id="gotit-button"
                           color="primary"
                           onClick={this.props.gotIt}>
                {this.props.l10n('finish.got-it')}
              </EduIDButton>
        ]);
    }

    return (
        <div key="0" className="row text-center">
          <div className="col-lg-1"></div>
          <div className="col-lg-10">
              <h1>{this.props.l10n('main.welcome')}</h1>
              <p className="lead registration-completed">
                 {this.props.l10n('finish.registration-complete')({email: this.props.email})}
              </p>
              {exits}
          </div>
          <div className="col-lg-1"></div>
        </div>
    );
  }
}

CodeVerified.propTypes = {
    dashboard_url: PropTypes.string,
    password: PropTypes.string,
    eppn: PropTypes.string,
    nonce: PropTypes.string,
    ts: PropTypes.string,
    token: PropTypes.string,
    email: PropTypes.string,
    l10n: PropTypes.func,
    gotIt: PropTypes.func
}

export default CodeVerified;
