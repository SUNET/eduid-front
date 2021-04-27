import {
  checkStatus,
  postRequest,
  saveData,
} from "sagas/common";
import { postLookupMobileFail } from "actions/LookupMobileProofing";
import * as ninActions from "actions/Nins";

// take user data into request 
export function fetchLookupMobileProof(config, data) {
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
