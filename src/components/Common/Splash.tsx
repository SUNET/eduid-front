import React, { useEffect, useRef } from "react";
import { Spinner } from "spin.js";
import "spin.js/spin.css"; // without this import, the spinner is frozen

export const spinnerOpts = {
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
};

interface SplashProps {
  showChildren: boolean;
  children?: React.ReactNode;
}

/**
 * Show a spinner as long as showChildren is false.
 */
export default function Splash(props: SplashProps): React.JSX.Element {
  const { showChildren, children } = props;
  const eduidSplash = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<Spinner | null>(null);

  useEffect(() => {
    // Initialize spinner once
    if (!spinnerRef.current) {
      spinnerRef.current = new Spinner(spinnerOpts);
    }

    const spinner = spinnerRef.current;

    if (!showChildren && eduidSplash.current !== null) {
      // TODO: wait for 200ms before starting the spinner, rather than having it flash by super-quick?
      spinner.spin(eduidSplash.current);
    } else {
      spinner.stop();
    }
  }, [showChildren]);

  /* The "eduid-splash-and-children" div has position: relative, which the surrounding element must have
   * in order for the spin.js spinner to be positioned properly.
   *
   * Always rendering children inside that div gives it the proper size, so that the spinner is positioned
   * in the middle of where the children will be shown once the spinner is stopped.
   *
   * The span#eduid-splash-spinner hides the children using a very large zIndex and a background in CSS,
   * and is rendered as long as showChildren is false.
   */
  return (
    <div id="eduid-splash-and-children">
      {!showChildren && <span ref={eduidSplash} id="eduid-splash-spinner" role="presentation"></span>}
      {children}
    </div>
  );
}
