
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Collapse } from 'reactstrap';


class Header extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

  render () {

      let email = this.props.email;
      if (email === '') {
	  email = this.props.l10n("main.no-email-yet")
      }

      const buttons = (
                <div className="buttons nav navbar-nav float-right">
                  <div className="button log-out">
                    <a id="logout-button"
                       onClick={this.props.handleLogout}>
                      {this.props.l10n('header.logout')}
                    </a>
                  </div>
                  <div className="loa-big hidden-sm" id="eduid-header-loa">
                    {email} ({this.props.l10n(this.props.confirmed)})
                  </div>
              </div>);

      const links = (
                  <ul  className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <a className="nav-link" href={this.props.studentsLink}>{this.props.l10n('header.students')}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href={this.props.techniciansLink}>{this.props.l10n('header.technicians')}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href={this.props.staffLink}>{this.props.l10n('header.staff')}</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href={this.props.faqLink}>{this.props.l10n('header.faq')}</a>
                    </li>
              </ul>);

        if (this.props.size === 'xs') {
            return (
              <header id="header" className="header">
                <nav className="navbar navbar-dark bg-dark">
                  <a className="navbar-brand" href="#">
                    <div id="eduid-logo-small" className="logo"></div>
                  </a>
                  <button className="navbar-toggler" type="button" onClick={this.toggle}>
                      <span className="navbar-toggler-icon"></span>
                  </button>
                </nav>
                <Collapse isOpen={!this.state.collapse} className="text-center" id="eduid-menu">
                  <nav className="navbar navbar-dark bg-dark" id="eduid-navbar">
                    {links}
                    {buttons}
                  </nav>
                </Collapse>
              </header>
            );
        } else {
            return (
              <header id="header" className="header">
                <div className="logo" id="eduid-logo-large"></div>
                <nav className="navbar navbar-expand-md" id="eduid-navbar">
                  <div className="collapsed navbar-collapse text-center" id="eduid-menu">
                    {links}
                    {buttons}
                  </div>
                </nav>
              </header>
          );
        }
  }
}

Header.propTypes = {
  email: PropTypes.string,
  confirmed: PropTypes.string,
  studentsLink: PropTypes.string,
  techniciansLink: PropTypes.string,
  staffLink: PropTypes.string,
  faqLink: PropTypes.string
};

export default Header;
