
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'style/CodeVerified.scss';


class CodeVerified extends Component {

  render () {

    return (
      <div className="row text-center">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 jumbotron">
            <h1>{this.props.l10n('code.verified')}</h1>
        </div>
        <div className="col-lg-3"></div>
      </div>
    );
  }
}

CodeVerified.propTypes = {
  email: PropTypes.string
}

export default CodeVerified;



