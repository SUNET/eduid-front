// import { checkStatus,
//          postRequest,
//          saveData } from "sagas/common";

// import * as main_actions from "login/LoginMain/LoginMain_actions";
// import * as actions from "login/Resetting/Resetting_actions";


// export function requestConfigFromCode(config, data) {
//   return window
//     .fetch(PASSWORD_SERVICE_URL + "/reset/config/", {
//       ...postRequest,
//       body: JSON.stringify(data)
//     })
//     .then(checkStatus)
//     .then(response => response.json());
// }

// const getData = state => ({
//   code: document.location.href.split('/').reverse()[0],
//   csrf_token: state.config.csrf_token
// });

// export const getConfigFromCode = saveData(
//   getData,
//   "config-reset-form",
//   main_actions.appLoaded,
//   requestConfigFromCode,
//   actions.postCodeFail
// );
