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
        errorurl_ts: errorurl_ts ? errorurl_ts : undefined, 
        errorurl_rp: errorurl_rp ? errorurl_rp : undefined,
        errorurl_tid:errorurl_tid ? errorurl_tid : undefined,
        errorurl_ctx: errorurl_ctx ? errorurl_ctx : undefined,
      }
    })
  }, []);

  let catchAllErrorCodes = (
    <>
      {props.translate("error_identification_failed")}
      {props.translate("error_authentication")}
      {props.translate("error_insufficient_privileges")}
      {props.translate("error_access")}
    </>
  );

  let showErrorCode = (
    <>
      {
        errorUrlQuery.errorurl_code === "IDENTIFICATION_FAILURE" ? props.translate("error_identification_failed") :
        errorUrlQuery.errorurl_code === "AUTHENTICATION_FAILURE" ? props.translate("error_authentication") :
        errorUrlQuery.errorurl_code === "AUTHORIZATION_FAILURE" ? props.translate("error_insufficient_privileges") :
        errorUrlQuery.errorurl_code === "OTHER_ERROR" ? props.translate("error_access") : catchAllErrorCodes
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
    Object.keys(errorUrlQuery.technicalInformation).map((key) => {
      return (
        <div className={"technical-info-text"} key={key}>
          <p>{key.toUpperCase()}</p>
          <p>{errorUrlQuery.technicalInformation[key]}</p>
        </div>
      )}
  );

  return(
    <div className="vertical-content-margin">
      <div className="swamid-error">
        {showErrorCode}
        {isTechnicalInfoNotEmpty &&
          <>
           <div className={"technical-info-heading"}>
              {props.translate("error_technical_info_heading")}
            </div>
            <div className={"technical-info-box"}>
              {technicalInfo}
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default i18n(Errors);
