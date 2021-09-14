export const LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK = "COUNT_EMAIL_LINK";
export const LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE = "COUNT_PHONE_CODE";

let distance = "";

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

export const countFiveMin = () => {
  const elementResendLink = document.querySelector("#minute");
  // Resend link button will be disabled
  elementResendLink !== null && elementResendLink.classList.remove('button-active');
  let countDownDate = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK);
  // Update the count down every 1 second
  let timer = setInterval(()=>{
    // Get today's date and time
    let now = new Date().getTime();
    // Find the distance between now and the count down date
    distance = countDownDate - now;
    // Time calculations for minutes and seconds
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const elementCountDownTime = document.getElementById("count-down-time");
    // Output the result in an element with id="count-down-time"
    elementCountDownTime.innerHTML = minutes.toString().padStart(2,0)+":" + seconds.toString().padStart(2,0);
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
};

export const countFiveMinPhone = () => {
  const elementResendPhoneCode = document.querySelector("#resend-phone-code");
  const elementCountDownTimePhone = document.querySelector("#count-down-time-phone");
  elementResendPhoneCode !== null && document.querySelector("#resend-phone-code").classList.remove('button-active');
  let countDownDate = getLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE);
  let timer = setInterval(()=> {
    let now = new Date().getTime();
    distance = countDownDate - now;
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if(elementCountDownTimePhone!== null){
      elementCountDownTimePhone.innerHTML = minutes.toString().padStart(2,0)+":" + seconds.toString().padStart(2,0)
    }
      if (distance < 0) {
        elementCountDownTimePhone && elementCountDownTimePhone.classList.add('display-none');
        elementResendPhoneCode && elementResendPhoneCode.classList.add('button-active');
        clearInterval(timer);  
      }else {
        elementResendPhoneCode && elementResendPhoneCode.classList.remove('button-active');
        elementCountDownTimePhone && elementCountDownTimePhone.classList.remove('display-none');
      }
  }, 1000);
};