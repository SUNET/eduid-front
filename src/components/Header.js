
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'style/Header.scss';


class Header extends Component {

  render () {

    return (<header id="header" className="header">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-2"></div>
                    <div className="col-xl-5 d-flex flex-row header-links">
                      <div className="logo" id="eduid-logo-large"></div> 
                      <a className="header-link" href="https://www.eduid.se/index.html">{this.props.l10n('header.student')}</a>
                      <a className="header-link" href="https://www.eduid.se/tekniker.html">{this.props.l10n('header.technician')}</a>
                      <a className="header-link" href="https://www.eduid.se/personal.html">{this.props.l10n('header.staff')}</a>
                      <a className="header-link" href="https://www.eduid.se/faq.html">{this.props.l10n('header.faq')}</a>
                    </div>
                    <div className="col-xl-3 d-flex flex-row-reverse header-buttons"
                         data-dashboard_url={this.props.dashboard_url}>
                      <button className="eduid-btn white"
                              id="signin-button"
                              onClick={this.props.gotoSignin}>
                         {this.props.l10n('header.signin')}
                      </button>
                      <button className="eduid-btn orange"
                              id="signup-button"
                              onClick={this.props.gotoSignup}>
                         {this.props.l10n('header.signup')}
                      </button>
                    </div>
                    <div className="col-xl-2"></div>
                  </div>
                </div>
            </header>);
  }
}

Header.propTypes = {
  l10n: PropTypes.func,
  gotoSignup: PropTypes.func,
  gotoSignin: PropTypes.func,
}

export default Header;
