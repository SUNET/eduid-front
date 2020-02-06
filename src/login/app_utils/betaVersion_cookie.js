import Cookies from "js-cookie";

const checkIfBeta = () => {
  console.log("Checking if its beta...");
  let cookie = Cookies.get("bundle-version");
  if (cookie) {
    let current_public_path = new URL(__webpack_public_path__);
    __webpack_public_path__ =
      current_public_path.origin + "/" + cookie + current_public_path.pathname;
  }
};

export default checkIfBeta;
