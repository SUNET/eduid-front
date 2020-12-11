import React, { Component } from "react";
import PropTypes from "prop-types";

import "../login/styles/index.scss";

class Footer extends Component {
  render() {
    let langElems = "";
    const langs = Object.getOwnPropertyNames(this.props.languages);
    langElems = langs.map((lang, index) => {
      if (lang === this.props.language) {
        // sets the < html lang=""> to the interface language
        document.documentElement.lang = this.props.language;
        return (
          <p className="non-selected" key={index}>
            <span key="0">{this.props.languages[lang]}</span>
          </p>
        );
      } else {
        return (
          <p className="lang-selected" data-lang={lang} key={index}>
            <a key="0" onClick={this.props.changeLanguage}>
              {this.props.languages[lang]}
            </a>
          </p>
        );
      }
    });

    return (
      <footer key="0" id="footer">
        <p key="0" id="copyright">
          <span>&copy;{this.props.translate("main.copyright")}</span>
        </p>
        <nav key="1">
          <ul>
            <li key="0">
              <a className="help-link" href={this.props.faq_link}>
                {this.props.translate("header.faq")}
              </a>
            </li>
            <li key="1" id="language-selector">
              {langElems}
            </li>
          </ul>
        </nav>
      </footer>
    );
  }
}

Footer.propTypes = {
  is_configured: PropTypes.bool,
  language: PropTypes.string,
  languages: PropTypes.object,
  changeLanguage: PropTypes.func,
};

export default Footer;
