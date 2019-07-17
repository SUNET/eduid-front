import React, { Component } from "react";
import PropTypes from "prop-types";
import Questions from "./Questions";
import "style/Footer.scss";

class Footer extends Component {
  render() {
    const url = window.location.href;
    let langElems;
    let navMenu = "";
    if (this.props.is_configured) {
      const langs = Object.getOwnPropertyNames(this.props.languages);
      langElems = langs.map((lang, index) => {
        if (lang === this.props.language) {
          return (
            <span className="langselector" key={index}>
              <span>{this.props.languages[lang]}</span>
            </span>
          );
        } else {
          return (
            <span className="langselector" data-lang={lang} key={index}>
              <a onClick={this.props.changeLanguage}>
                {this.props.languages[lang]}
              </a>
            </span>
          );
        }
      });
    } else {
      langElems = <span />;
    }
    if (url.includes("register")) {
      navMenu = (
        // <div id="eduid-navbar">
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
        // </div>
      );
    }
    return (
      <div id="footer">
        {/* <Questions {...this.props} /> */}
        <div id="footer-content">
          <p>
            <span>&copy;{this.props.l10n("main.copyright")}</span>
          </p>
          <p>
            <span id="language-selector">{langElems}</span>
          </p>
          <nav id="eduid-navbar">{navMenu}</nav>
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
