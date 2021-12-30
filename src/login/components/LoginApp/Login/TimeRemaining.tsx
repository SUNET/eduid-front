import React, { useEffect, useState } from "react";

function removeLocalStorage(key: string) {
  return window.localStorage.removeItem(key);
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

interface TimeRemainingWrapperProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  value: number;
  interval?: number;
  onReachZero?: () => void;
}

// additional props provided to all children
export interface TimeRemaining {
  // Minutes and seconds are zero-padded for displaying to the user.
  // If you want to implement any kind of logic, use total_seconds.
  minutes: string;
  seconds: string;
  total_seconds: number;
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
    const end = new Date().getTime() + secondsLeft * 1000;
    setLocalStorage(`${props.name}.end`, end.toString());
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

  // Set up a timer at the chosen interval
  const interval = props.interval || 1000;
  const timer = setInterval(() => {
    const now = new Date().getTime();
    // Load and parse the end time from local storage
    const endStr = getLocalStorage(`${props.name}.end`);
    if (!endStr) {
      clearInterval(timer);
      return undefined;
    }
    const end = parseInt(endStr);
    // calculate remaining number of secondsLeft
    let remaining = Math.floor((end - now) / 1000);
    if (remaining < 0) {
      // handle time-warp gracefully, never showing a value less than zero
      remaining = 0;
    }

    setSecondsLeft(remaining);

    if (remaining <= 0) {
      clearInterval(timer);
      removeLocalStorage(`${props.name}.end`);
      if (props.onReachZero) {
        // call the callback provided
        props.onReachZero();
      }
    }
  }, interval);

  // Add the time_remaining prop to all the children of this component.
  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { time_remaining: timeRemaining });
    }
    return child;
  });

  return <React.Fragment>{childrenWithProps}</React.Fragment>;
}
