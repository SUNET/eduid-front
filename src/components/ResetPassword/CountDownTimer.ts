export const LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK = "COUNT_EMAIL_LINK";
export const LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE = "COUNT_PHONE_CODE";

export const clearCountdown = (key: string) => {
  return window.localStorage.removeItem(key);
};

export const getLocalStorage = (key: string) => {
  return window.localStorage ? window.localStorage.getItem(key) : "";
};

export const setLocalStorage = (key: string, val: string) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, val);
  }
  return val;
};

export const countFiveMin = (key: string) => {
  const elementResendLink = document.querySelector(`#resend-${key}`);
  const elementTextIn = document.getElementById("timer-in");
  const elementCountDownTime = document.getElementById(`count-down-time-${key}`);
  // Resend link button will be disabled
  if (elementResendLink !== null) elementResendLink.classList.remove("button-active");
  const countDownTime =
    getLocalStorage(
      key === "email" ? LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK : LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE
    ) || "{}";
  // Update the count down every 1 second
  const timer = setInterval(() => {
    // Get today's date and time
    const now: number = new Date().getTime();
    // Find the period between now and the count down date
    const period = JSON.parse(countDownTime) - now;
    // Time calculations for minutes and seconds
    const minutes: number = Math.floor((period % (1000 * 60 * 60)) / (1000 * 60));
    const seconds: number = Math.floor((period % (1000 * 60)) / 1000);
    // Output the result in an element with id="count-down-time"
    if (elementCountDownTime !== null) {
      elementCountDownTime.innerHTML = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
    }
    // If the count down is over, resend-${key} will be active and timer will be display-none
    if (period < 0) {
      if (elementCountDownTime) elementCountDownTime.classList.add("display-none");
      if (elementTextIn) elementTextIn.classList.add("display-none");
      if (elementResendLink) elementResendLink.classList.add("button-active");
      clearInterval(timer);
    } else {
      if (elementResendLink) elementResendLink.classList.remove("button-active");
      if (elementTextIn) elementTextIn.classList.remove("display-none");
      if (elementCountDownTime) elementCountDownTime.classList.remove("display-none");
    }
  }, 1000);
};
