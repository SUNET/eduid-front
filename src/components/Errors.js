import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { useLocation } from "react-router-dom";
import "../login/styles/index.scss";
import i18n from "../login/translation/InjectIntl_HOC_factory";

export const history = createBrowserHistory();

const Errors = (props) => {
  let query = new URLSearchParams(useLocation().search);
  const [errorUrlQuery, setErrorUrlQuery] = useState({errorurl_code: "", technicalInformation: {}});

  useEffect(()=> {
    let errorurl_code = query.get("errorurl_code");
    let errorurl_ts = query.get("errorurl_ts");
    let errorurl_rp = query.get("errorurl_rp");
    let errorurl_tid = query.get("errorurl_tid");
    let errorurl_ctx = query.get("errorurl_ctx");

    setErrorUrlQuery({
      errorurl_code: errorurl_code, 
      technicalInformation: {
        errorurl_ts: errorurl_ts, 
        errorurl_rp: errorurl_rp, 
        errorurl_tid: errorurl_tid, 
        errorurl_ctx: errorurl_ctx
      }
    })
  }, []);

  let errorText = "";
  let technicalInformation = 
    errorUrlQuery.technicalInformation && Object.keys(errorUrlQuery.technicalInformation).map((result, key) => {
      return <p key={key}>{errorUrlQuery.technicalInformation[result]}</p>
    }
  )
  if(errorUrlQuery.errorurl_code){
    if(errorUrlQuery.errorurl_code === "IDENTIFICATION_FAILURE")
      errorText =  <span>{props.translate("identification_failed")}</span>
    else if(errorUrlQuery.errorurl_code === "AUTHENTICATION_FAILURE")
      errorText = <p>Authentication error</p>
    else if(errorUrlQuery.errorurl_code === "AUTHORIZATION_FAILURE")
      errorText = <p>Insufficient privileges</p>
    else if(errorUrlQuery.errorurl_code === "OTHER_ERROR")
      errorText = <p>Access error</p>
    else {
      errorText = 
        <div className="vertical-content-margin">
            <p className="heading">
                <span>{props.translate("identification_failed")}</span>
                <span>Authentication error</span>
                <span>Insufficient privileges</span>
                <span>Access error</span>
            </p>
        </div>
    }
  }
  else {
    errorText = 
      <div className="vertical-content-margin">
        <p className="heading">
          <span>{props.translate("identification_failed")}</span>
          <span>Authentication error</span>
          <span>Insufficient privileges</span>
          <span>Access error</span>
        </p>
      </div>
  }
  return(
    <>
      {errorText}
      {technicalInformation}
    </>
  )
}

export default i18n(Errors);
