import React from "react";

interface SplashProps {
  showChildren: boolean;
  children?: React.ReactNode;
}

/**
 * Show a spinner as long as showChildren is false.
 *
 * The "eduid-splash-and-children" div has position: relative, which the surrounding element must have
 * in order for the spinner to be positioned properly.
 *
 * Always rendering children inside that div gives it the proper size, so that the spinner is positioned
 * in the middle of where the children will be shown once the spinner is stopped.
 *
 * The span#eduid-splash-spinner hides the children using a very large zIndex and a background in CSS,
 * and is rendered as long as showChildren is false. The spinner itself is a pure-CSS animation
 * (see Splash.css) — no JS spinner library involved.
 */
export function Splash(props: Readonly<SplashProps>): React.JSX.Element {
  const { showChildren, children } = props;

  return (
    <div id="eduid-splash-and-children">
      {!showChildren && (
        <span id="eduid-splash-spinner">
          <span className="spinner" role="progressbar" aria-label="Loading" />
        </span>
      )}
      {children}
    </div>
  );
}
