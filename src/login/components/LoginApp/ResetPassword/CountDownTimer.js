import React from "react";

let count = 0, counter = null, minute ="", second = "";

const timer = () => {
  count = setLocalStorage("count", count - 1);
  const elementMinute = document.querySelector("#minute");
  const elementSecond = document.querySelector("#second");
  const elementResendLink = document.querySelector("#resend-link");

  if (count <= -1) {
     clearInterval(counter),
     elementMinute !== null && elementMinute.classList.add('display-none'),
     elementSecond !== null && elementSecond.classList.add('display-none'),
     elementResendLink !== null && elementResendLink.classList.add('button-active')

  }else if(count > 0){
    minute = Math.floor(count / 60),
    second = count % 60,
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
  return window.localStorage.removeItem("count")
}    

export const getLocalStorage = (key) => {
  return window.localStorage ? window.localStorage.getItem(key) : '';
}

const setLocalStorage = (key, val) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, val);
  }
  return val;
} 

export const countDownStart = () =>{
  if(getLocalStorage("count") <= -1){
    clearCountdown();
  }
  clearInterval(counter);
  count = getLocalStorage("count") || 300;
  counter = setInterval(timer, 1000);
}

export const RenderingTimer = (props) => {  
  return (
    <>
      <a id={`resend-link`} className={count <=- 1 ? "button-active" : ""} onClick={props.sendLink}> {props.translate("resetpw.resend-link-button")} </a>
      <span id="minute" className={count <=- 1 ? "display-none" : ""}/>
      <span id="second" className={count <=- 1 ? "display-none" : ""} />
    </>
  )
}