import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

export function ToolTip({ action }: { readonly action?: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);
  const handleClick = () => setShow((prev) => !prev);

  return (
    <span className="custom-tooltip-wrapper">
      <button
        ref={btnRef}
        className="trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-label="Show security info"
        type="button"
        tabIndex={0}
      >
        <FontAwesomeIcon icon={faLock as IconProp} />
      </button>
      {show && (
        <div
          role="tooltip"
          tabIndex={-1}
          className="custom-tooltip-popover"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="custom-tooltip-title">
            <FormattedMessage description="popover info heading" defaultMessage="For security" />
          </p>
          <p className="help-text custom-tooltip-help">
            <FormattedMessage
              description="popover info"
              defaultMessage="You may be asked to log in again if some time has passed since your last login."
              // values={{ action }}
            />
          </p>
        </div>
      )}
    </span>
  );
}
