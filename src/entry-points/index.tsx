import { ReduxIntlProvider } from "components/Common/ReduxIntl";
import { IndexMain } from "components/IndexMain";
import { ResetPasswordGlobalStateProvider } from "components/ResetPassword/ResetPasswordGlobalState";
import { SignupGlobalStateProvider } from "components/Signup/SignupGlobalState";
import { eduidStore } from "eduid-init-app";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { showNotification } from "slices/Notifications";
import { setupLanguage } from "translation";
import "../../src/styles/index.scss";
import "./public-path";

function showErrorMsg() {
  const params = new URLSearchParams(document.location.search);
  if (params) {
    const msg = params.get("msg");
    if (msg !== null) {
      if (msg.startsWith(":ERROR:")) {
        eduidStore.dispatch(showNotification({ message: msg.substr(7), level: "error" }));
      } else {
        eduidStore.dispatch(showNotification({ message: msg, level: "info" }));
      }
    }
  }
}

showErrorMsg();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(eduidStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
if (initDomTarget === null) {
  throw new Error("No root element found");
}
const root = ReactDOMClient.createRoot(initDomTarget);
root.render(
  <SignupGlobalStateProvider>
    <ResetPasswordGlobalStateProvider>
      <ReduxIntlProvider store={eduidStore}>
        <BrowserRouter>
          <IndexMain />
        </BrowserRouter>
      </ReduxIntlProvider>
    </ResetPasswordGlobalStateProvider>
  </SignupGlobalStateProvider>
);
