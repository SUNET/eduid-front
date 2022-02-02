import React, { useState } from "react";
import { updateIntl } from "../../../reducers/Internationalisation";
import { AVAILABLE_LANGUAGES, LOCALIZED_MESSAGES } from "globals";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";

const Footer = (): JSX.Element => {
  const browserLocale = useDashboardAppSelector((state) => state.intl.locale);
  const toHome = useDashboardAppSelector((state) => state.config.eduid_site_url);
  const [browserLanguage, setLanguage] = useState(browserLocale);
  const dispatch = useDashboardAppDispatch();
  const toHelp = browserLanguage === "en" ? `/en/faq.html` : `/faq.html`;

  let translateTo: any = [];
  let locale: any = [];
  let language: any = [];

  if (AVAILABLE_LANGUAGES !== undefined) {
    translateTo = AVAILABLE_LANGUAGES.filter((lang) => lang[0] !== browserLocale);
    locale = translateTo[0][0];
    language = translateTo[0][1];
  }
  const messages = LOCALIZED_MESSAGES as unknown as { [key: string]: { [key: string]: string } };

  // TODO: Figure out what this code is used for, from Footer container
  // changeDashboardSession: function (reload_to) {
  //   return (e) => {
  //     e.preventDefault();
  //     Cookies.remove("eduid-dashboard-version");
  //     Cookies.set("eduid-dashboard-version", "1");
  //     window.location = reload_to;
  //   };
  // }

  return (
    <footer key="0" id="footer">
      <p id="copyright">
        &copy;&nbsp;
        <FormattedMessage defaultMessage="SUNET 2013-2022" description="Footer copyright" />
      </p>
      <nav>
        <ul>
          <li>
            <a className="help-link" href={`${toHome}${toHelp}`}>
              <FormattedMessage defaultMessage="Help" description="Footer faq" />
            </a>
          </li>
          <li id="language-selector">
            <p className="lang-selected" data-lang={language}>
              <a
                className="change-language"
                onClick={() => {
                  // sets the <html lang=""> to the interface language
                  document.documentElement.lang = locale;
                  setLanguage(locale);
                  dispatch(
                    updateIntl({
                      locale: locale,
                      messages: messages[locale],
                    })
                  );
                }}
              >
                {language}
              </a>
            </p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
