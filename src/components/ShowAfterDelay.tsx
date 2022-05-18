import React, { Fragment, useEffect, useState } from "react";

interface ShowAfterDelayProps extends React.BaseHTMLAttributes<HTMLBaseElement> {
  delay: number;
}

/**
 * Show the children of this component after a delay.
 *
 * @param props.delay number of milliseconds before showing the children
 */
export default function ShowAfterDelay(props: ShowAfterDelayProps): JSX.Element | null {
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChildren(true);
    }, props.delay);
    return () => clearTimeout(timer);
  }, []);

  if (!showChildren) {
    return null;
  }

  return <Fragment>{props.children}</Fragment>;
}
