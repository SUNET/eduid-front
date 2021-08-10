import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIntl } from "react-intl-redux";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const LanguageToggler = ({ browserLocale, setLanguage }) => {
  const dispatch = useDispatch();
  const translateTo = AVAILABLE_LANGUAGES.filter(
    (lang) => lang[0] !== browserLocale
  );
  const locale = translateTo[0][0];
  const language = translateTo[0][1];
  return (
    <li id="language-selector">
      <p className="lang-selected">
        <a
          onClick={() => {
            setLanguage(locale);
            dispatch(
              updateIntl({
                locale: locale,
                messages: LOCALIZED_MESSAGES[locale],
              })
            );
          }}
        >
          {language}
        </a>
      </p>
    </li>
  );
};

const HelpLink = ({ language, translate }) => {
  const toHome = useSelector((state) => state.config.eduid_site_url);
  const toHelp = language === "en" ? `/en/faq.html` : `/faq.html`;
  return (
    <li>
      <a className="help-link" href={`${toHome}${toHelp}`}>
        {translate("header.faq")}
      </a>
    </li>
  );
};

const Nav = (props) => {
  const browserLocale = useSelector((state) => state.intl.locale);
  const [language, setLanguage] = useState(browserLocale);
  return (
    <nav>
      <ul>
        <HelpLink language={language} {...props} />
        <LanguageToggler
          setLanguage={setLanguage}
          browserLocale={browserLocale}
          {...props}
        />
      </ul>
    </nav>
  );
};

const Footer = (props) => {
  return (
    <footer key="0" id="footer">
      <p id="copyright">&copy;{props.translate("main.copyright")}</p>
      <Nav {...props} />
    </footer>
  );
};

Footer.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(Footer);
