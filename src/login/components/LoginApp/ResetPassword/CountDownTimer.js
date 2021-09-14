import React from "react";

export const LOCAL_STORAGE_PERSISTED_COUNT = "count";
export const LOCAL_STORAGE_PERSISTED_REAL_TIME = "REALTIME";

let count = 0, counter = null, minute = "", second = "", distance ="";

const timer = () => {
  count = setLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT, count - 1);
  const elementMinute = document.querySelector("#minute");
  const elementSecond = document.querySelector("#second");
  const elementResendLink = document.querySelector("#resend-link");

  if (count <= -1) {
     clearInterval(counter),
     //if count is -1  or below, clearInterval
     elementMinute !== null && elementMinute.classList.add('display-none'),
     elementSecond !== null && elementSecond.classList.add('display-none'),
     elementResendLink !== null && elementResendLink.classList.add('button-active')
     // timer(minute, second) will not be display and the button will be activated
  }else if(count > 0){
    minute = Math.floor(count / 60),
    second = count % 60
    elementMinute !== null && elementMinute.classList.remove('display-none'),
    elementSecond !== null && elementSecond.classList.remove('display-none'),
    elementResendLink !== null && elementResendLink.classList.remove('button-active')
    if(elementMinute){
      elementMinute.textContent = minute.toString().padStart(2,0)+":";
    }if(elementSecond)
      elementSecond.textContent = second.toString().padStart(2,0)
    }
}

export const clearCountdown = () => { 
  return window.localStorage.removeItem(LOCAL_STORAGE_PERSISTED_COUNT);
}    

export const getLocalStorage = (key) => {
  return window.localStorage ? window.localStorage.getItem(key) : '';
}

export const setLocalStorage = (key, val) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, val);
  }
  return val;
} 

export const countDownStart = () =>{
  if(getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT) <= -1){
    clearCountdown();
  }
  clearInterval(counter);
  count = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT) || 300;
  // 300 = 5 min
  counter = setInterval(timer, 1000);
  // every countdown step is 1 second 
}

export const RenderingResendCodeTimer = (props) => {  
  const countLocalStorage = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT);
  return (
    <>
      <a id={"resend-link"} className={countLocalStorage === null || countLocalStorage  <=- 1 ? "button-active" : ""} onClick={props.resendPhoneCode}> {props.translate("cm.resend_code")} </a>
      <span id="minute" className={countLocalStorage  <=- 1 ? "display-none" : ""}/>
      <span id="second" className={countLocalStorage  <=- 1 ? "display-none" : ""} />
    </>
  )
}


export const countFiveMin = () => {
  // Resend link button will be disabled
  document.querySelector("#resend-link").classList.remove('button-active');
  let countDownDate = getLocalStorage(LOCAL_STORAGE_PERSISTED_REAL_TIME);
  // Update the count down every 1 second
  let timer = setInterval(function() {
  // Get today's date and time
  let now = new Date().getTime();
  // Find the distance between now and the count down date
  distance = countDownDate - now;
  // Time calculations for minutes and seconds
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="count-down-time"
  document.getElementById("count-down-time").innerHTML = minutes.toString().padStart(2,0)+":" + seconds.toString().padStart(2,0);

  // If the count down is over, resedn-link will be active and timer will be display-none
    if (distance < 0) {
      document.querySelector("#count-down-time").classList.add('display-none');
      document.querySelector("#resend-link").classList.add('button-active');
      clearInterval(timer);  
    }else {
      document.querySelector("#resend-link").classList.remove('button-active');
      document.querySelector("#count-down-time").classList.remove('display-none');
    }
  }, 1000);
}
