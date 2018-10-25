
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'style/AccountCreated.scss';


class AccountCreated extends Component {

  render () {
    return (
      <div className="text-center">
        <div>
            <h1>{this.props.l10n('main.welcome')}</h1>
            <h2>{this.props.l10n('created.account-created')}</h2>
            <h3>{this.props.l10n('created.confirm-registration')}</h3>
            <p>{this.props.l10n('created.email-sent')({email: this.props.email})}</p>
        </div>
      </div>
    );
  }
}

AccountCreated.propTypes = {
  email: PropTypes.string
}

export default AccountCreated;


