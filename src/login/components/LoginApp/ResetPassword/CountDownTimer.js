import React from "react";

let count = 0, counter = null;
let minute ="", second = "";

const timer = () => {
  count = setLocalStorage("count", count - 1);
  const elementMinute = document.getElementById("minute");
  const elementSecond = document.getElementById("second");

  if (count <= -1) {
    clearInterval(counter);
  // clearCountdown();
      elementMinute.classList.add('display-none');
      elementSecond.classList.add('display-none');
  }else if(count > 0){
    minute = Math.floor(count / 60),
    second = count % 60
  if(elementMinute){
    elementMinute.textContent = minute.toString().padStart(2,0)+":";
  }if(elementSecond)
    elementSecond.textContent = second.toString().padStart(2,0)
  }

}

const clearCountdown = () => { 
  return window.localStorage.removeItem("count")
}    

const getLocalStorage = (key) => {
  return window.localStorage ? window.localStorage.getItem(key) : '';
}

const setLocalStorage = (key, val) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, val);
  }
  return val;
} 

export const countDownStart = () =>{
  if(getLocalStorage("count") <= 0){
    clearCountdown();
    count = getLocalStorage("count") || 10;
    counter = setInterval(timer, 1000);
  }else {
    count = getLocalStorage("count") || 10;
    counter = setInterval(timer, 1000);
  } 
}

export const RenderingTimer = () => {
  return (
    <div className="timer">
      <p id="minute" />
      <p id="second" />
    </div>
  )
}
