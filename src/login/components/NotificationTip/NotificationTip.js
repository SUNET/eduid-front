
import React, { useState } from 'react';

const SpeechBubbleTip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

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
      className="SpeechBubbleTip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <div className={`SpeechBubbleTip ${props.direction || "top"}`}>
          {props.content}
        </div>
      )}
    </div>
  );
};


function NotificationTip(props) {
  return (
    <SpeechBubbleTip content={props.content} direction="top">
        <div className="notification-dot">
            <div className="notification-dot-inner" /> 
        </div>
    </SpeechBubbleTip>
    )
  }

export default NotificationTip;