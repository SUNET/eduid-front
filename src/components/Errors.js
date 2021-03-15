import React, { useEffect, useState } from "react";
import { createBrowserHistory } from "history";
import { useLocation } from "react-router-dom";
import "../login/styles/index.scss";
import i18n from "../login/translation/InjectIntl_HOC_factory";

export const history = createBrowserHistory();

const Errors = (props) => {
  let query = new URLSearchParams(useLocation().search);
  const [errorUrlQuery, setErrorUrlQuery] = useState({errorurlCode: "", technicalInformation: {}});

  useEffect(()=> {
    let errorurlCode = query.get("errorurl_code");
    let errorurlTs = query.get("errorurl_ts");
    let errorurlRp = query.get("errorurl_rp");
    let errorurlTid = query.get("errorurl_tid");
    let errorurlCtx = query.get("errorurl_ctx");

    setErrorUrlQuery({
      errorurlCode: errorurlCode, 
      technicalInformation: {
        errorurlTs: errorurlTs ? errorurlTs : undefined, 
        errorurlRp: errorurlRp ? errorurlRp : undefined,
        errorurlTid: errorurlTid ? errorurlTid : undefined,
        errorurlCtx: errorurlCtx ? errorurlCtx : undefined,
      }
    })
  }, []);

  let catchAllErrorInfo = (
    <>
      { 
        props.translate("error_identification_failed"),
        props.translate("error_authentication"),
        props.translate("error_insufficient_privileges"),
        props.translate("error_access")
      }
    </>
  );

  let errorText = (
    <>
      {
        errorUrlQuery.errorurlCode === "IDENTIFICATION_FAILURE" ? props.translate("error_identification_failed") :
        errorUrlQuery.errorurlCode === "AUTHENTICATION_FAILURE" ? props.translate("error_authentication") :
        errorUrlQuery.errorurlCode === "AUTHORIZATION_FAILURE" ? props.translate("error_insufficient_privileges") :
        errorUrlQuery.errorurlCode === "OTHER_ERROR" ? props.translate("error_access") : catchAllErrorInfo
      }
    </>
  );

  let isTechnicalInfoNotEmpty = 
    Object.keys(errorUrlQuery.technicalInformation).some((key) => {
      if (errorUrlQuery.technicalInformation[key] !== undefined){
        return true
      } else 
      return false
  });

  let technicalInfo = 
    Object.keys(errorUrlQuery.technicalInformation).map((result, key) => {
      return <span key={key}>{isTechnicalInfoNotEmpty && errorUrlQuery.technicalInformation[result]}</span>
  });

  return(
    <div className="vertical-content-margin">
      <div className="swamid-error">
        {errorText}
      </div>
      <div className={isTechnicalInfoNotEmpty ? "technical-info-box" : null}>
        {technicalInfo}
      </div>
    </div>
  )
}

export default i18n(Errors);
