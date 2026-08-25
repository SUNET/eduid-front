import React from "react";

interface CountryFlagProps {
  /** ISO 3166-1 alpha-2 country code, e.g. "SE" */
  countryCode: string;
  className?: string;
  "aria-label"?: string;
}

/**
 * Renders a country's flag as a Unicode emoji, by mapping each ASCII letter of the
 * (alpha-2) country code to its Regional Indicator Symbol. Replaces the react-country-flag
 * dependency, whose default (emoji) mode did the exact same transform.
 */
export default function CountryFlag(props: Readonly<CountryFlagProps>): React.JSX.Element {
  const emoji = props.countryCode
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(c.charCodeAt(0) + 127397));

  return (
    <span
      role="img"
      className={props.className}
      aria-label={props["aria-label"]}
      style={{ display: "inline-block", fontSize: "1em", lineHeight: "1em", verticalAlign: "middle" }}
    >
      {emoji}
    </span>
  );
}
