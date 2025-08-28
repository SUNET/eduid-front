import React from "react";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { useTheme } from "./ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const intl = useIntl();
  const label = getLabel(intl);

  return (
    <label className="toggle flex-between" htmlFor="color-mode">
      <span className="text-small">
        <FormattedMessage defaultMessage="Color theme" description="color mode toggle" />
      </span>
      <input
        onChange={toggleTheme}
        className="toggle-checkbox"
        type="checkbox"
        checked={theme === "dark"}
        id="color-mode"
        aria-label={label}
      />
      <div className="toggle-switch"></div>
    </label>
  );

  function getLabel(intl: IntlShape): string {
    if (theme == "dark") {
      return intl.formatMessage({
        defaultMessage: "Change to light mode",
        description: "Color toggle aria label to light",
        id: "color-mode-light",
      });
    } else {
      return intl.formatMessage({
        defaultMessage: "Change to dark mode",
        description: "Color toggle aria label to dark",
        id: "color-mode-dark",
      });
    }
  }
};

export default ThemeToggle;
