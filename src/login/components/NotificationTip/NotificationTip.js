
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
        className={props.nins !== undefined  && props.nins[0] ? "SpeechBubbleTip-Wrapper" :  "SpeechBubbleTip-Wrapper hide"}
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


function NotificationTip() {
  const nins = useSelector(state => state.nins.nins)
    return (
        <SpeechBubbleTip nins={nins} direction="top">
            <div className="notification-dot">
                <div className="notification-dot-inner" /> 
            </div>
        </SpeechBubbleTip>
        )}

export default NotificationTip;