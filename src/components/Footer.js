import React, { Component } from "react";
import PropTypes from "prop-types";
import Questions from "./Questions";
import "style/Footer.scss";

class Footer extends Component {
  render() {
    let langElems;
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
    const navMenu = (
      <ul>
        <li>
          <a href={this.props.studentsLink}>
            {this.props.l10n("header.students")}
          </a>
        </li>
        <li>
          <a href={this.props.techniciansLink}>
            {this.props.l10n("header.technicians")}
          </a>
        </li>
        <li>
          <a href={this.props.staffLink}>{this.props.l10n("header.staff")}</a>
        </li>
        <li>
          <a href={this.props.faqLink}>{this.props.l10n("header.faq")}</a>
        </li>
      </ul>
    );
    return (
      <div id="footer">
        <Questions />
        <div id="footer-content">
          <nav id="eduid-nav">{navMenu}</nav>
          <p>
            &copy;{this.props.l10n("footer.copyright")}
            <span className="float-right">{langElems}</span>
          </p>
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
