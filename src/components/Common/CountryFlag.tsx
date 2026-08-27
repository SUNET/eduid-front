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
export default function CountryFlag({
  countryCode,
  className,
  "aria-label": ariaLabel,
}: Readonly<CountryFlagProps>): React.JSX.Element {
  const emoji = countryCode.toUpperCase().replace(/./g, (c) => String.fromCodePoint(c.codePointAt(0)! + 127397));

  return (
    <span role="img" className={className} aria-label={ariaLabel}>
      {emoji}
    </span>
  );
}
