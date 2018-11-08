
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest, failRequest } from "actions/common";
import { postLookupMobileFail } from "actions/LookupMobileProofing";


export function* requestLookupMobileProof () {
    try {
        const state = yield select(state => state),
              url = state.config.LOOKUP_MOBILE_PROOFING_URL,
              input = document.getElementById('norEduPersonNin'),
              unconfirmed = document.getElementById('eduid-unconfirmed-nin'),
              nin = input ? input.value :
                            (unconfirmed ? state.nins.nin : 'testing'),
              data = {
                nin: nin,
                csrf_token: state.config.csrf_token
              };

        const lookupMobileData = yield call(fetchLookupMobileProof, url, data);
        yield put(putCsrfToken(lookupMobileData));
        yield put(lookupMobileData);
    } catch(error) {
        yield* failRequest(error, postLookupMobileFail);
    }
}

export function fetchLookupMobileProof (url, data) {
    return window.fetch(url, {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
