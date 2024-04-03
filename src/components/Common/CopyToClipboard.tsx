import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useState } from "react";
import { FormattedMessage } from "react-intl";

export const CopyToClipboard = forwardRef((props, ref: any) => {
  const [tooltipCopied, setTooltipCopied] = useState(false); // say "Copy to clipboard" or "Copied!" in tooltip

  function copyToClipboard() {
    if (ref && ref.current) {
      ref.current.select();
      document.execCommand("copy");
      setTooltipCopied(true);
      (document.getElementById("icon-copy") as HTMLInputElement).style.display = "none";
      (document.getElementById("icon-check") as HTMLInputElement).style.display = "inline";
      setTimeout(() => {
        (document.getElementById("icon-copy") as HTMLInputElement).style.display = "inline";
        (document.getElementById("icon-check") as HTMLInputElement).style.display = "none";
        setTooltipCopied(false);
      }, 1000);
    }
  }

  return (
    <button id="clipboard" className="icon-only copybutton" onClick={copyToClipboard}>
      <FontAwesomeIcon id="icon-copy" icon={faCopy as IconProp} />
      <FontAwesomeIcon id="icon-check" icon={faCheck as IconProp} />
      <div className="tool-tip-text" id="tool-tip">
        {tooltipCopied ? (
          <FormattedMessage defaultMessage="Copied!" description="Copied tooltip" />
        ) : (
          <FormattedMessage defaultMessage="Copy to clipboard" description="Copy tooltip" />
        )}
      </div>
    </button>
  );
});
