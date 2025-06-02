import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { AVAILABLE_LANGUAGES, LOCALIZED_MESSAGES } from "globals";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router";
import { updateIntl } from "slices/Internationalisation";

const Footer = (): JSX.Element => {
  const currentLocale = useAppSelector((state) => state.intl.locale);
  const dispatch = useAppDispatch();

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

  /* Dark/light mode toggle in footer, looks for previous cookie setting, system setting and defaults to light. */

  const localStorageTheme = localStorage.getItem("theme");
  const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

  function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
    if (localStorageTheme !== null) {
      return localStorageTheme;
    }

    if (systemSettingDark.matches) {
      return "dark";
    }

    return "light";
  }

  let currentThemeSetting = calculateSettingAsThemeString({ localStorageTheme, systemSettingDark });

  const [switchChecked, setSwitchChecked] = useState(false);

  const handleSwitchChange = (): void => {
    setSwitchChecked(!switchChecked);
    //document.getElementsByTagName("html")[0].toggleAttribute("data-theme");

    const newTheme = currentThemeSetting === "dark" ? "light" : "dark";

    const newCta = newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
    // use an aria-label if you are omitting text on the button
    (document.getElementById("color-mode") as HTMLInputElement).setAttribute("aria-label", newCta);
    // update theme attribute on HTML to switch theme in CSS
    document.getElementsByTagName("html")[0].setAttribute("data-theme", newTheme);

    // update in local storage
    localStorage.setItem("theme", newTheme);

    // update the currentThemeSetting in memory
    currentThemeSetting = newTheme;
  };

  return (
    <footer key="0" id="footer">
      <div className="logo-wrapper">
        <a href="https://www.sunet.se/" aria-label="Sunet.se" title="Sunet.se">
          <div className="sunet-logo" />
        </a>
        <span>&copy;2013-2025</span>
      </div>

      <label className="toggle flex-between" htmlFor="color-mode">
        <span className="text-small">
          <FormattedMessage defaultMessage="Color mode" description="color mode toggle" />
        </span>
        <input
          onChange={handleSwitchChange}
          className="toggle-checkbox"
          type="checkbox"
          checked={switchChecked}
          id="color-mode"
        />
        <div className="toggle-switch"></div>
      </label>

      <nav>
        <ul>
          <li>
            <Link className="help-link" to="/help" target="_blank">
              <FormattedMessage defaultMessage="Help" description="Footer help" />
            </Link>
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
