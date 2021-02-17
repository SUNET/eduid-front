
import React, { useState } from 'react';

const SpeechBubbleTip = (props) => {
  const {
    active: [active, setActive]
  } = {
    active: useState(false),
    ...(props.state || {})
  };

  let timeout;
  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 100);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={`speech-bubbletip-wrapper`}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        // props.position, where the speech bubble tip is rendering on identity or settings
        // props.textLength, for short text styling
        // props.tipText, text inside speech bubble
        <div className={`speech-bubbletip ${props.position || "identity"} ${props.textLength || ""}`}>
          {props.tipText}
        </div>
      )}
    </div>
  );
};


function NotificationTip(props) {
  return (
    <SpeechBubbleTip {...props} tipText={props.tipText} position={props.position}>
      <div className="notification-dot">
        <div className="notification-dot-inner" /> 
      </div>
    </SpeechBubbleTip>
    )
  }

export default NotificationTip;