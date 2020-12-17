import {
  checkStatus,
  postRequest,
  saveData,
} from "sagas/common";
import { postLookupMobileFail } from "actions/LookupMobileProofing";
import * as ninActions from "actions/Nins";

// export function* requestLookupMobileProof() {
//   console.log("this is lookupMobileData response");
//   // try {
//   //   const state = yield select((state) => state);
//   //   console.log("this is state", state);
//   //   const unconfirmed = document.getElementById("nin-number");
//   //   console.log("this is unconfirmed", unconfirmed.textContent());
//   //   // nin = input ? input.value : unconfirmed ? state.nins.nin : "testing",
//   //   (nin = unconfirmed ? state.nins.nin : "testing"),
//   //     (data = {
//   //       nin: nin,
//   //       csrf_token: state.config.csrf_token,
//   //     });

//   //   const lookupMobileData = yield call(
//   //     fetchLookupMobileProof,
//   //     state.config,
//   //     data
//   //   );
//   //   console.log(
//   //     "this is the lookupMobileData response returning data",
//   //     lookupMobileData
//   //   );
//   //   yield put(putCsrfToken(lookupMobileData));
//   //   yield put(lookupMobileData);
//   // } catch (error) {
//   //   yield* failRequest(error, postLookupMobileFail);
//   // }
// }

// take user data into request 
export function fetchLookupMobileProof(config, data) {
  console.log("this is config in fetchLookupMobileProof", config);
  console.log("this is data in fetchLookupMobileProof", data);
  const url = config.lookup_mobile_proofing_url;
  return window
    .fetch(url, {
      ...postRequest,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json());
}

// get user data for request  
const getData = (state) => {
  console.log("this is state in get data", state);
  const unconfirmed = document.getElementById("nin-number");
  const nin = unconfirmed ? state.nins.nin : "testing";
  return {
    nin: nin,
    csrf_token: state.config.csrf_token,
  };
};

// function in rootSaga.js
export const saveLMPNinData = saveData(
  getData,
  "nins",
  ninActions.changeNindata,
  fetchLookupMobileProof,
  postLookupMobileFail
);
