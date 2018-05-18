
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import 'style/Header.scss';


class Header extends Component {

  render () {

    return (<header id="header" className="header">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-4 d-flex flex-row">
                      <div className="logo" id="eduid-logo-large"></div> 
                      <a className="nav-link" href="https://www.eduid.se/index.html">{this.props.l10n('header.student')}</a>
                      <a className="nav-link" href="https://www.eduid.se/tekniker.html">{this.props.l10n('header.technician')}</a>
                      <a className="nav-link" href="https://www.eduid.se/personal.html">{this.props.l10n('header.staff')}</a>
                      <a className="nav-link" href="https://www.eduid.se/faq.html">{this.props.l10n('header.faq')}</a>
                    </div>
                    <div className="col-lg-2 d-flex flex-row-reverse"
                         data-dashboard_url={this.props.dashboard_url}>
                      <Button color="primary"
                              className="eduid-btn"
                              id="signin-button"
                              onClick={this.props.gotoSignin}>
                         {this.props.l10n('header.signin')}
                      </Button>
                      <Button color="warning"
                              className="eduid-btn"
                              id="signup-button"
                              onClick={this.props.gotoSignup}>
                         {this.props.l10n('header.signup')}
                      </Button>
                    </div>
                    <div className="col-lg-3"></div>
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
