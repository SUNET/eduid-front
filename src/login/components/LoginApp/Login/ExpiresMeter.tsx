import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { TimeRemaining } from "components/TimeRemaining";

interface ExpiresMeterProps {
  expires_max: number;
  time_remaining?: TimeRemaining;
  showMeter?: boolean;
}

export function ExpiresMeter(props: ExpiresMeterProps): JSX.Element | null {
  // convince TypeScript that TimeRemainingWrapper has added the time_remaining prop
  if (props.time_remaining === undefined) {
    return null;
  }
  return (
    <div className="expires-meter">
      <span className="expires-symbol">
        <FontAwesomeIcon icon={faClock} />
      </span>
      {props.showMeter ? (
        <meter
          low={props.expires_max * 0.2}
          max={props.expires_max}
          value={props.time_remaining.total_seconds}
          id="expires-meter"
          key="0"
        />
      ) : null}
      <span className="timer">
        {props.time_remaining.minutes}:{props.time_remaining.seconds}
      </span>
    </div>
  );
}
