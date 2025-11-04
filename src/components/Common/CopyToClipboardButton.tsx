import EduIDButton from "components/Common/EduIDButton";
import { ForwardedRef, forwardRef, useState } from "react";
import { FormattedMessage } from "react-intl";

export const CopyToClipboardButton = forwardRef<HTMLInputElement>((_props, ref: ForwardedRef<HTMLInputElement>) => {
  const [tooltipCopied, setTooltipCopied] = useState(false); // say "Copy to clipboard" or "Copied!" in tooltip

  function copyToClipboard() {
    if (ref && typeof ref === "object" && ref.current) {
      ref.current.select();
      if (!navigator.clipboard) {
        document.execCommand("copy");
      } else {
        navigator.clipboard.writeText(ref.current.value);
      }
      setTooltipCopied(true);

      setTimeout(() => {
        setTooltipCopied(false);
      }, 10000);
    }
  }

  return (
    <EduIDButton buttonstyle="link sm txt-toggle-btn" onClick={copyToClipboard}>
      {tooltipCopied ? (
        <FormattedMessage defaultMessage="COPIED" description="copied button label" />
      ) : (
        <FormattedMessage defaultMessage="COPY" description="copy button label" />
      )}
    </EduIDButton>
  );
});

CopyToClipboardButton.displayName = "CopyToClipboardButton";
