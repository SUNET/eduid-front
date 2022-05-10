import React, { useState } from "react";

interface SpeechBubbleTipProps {
  tipText: string | JSX.Element; // text inside speech bubble
  position?: string; // where the speech bubble tip is rendering on identity or settings. Default is 'identity'.
  textLength?: string; // for short text styling
  setActive?(value: boolean): void;
  delay?: number;
  children?: React.ReactNode;
}

function SpeechBubbleTip(props: SpeechBubbleTipProps): JSX.Element {
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

function NotificationTip(props: SpeechBubbleTipProps) {
  return (
    <SpeechBubbleTip {...props}>
      <div className="notification-dot">
        <div className="notification-dot-inner" />
      </div>
    </SpeechBubbleTip>
  );
}

export default NotificationTip;
