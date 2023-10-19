/*
 * Typed variants of things defined in common.js. Converting common.js to TypeScript was too big of a bite right now.
 */

export class NeedsAuthenticationError extends Error {}

export const checkStatus = function (response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 0) {
    const next = document.location.href;
    /* TODO: Modify the code for better logic. The service URL should be the same as config.authn_service_url,
      but this code replaced it when the "url dashboard" was removed from the URL.*/
    const urlObject = new URL(response.url);
    const cleanedURL = urlObject.origin;
    document.location.href = cleanedURL + "/services/authn/login" + "?next=" + next;
    throw new NeedsAuthenticationError("Request needs authentication");
  } else {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
};

export const ajaxHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
  "Accept-Encoding": "gzip,deflate",
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  "X-Requested-With": "XMLHttpRequest",
};

export const postRequest: RequestInit = {
  method: "post",
  redirect: "manual", // we use this to 'trap' the 302 response we get when not authenticated
  credentials: "include",
  headers: ajaxHeaders,
};

export const getRequest: RequestInit = {
  method: "get",
  redirect: "manual", // we use this to 'trap' the 302 response we get when not authenticated
  credentials: "include",
  headers: ajaxHeaders,
};
