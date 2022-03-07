import React from "react";
import { updateIntl } from "../../../reducers/Internationalisation";
import { AVAILABLE_LANGUAGES, LOCALIZED_MESSAGES } from "globals";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";

const Footer = (): JSX.Element => {
  const browserLocale = useDashboardAppSelector((state) => state.intl.locale);
  const eduidHomeUrl = useDashboardAppSelector((state) => state.config.eduid_site_url);
  const dispatch = useDashboardAppDispatch();
  const faqUrl = browserLocale === "en" ? `/en/faq.html` : `/faq.html`;
  const messages = LOCALIZED_MESSAGES as unknown as { [key: string]: { [key: string]: string } };

  let translateTo: string[][] = [];
  let locale = "";
  let language = "";

  if (AVAILABLE_LANGUAGES !== undefined) {
    translateTo = AVAILABLE_LANGUAGES.filter((lang) => lang[0] !== browserLocale);
    locale = translateTo[0][0];
    language = translateTo[0][1];
  }

  const changeLanguage = () => {
    if (locale) {
      dispatch(
        updateIntl({
          locale: locale,
          messages: messages[locale],
        })
      );
    }
  };

  return (
    <footer key="0" id="footer">
      <div className="logo-wrapper">
        <a href="https://www.sunet.se/">
          <img src="/assets/images/sunet_logo.svg" alt="sunet-logo" className="sunet-logo" />
        </a>
        <span className="copyright">
          &copy;
          <FormattedMessage defaultMessage="2013-2022" description="Footer copyright" />
        </span>
      </div>

      <nav>
        <ul>
          <li>
            <a className="help-link" href={`${eduidHomeUrl}${faqUrl}`}>
              <FormattedMessage defaultMessage="Help" description="Footer faq" />
            </a>
          </li>
          <li id="language-selector">
            <p className="lang-selected" data-lang={locale}>
              <a onClick={changeLanguage}>{language}</a>
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
