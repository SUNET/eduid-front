import { GET_CHANGE_PASSWORD_FAIL } from "./Security";

export const GET_ORCID = "GET_ORCID";
export const GET_PERSONAL_DATA_ORCID_SUCCESS =
  "GET_PERSONAL_DATA_ORCID_SUCCESS";
export const GET_ORCID_FAIL = "GET_PERSONAL_DATA_ORCID_FAIL";
export const POST_ORCID_REMOVE = "POST_ORCID_REMOVE";
export const POST_ORCID_REMOVE_SUCCESS = "POST_ORCID_REMOVE_SUCCESS";
export const POST_ORCID_REMOVE_FAIL = "POST_ORCID_REMOVE_FAIL";
export const GET_ORCID_CONNECT = "GET_ORCID_CONNECT";
export const GET_ORCID_CONNECT_FAIL = "GET_ORCID_CONNECT_FAIL";


export function getOrcid() {
  return {
    type: GET_ORCID
  };
}

export function getOrcidFail(err) {
  return {
    type: GET_ORCID_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}

export function startOrcidRemove() {
  return {
    type: POST_ORCID_REMOVE
  };
}

export function startOrcidRemoveFail(err) {
  return {
    type: POST_ORCID_REMOVE_FAIL,
    error: true,
    payload: {
      message: err.toString()
    }
  };
}

export function startOrcidConnect() {
  return {
    type: GET_ORCID_CONNECT
  };
}

export function startOrcidConnectFail(err) {
  return {
    type: GET_ORCID_CONNECT_FAIL,
    error: true,
    payload: {
      message: err
    }
  };
}
