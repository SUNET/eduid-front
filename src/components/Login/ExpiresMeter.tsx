import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimeRemaining } from "components/Common/TimeRemaining";

interface ExpiresMeterProps {
  expires_max: number;
  time_remaining?: TimeRemaining;
  showMeter: boolean;
}

export function ExpiresMeter({
  expires_max,
  time_remaining,
  showMeter,
}: Readonly<ExpiresMeterProps>): React.JSX.Element | null {
  // convince TypeScript that TimeRemainingWrapper has added the time_remaining prop
  if (time_remaining === undefined) {
    return null;
  }
  return (
    <div className="expires-meter">
      <span className="expires-symbol">
        <FontAwesomeIcon icon={faClock} />
      </span>
      {showMeter ? (
        <meter
          low={expires_max * 0.2}
          max={expires_max}
          value={time_remaining.total_seconds}
          id="expires-meter"
          key="0"
        />
      ) : null}
      <span className="timer">
        {time_remaining.minutes}:{time_remaining.seconds}
      </span>
    </div>
  );
}
