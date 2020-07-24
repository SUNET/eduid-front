import { checkStatus, getRequest } from "./common";

export function getData(url) {
  console.log("groups request url", url);
  const request = {
    ...getRequest,
    redirect: "follow",
  };
  return window
    .fetch(url, {
      ...request,
    })
    .then(checkStatus)
    .then((response) => response.json());
}
