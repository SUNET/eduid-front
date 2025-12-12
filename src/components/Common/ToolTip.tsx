import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";

export function ToolTip() {
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
        <div className="custom-tooltip-popover" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <p className="custom-tooltip-title">
            <FormattedMessage description="popover info heading" defaultMessage="Security zone" />
          </p>
          <p className="help-text custom-tooltip-help">
            <FormattedMessage
              description="popover info"
              defaultMessage="To continue this process, you may need to re-authenticate."
            />
          </p>
        </div>
      )}
    </span>
  );
}
