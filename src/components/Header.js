
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'style/Header.scss';


class Header extends Component {

  render () {

    return (
      <header id="header" className="header">
        <div className="logo" id="eduid-logo-large"></div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-md" id="eduid-navbar">
              <a className="navbar-brand" href="#">
                <div id="eduid-logo-small" className="logo"></div>
              </a>
              <button className="navbar-toggler" type="button" onClick={this.props.toggleMenu}>
                  <span className="navbar-toggler-icon"></span>
              </button>
          <div className="collapsed navbar-collapse text-center" id="eduid-menu">
            <ul  className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href={this.props.students_link}>{this.props.l10n('header.student')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={this.props.technicians_link}>{this.props.l10n('header.technician')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={this.props.staff_link}>{this.props.l10n('header.staff')}</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={this.props.faq_link}>{this.props.l10n('header.faq')}</a>
              </li>
            </ul>
            <div className="buttons nav navbar-nav float-right">
              <div className="button orange">
                <a onClick={this.props.gotoSignup}>{this.props.l10n('header.signup')}</a>
              </div>
                <div className="button white-border">
                  <a onClick={this.props.gotoSignin}>{this.props.l10n('header.signin')}</a>
                </div>
              </div>
            </div>
        </nav>
      </header>);
  }
}

Header.propTypes = {
  l10n: PropTypes.func,
  gotoSignup: PropTypes.func,
  gotoSignin: PropTypes.func,
}

export default Header;
