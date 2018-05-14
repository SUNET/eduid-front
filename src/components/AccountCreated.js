
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'style/AccountCreated.scss';


class AccountCreated extends Component {

  render () {

    return (
      <div className="row text-center">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 jumbotron">
            <h1>{this.props.l10n('main.welcome')}</h1>
            <h3>{this.props.l10n('created.account-created')}</h3>
            <h3>{this.props.l10n('created.confirm-registration')}</h3>
            <p className="lead">{this.props.l10n('created.email-sent')({email: this.props.email})}</p>
        </div>
        <div className="col-lg-3"></div>
      </div>
    );
  }
}

AccountCreated.propTypes = {
  email: PropTypes.string
}

export default AccountCreated;


