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
  } catch (error) {
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
export function TimeRemainingWrapper(props: TimeRemainingWrapperProps): JSX.Element {
  const [secondsLeft, setSecondsLeft] = useState(props.value > 0 ? props.value : 0);

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({ minutes: "00", seconds: "00", total_seconds: 0 });

  useEffect(() => {
    // Record the end-time of this timer in local storage.
    // The backend generally provides a number of seconds until something expires. We calculate
    // the date-time for that to
    //   a) not have to have a synchronised clock with the backend and
    //   b) to handle time-warps, such as when someone suspends their computer and later resumes it
    //   c) to handle page reloads
    let end = new Date().getTime();
    // get rid of milliseconds to make debugging easier
    end = end - (end % 1000);
    end = end + secondsLeft * 1000;
    const data: StoredData = { id: props.unique_id, end: new Date(end).toISOString() };
    setLocalStorage(props.name, JSON.stringify(data));
  }, []);

  useEffect(() => {
    // reflect any change in secondsLeft into timeRemaining, with minutes and seconds calculated
    const tr: TimeRemaining = {
      seconds: (secondsLeft % 60).toString().padStart(2, "0"),
      minutes: Math.floor(secondsLeft / 60)
        .toString()
        .padStart(2, "0"),
      total_seconds: secondsLeft,
    };
    setTimeRemaining(tr);
  }, [secondsLeft]);

  useEffect(() => {
    // Set up a timer at the chosen interval
    const interval = props.interval || 1000;
    const timer = setInterval(() => {
      const now = new Date();
      // Load and parse the end time from local storage
      const end = loadEndDate(props.name, props.unique_id);
      if (!end) {
        // detect if the unique id changes, and cancel this timer if it does
        setSecondsLeft(0);
        clearInterval(timer);
        return undefined;
      }
      // calculate remaining number of secondsLeft
      let remaining = Math.floor((end.getTime() - now.getTime()) / 1000);
      if (remaining < 0) {
        // handle time-warp gracefully, never showing a value less than zero
        remaining = 0;
      }

      setSecondsLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        removeLocalStorage(props.name);
        if (props.onReachZero) {
          // call the callback provided
          props.onReachZero();
        }
      }
    }, interval);

    return () => {
      // remove timer on component unmount
      clearInterval(timer);
    };
  }, [props]);

  // Add the time_remaining prop to all the children of this component.
  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
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

function RenderDebugInfo(props: TimeRemainingWrapperProps & { secondsLeft: number }): JSX.Element {
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
