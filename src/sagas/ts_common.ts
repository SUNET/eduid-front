/*
 * Typed variants of things defined in common.js. Converting common.js to TypeScript was too big of a bite right now.
 */
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
  redirect: "manual",
  credentials: "include",
  headers: ajaxHeaders,
};

export const getRequest: RequestInit = {
  method: "get",
  redirect: "manual",
  credentials: "include",
  headers: ajaxHeaders,
};
