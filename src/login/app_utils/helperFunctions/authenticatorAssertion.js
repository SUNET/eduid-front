// assertion from authenticator needs to be encoded before post to server
export const safeEncode = (obj) => {
  // console.log("obj", obj);
  //ArrayBuffer(64)
  const bytesObj = String.fromCharCode.apply(null, new Uint8Array(obj));
  // console.log("bytesObjj", bytesObj);
  const unsafeObj = window.btoa(bytesObj);
  // console.log("unsafeObj", unsafeObj);
  return unsafeObj.replace(/\//g, "_").replace(/\+/g, "-").replace(/=*$/, "");
};
