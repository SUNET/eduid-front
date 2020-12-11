import Cookies from "js-cookie";
// this function checks for cookie and sets the public path for the app before the app loads 
console.log("Checking if its beta...");
let cookie = Cookies.get("bundle-version");
if (cookie) {
  let current_public_path = new URL(__webpack_public_path__);
  __webpack_public_path__ =
    current_public_path.origin + "/" + cookie + current_public_path.pathname;
}
