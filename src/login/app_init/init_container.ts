import { appLoaded } from "actions/DashboardConfig";
import { fetchJsConfig } from "apis/eduidJsConfig";
import { LOGIN_CONFIG_URL } from "globals";
import resetPasswordSlice from "../redux/slices/resetPasswordSlice";
import initStore from "./initStore";

export default async function initContainer() {
  const dispatch = initStore.dispatch;

  const config = await dispatch(fetchJsConfig({ url: LOGIN_CONFIG_URL }));
  if (fetchJsConfig.fulfilled.match(config)) {
    dispatch(appLoaded());
  }

  const url = document.location.href;

  if (url.includes(`/email-code/`) || url.includes(`/extra-security/`)) {
    // pass on code get config for app and
    const urlCode = url.split("/").reverse()[0];
    initStore.dispatch(resetPasswordSlice.actions.saveLinkCode(urlCode));
  }
}
