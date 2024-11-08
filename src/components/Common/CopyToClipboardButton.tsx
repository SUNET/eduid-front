import EduIDButton from "components/Common/EduIDButton";
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
    <EduIDButton className="txt-toggle-btn" buttonstyle="link" size="sm" onClick={copyToClipboard}>
      {tooltipCopied ? (
        <FormattedMessage defaultMessage="COPIED" description="copied button label" />
      ) : (
        <FormattedMessage defaultMessage="COPY" description="copy button label" />
      )}
    </EduIDButton>
  );
});
