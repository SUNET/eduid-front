
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EduIDButton from 'components/EduIDButton';

import 'style/CodeVerified.scss';


class CodeVerified extends Component {

  render () {

    return (
      <form key="2" method="POST" action={this.props.dashboard_url}>
          <input type="hidden" name="eppn" value={this.props.eppn} />
          <input type="hidden" name="nonce" value={this.props.nonce} />
          <input type="hidden" name="ts" value={this.props.ts} />
          <input type="hidden" name="token" value={this.props.token} />
        <div key="0" className="row text-center">
          <div className="col-lg-1"></div>
            <div className="col-lg-10">
              <h1>{this.props.l10n('main.welcome')}</h1>
              <p className="lead registration-completed">
                 {this.props.l10n('finish.registration-complete')({email: this.props.email})}
              </p>
              <p className="lead">{this.props.l10n('finish.write-password')}</p>
              <pre className="pre-big text-center force-select-all">
                <mark>{this.props.password}</mark>
              </pre>
              <EduIDButton id="gotit-button"
                           type="submit">
                {this.props.l10n('finish.got-it')}
              </EduIDButton>
            </div>
        </div>
      </form>
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
}

export default CodeVerified;
