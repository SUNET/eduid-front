import React, { useState } from "react";

interface NotificationTipProps {
  tipText: string | JSX.Element; // text inside speech bubble
  position?: string; // where the speech bubble tip is rendering on identity or settings. Default is 'identity'.
  textLength?: string; // for short text styling
  setActive?(value: boolean): void; // will be called with value true/false when speech bubble is shown/disappears
  delay?: number; // on-mouse-over timeout before speech bubble is shown, default is 100 ms
  children?: React.ReactNode;
}

/**
 * NotificationTip is a small orange dot indicator to draw the users' attention toward something.
 * If/when the user hovers the mouse over the dot, an additional explanatory text message is shown.
 */
function NotificationTip(props: NotificationTipProps) {
  return (
    <SpeechBubbleTip {...props}>
      <div className="notification-dot"></div>
    </SpeechBubbleTip>
  );
}

function SpeechBubbleTip(props: NotificationTipProps): JSX.Element {
  const [active, setActive] = useState(false); // is the speech bubble currently active (shown)?

  let timeout: NodeJS.Timeout | undefined;
  function showTip() {
    timeout = setTimeout(() => {
      setActive(true);
      // pass state up, if parent component wants to know
      if (props.setActive) props.setActive(true);
    }, props.delay || 100);
  }

  function hideTip() {
    if (timeout) clearInterval(timeout);
    setActive(false);
    // pass state up, if parent component wants to know
    if (props.setActive) props.setActive(false);
  }

  return (
    <div className={`speech-bubbletip-wrapper`} onMouseEnter={showTip} onMouseLeave={hideTip}>
      {props.children}
      {active && (
        <div className={`speech-bubbletip ${props.position || "identity"} ${props.textLength || ""}`}>
          {props.tipText}
        </div>
      )}
    </div>
  );
}

export default NotificationTip;
