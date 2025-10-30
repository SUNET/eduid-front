import React, { useEffect, useState } from "react";

function removeLocalStorage(key: string) {
  if (window.localStorage) {
    return window.localStorage.removeItem(key);
  }
}

function getLocalStorage(key: string) {
  return window.localStorage ? window.localStorage.getItem(key) : "";
}

function setLocalStorage(key: string, val: string) {
  if (window.localStorage) {
    window.localStorage.setItem(key, val);
  }
  return val;
}

function loadEndDate(name: string, unique_id?: string): Date | undefined {
  const data = JSON.parse(getLocalStorage(name) || "{}") as StoredData;
  if (!data.end || data.id != unique_id) {
    // No data, or non-matching unique id
    return undefined;
  }

  try {
    return new Date(data.end);
  } catch (_error) {
    return undefined;
  }
}

interface TimeRemainingWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  unique_id?: string;
  value: number;
  interval?: number;
  onReachZero?: () => void;
  debug?: boolean;
}

// additional props provided to all children
export interface TimeRemaining {
  // Minutes and seconds are zero-padded for displaying to the user.
  // If you want to implement any kind of logic, use total_seconds.
  minutes: string;
  seconds: string;
  total_seconds: number;
}

interface StoredData {
  id?: string;
  end: string;
}

export function TimeRemainingWrapper(props: TimeRemainingWrapperProps): React.JSX.Element {
  const [secondsLeft, setSecondsLeft] = useState(props.value > 0 ? props.value : 0);

  // Calculate timeRemaining directly from secondsLeft
  const timeRemaining = React.useMemo<TimeRemaining>(() => {
    return {
      seconds: (secondsLeft % 60).toString().padStart(2, "0"),
      minutes: Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, "0"),
      total_seconds: secondsLeft,
    };
  }, [secondsLeft]);

  useEffect(() => {
    // Record the end-time of this timer in local storage.
    // The backend generally provides a number of seconds until something expires. We calculate
    // the date-time for that to
    //   a) not have to have a synchronised clock with the backend and
    //   b) to handle time-warps, such as when someone suspends their computer and later resumes it
    //   c) to handle page reloads
    const now = new Date().getTime();
    const endTime = now + props.value * 1000;
    const data: StoredData = { id: props.unique_id, end: new Date(endTime).toISOString() };
    setLocalStorage(props.name, JSON.stringify(data));

    // Update the countdown based on the stored end time
    const updateCountdown = () => {
      const currentTime = new Date();
      // Load and parse the end time from local storage
      const storedEndTime = loadEndDate(props.name, props.unique_id);
      if (!storedEndTime) {
        // detect if the unique id changes, and cancel this timer if it does
        setSecondsLeft(0);
        return false;
      }
      // calculate remaining number of secondsLeft
      let remaining = Math.ceil((storedEndTime.getTime() - currentTime.getTime()) / 1000);
      if (remaining < 0) {
        // handle time-warp gracefully, never showing a value less than zero
        remaining = 0;
      }

      setSecondsLeft(remaining);

      if (remaining <= 0) {
        removeLocalStorage(props.name);
        if (props.onReachZero) {
          props.onReachZero();
        }
        return false; // stop the timer
      }

      return true; // continue the timer
    };

    // Set up recurring timer
    const interval = props.interval || 1000;
    const timer = setInterval(() => {
      const shouldContinue = updateCountdown();
      if (!shouldContinue) {
        clearInterval(timer);
      }
    }, interval);

    return () => {
      // remove timer on component unmount
      clearInterval(timer);
    };
  }, [props.name, props.unique_id, props.interval, props.onReachZero, props.value]);

  // Add the time_remaining prop to all the children of this component.
  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement<{ time_remaining: TimeRemaining }>(child)) {
      return React.cloneElement(child, { time_remaining: timeRemaining });
    }
    return child;
  });

  return (
    <React.Fragment>
      {props.debug && <RenderDebugInfo {...props} secondsLeft={secondsLeft} />}
      {childrenWithProps}
    </React.Fragment>
  );
}

function RenderDebugInfo(props: TimeRemainingWrapperProps & { secondsLeft: number }): React.JSX.Element {
  const end2 = loadEndDate(props.name, props.unique_id) || new Date();
  const now2 = new Date();
  const diff2 = Math.floor((end2.getTime() - now2.getTime()) / 1000);

  return (
    <React.Fragment>
      <div className="time-remaining-wrapper-debug">
        Debug info:
        <div>{getLocalStorage(props.name)}</div>
        <div>{`${props.name} ends at ${end2.toISOString()}`}</div>
        <div>{`now ${now2.toISOString()}, diff ${diff2}`}</div>
        <div>{`secondsLeft ${props.secondsLeft}`}</div>
      </div>
    </React.Fragment>
  );
}
