import { forwardRef, useState } from "react";
import { FormattedMessage } from "react-intl";

export const CopyToClipboardButton = forwardRef((props, ref: any) => {
  const [tooltipCopied, setTooltipCopied] = useState(false); // say "Copy to clipboard" or "Copied!" in tooltip

  function copyToClipboard() {
    if (ref && ref.current) {
      ref.current.select();
      document.execCommand("copy");
      setTooltipCopied(true);

      setTimeout(() => {
        setTooltipCopied(false);
      }, 10000);
    }
  }

  return (
    <button
      className="show-hide-button"
      onClick={copyToClipboard}
      aria-label={tooltipCopied ? "Copied!" : "Copy to clipboard"}
    >
      {tooltipCopied ? (
        <FormattedMessage defaultMessage="COPIED" description="eppn copy button label" />
      ) : (
        <FormattedMessage defaultMessage="COPY" description="eppn copy button label" />
      )}
    </button>
  );
});
