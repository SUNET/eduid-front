
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

import 'style/Header.scss';


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
        const linksAndButtons = ([
            <ul key="0" className="navbar-nav mr-auto">
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
            </ul>,
            <div key="1" className="buttons nav navbar-nav float-right">
              <div className="button orange">
                <a onClick={this.props.gotoSignup}>{this.props.l10n('header.signup')}</a>
              </div>
              <div className="button white-border">
                <a onClick={this.props.gotoSignin}>{this.props.l10n('header.signin')}</a>
              </div>
            </div>
        ]);

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
                    {linksAndButtons}
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
                    {linksAndButtons}
                  </div>
                </nav>
              </header>
          );
        }
    }
}


Header.propTypes = {
  size: PropTypes.string,
  l10n: PropTypes.func,
  gotoSignup: PropTypes.func,
  gotoSignin: PropTypes.func,
}

export default Header;
