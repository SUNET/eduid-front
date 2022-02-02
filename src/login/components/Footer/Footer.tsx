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
            <a className="help-link" href={`${eduidHomeUrl}${faqUrl}`}>
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
