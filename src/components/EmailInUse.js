
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'style/EmailInUse.scss';


class EmailInUse extends Component {

  render () {

    return (
      <div className="text-center">
        <div>
            <h1>{this.props.l10n('main.welcome')}</h1>
            <p className="lead">{this.props.l10n('used.email-in-use')}</p>
            <h2 className="subtitle">{this.props.l10n('used.forgot-password')}</h2>
            <a href={this.props.reset_url} className="button">
               {this.props.l10n('used.reset-password')}
            </a>
        </div>
      </div>
    );
  }
}

EmailInUse.propTypes = {
  l10n: PropTypes.func,
  reset_url: PropTypes.string
}

export default EmailInUse;
