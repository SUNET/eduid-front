import { AVAILABLE_LANGUAGES, LOCALIZED_MESSAGES } from "globals";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { updateIntl } from "slices/Internationalisation";




const Footer = ({ faqPath }: any): JSX.Element => {

  const currentLocale = useDashboardAppSelector((state) => state.intl.locale);
  const eduidHomeUrl = useDashboardAppSelector((state) => state.config.eduid_site_url);
  const eppn = useDashboardAppSelector((state) => state.personal_data?.eppn);
  const dispatch = useDashboardAppDispatch();

  // const eduidHomeUrl = useDashboardAppSelector((state) => state.config.eduid_site_url);
  const dispatch = useDashboardAppDispatch();
  // const faqUrl = currentLocale === "en" ? `/en/faq.html` : `/faq.html`;

  const messages = LOCALIZED_MESSAGES;

  let translateTo: string[][] = [];
  let locale = "";
  let language = "";

  /* Figure out the locale and name of the _other_ language
   * (when Swedish is selected, show option to change to English).
   * TODO: Obviously only works when there are a total of two different languages here.
   */
  if (AVAILABLE_LANGUAGES !== undefined) {
    /* Filter out all the available languages _except_ the currently used one */
    translateTo = Object.entries(AVAILABLE_LANGUAGES).filter(([_locale, _language]) => _locale !== currentLocale);
    /* Offer the user the choice to switch to the other language below */
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
        <a href="https://www.sunet.se/" aria-label="Sunet.se" title="Sunet.se">
          <div className="sunet-logo" />
        </a>
        <span>
          &copy;
          <FormattedMessage defaultMessage="2013-2023" description="Footer copyright" />
        </span>
      </div>

      <nav>
        <ul>
          <li>

            <Link className="help-link" to="/faq">

            <a className="help-link" href="#" onClick={goToHelp}>

              <FormattedMessage defaultMessage="Help" description="Footer help" />
            </Link>
            </a>
          </li>
          <li id="language-selector">
            <span className="lang-selected" data-lang={locale}>
              <a className="link" href="#" onClick={changeLanguage}>
                {language}
              </a>
            </span>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
