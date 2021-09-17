export const LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK = "COUNT_EMAIL_LINK";
export const LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE = "COUNT_PHONE_CODE";

let period = "";

export const clearCountdown = (key) => { 
  return window.localStorage.removeItem(key);
};   

export const getLocalStorage = (key) => {
  return window.localStorage ? window.localStorage.getItem(key) : '';
};

export const setLocalStorage = (key, val) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, val);
  }
  return val;
};

export const countFiveMin = (key) => {
  const elementResendLink = document.querySelector(`#resend-${key}`);
  const elementTextIn = document.getElementById("timer-in");
  const elementCountDownTime = document.getElementById(`count-down-time-${key}`);
  // Resend link button will be disabled
  elementResendLink !== null && elementResendLink.classList.remove('button-active');
  let countDownTime = getLocalStorage(key === "email" ? LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK : LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE);
  // Update the count down every 1 second
  let timer = setInterval(()=>{
    // Get today's date and time
    let now = new Date().getTime();
    // Find the period between now and the count down date
    period = countDownTime - now;
    // Time calculations for minutes and seconds
    let minutes = Math.floor((period % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((period % (1000 * 60)) / 1000);
    // Output the result in an element with id="count-down-time"
    if(elementCountDownTime!== null){
      elementCountDownTime.innerHTML = minutes.toString().padStart(2,0)+":" + seconds.toString().padStart(2,0);
    }
    // If the count down is over, resend-${key} will be active and timer will be display-none
      if (period < 0) {
        elementCountDownTime && elementCountDownTime.classList.add('display-none');
        elementTextIn && elementTextIn.classList.add('display-none');
        elementResendLink && elementResendLink.classList.add('button-active');
        clearInterval(timer);  
      }else {
        elementResendLink && elementResendLink.classList.remove('button-active');
        elementTextIn && elementTextIn.classList.remove('display-none');
        elementCountDownTime && elementCountDownTime.classList.remove('display-none');
      }
    }, 1000);
};