import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "eduid-hooks";
import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

const idUserEppn = "user-eppn";

export function AccountId(): JSX.Element {
  const eppn = useAppSelector((state) => state.personal_data.eppn);
  const [tooltipCopied, setTooltipCopied] = useState(false); // say "Copy to clipboard" or "Copied!" in tooltip
  const ref = useRef<HTMLInputElement>(null);

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
    <article id="uniqueId-container">
      <h2>
        <FormattedMessage defaultMessage="EPPN - username" description="Dashboard AccountId" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage={`Eppn is a unique identifier for your eduID that you may need to provide when accessing other services or requesting  
          support.`}
          description="Dashboard AccountId"
        />
      </p>
      <div className="profile-grid-cell figure">
        <span aria-label={idUserEppn}>
          <strong>
            <FormattedMessage defaultMessage="EPPN:" description="Dashboard AccountId" />
            &nbsp;
          </strong>
        </span>
        <div className="display-data">
          <output name={eppn} id={idUserEppn}>
            {eppn}

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
          </output>
        </div>
      </div>
    </article>
  );
}
