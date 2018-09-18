import { newCsrfToken } from "actions/SignupMain";


export const checkStatus = function (response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        throw new Error(response.statusText);
    }
};

export const ajaxHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip,deflate',
    "Cache-Control": "no-store, no-cache, must-revalidate",
    "Pragma": "no-cache",
    "X-Requested-With": "XMLHttpRequest"
};

export const postRequest = {
    method: 'post',
    redirect: 'manual',
    credentials: 'include',
    headers: ajaxHeaders,
}

export const getRequest = {
    method: 'get',
    redirect: 'manual',
    credentials: 'include',
    headers: ajaxHeaders,
}

export const putCsrfToken = function (action) {
  const token = action.payload.csrf_token;
  if (token !== undefined) {
    delete(action.payload.csrf_token);
    return newCsrfToken(token);
  } else {
    return {type: 'NOOP_ACTION'};
  }
};
