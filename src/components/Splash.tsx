import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "spin.js";
import "/node_modules/spin.js/spin.css"; // without this import, the spinner is frozen

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
export default function Splash(props: SplashProps): JSX.Element {
  const { showChildren, children } = props;
  const eduidSplash = useRef<HTMLDivElement>(null);
  const [spinner, setSpinner] = useState<Spinner | undefined>(undefined);

  useEffect(() => {
    if (!spinner) {
      setSpinner(new Spinner(spinnerOpts));
    }
    if (spinner) {
      // assure typescript that spinner was initialised above
      if (!showChildren && eduidSplash.current !== null) {
        // TODO: wait for 200ms before starting the spinner, rather than having it flash by super-quick?
        spinner.spin(eduidSplash.current);
      }
      if (showChildren && spinner) {
        spinner.stop();
      }
    }
  }, [showChildren, eduidSplash, spinner]);

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
    <div id="eduid-splash-and-children" role="progressbar">
      {!showChildren && <span ref={eduidSplash} id="eduid-splash-spinner" role="presentation"></span>}
      {children}
    </div>
  );
}
