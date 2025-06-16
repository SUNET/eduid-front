import React from "react";
import { FormattedMessage } from "react-intl";
import { useTheme } from "./ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="toggle flex-between" htmlFor="color-mode">
      <span className="text-small">
        <FormattedMessage defaultMessage="Color mode" description="color mode toggle" />
      </span>
      <input
        onChange={toggleTheme}
        className="toggle-checkbox"
        type="checkbox"
        checked={theme === "dark"}
        id="color-mode"
      />
      <div className="toggle-switch"></div>
    </label>
  );
};

export default ThemeToggle;
