import React, { Component } from "react";
import PropTypes from "prop-types";
import Questions from "./Questions";
import "style/Footer.scss";

class Footer extends Component {
  render() {
    const url = window.location.href;
    let langElems = "";
    let languageSelect = "";
    let navMenu = "";

    if (this.props.is_configured) {
      const langs = Object.getOwnPropertyNames(this.props.languages);

      langElems = langs.map((lang, index) => {
        if (lang === this.props.language) {
          return (
            <p key="0" className="langselector" key={index}>
              <span key="0" >{this.props.languages[lang]}</span>
            </p>
          );
        } else {
          return (
            <p key="0"  className="langselector" data-lang={lang} key={index}>
              <a key="0" onClick={this.props.changeLanguage}>
                {this.props.languages[lang]}
              </a>
            </p>
          );
        }
      });
    } else {
      langElems = "";
    }
    languageSelect = [<div key="1" id="language-selector">{langElems}</div>];

    if (url.includes("register")) {
      navMenu = (
        // <div id="eduid-navbar">
        <nav key="2" id="eduid-navbar">
          <ul>
            <li>
              <a href={this.props.students_link}>
                {this.props.l10n("header.students")}
              </a>
            </li>
            <li>
              <a href={this.props.technicians_link}>
                {this.props.l10n("header.technicians")}
              </a>
            </li>

            <li>
              <a href={this.props.staff_link}>
                {this.props.l10n("header.staff")}
              </a>
            </li>
            <li>
              <a href={this.props.faq_link}>{this.props.l10n("header.faq")}</a>
            </li>
          </ul>
        </nav>
        // </div>
      );
    }
    return (
      <div key="0" id="footer">
        {/* <Questions {...this.props} /> */}
        <div id="footer-content">
          <p id="copyright">
            <span>&copy;{this.props.l10n("main.copyright")}</span>
          </p>
          <p>
            <span id="language-selector">{langElems}</span>
          </p>
          {languageSelect}
          {navMenu}
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  is_configured: PropTypes.bool,
  language: PropTypes.string,
  languages: PropTypes.object,
  changeLanguage: PropTypes.func
};

export default Footer;
