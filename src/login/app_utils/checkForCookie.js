import Cookies from "js-cookie";

const checkForCookie = (cookieName, cookiePattern) => {
  // console.log("this is the cookieName", cookieName);
  // if cookieName is present ()
  const cookie = Cookies.get(cookieName);
  if (cookie) {
    //test against the pattern
    const regex = new RegExp(cookiePattern);
    if (regex.test(cookie)) {
      return true;
    }
  }
  return false;
};

export default checkForCookie;
