import { checkStatus, getRequest } from "../../../sagas/common";

export function getData(url) {
  const request = {
    ...getRequest,
  };
  return window
    .fetch(url, {
      ...request,
    })
    .then(checkStatus)
    .then((response) => response.json());
}
