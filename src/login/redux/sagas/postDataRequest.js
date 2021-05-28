import { checkStatus, ajaxHeaders } from "../../../sagas/common";

const postDataRequest = (url, dataToSend) => {
  return fetch(url, {
    method: "POST",
    // changed from mnaual as that is not default
    redirect: "follow",
    credentials: "include",
    headers: ajaxHeaders,
    body: JSON.stringify(dataToSend),
  })
    .then(checkStatus)
    .then((response) => response.json());
};

export default postDataRequest;
