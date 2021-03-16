import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../login/styles/index.scss";
import i18n from "../login/translation/InjectIntl_HOC_factory";

const Errors = (props) => {
  let query = new URLSearchParams(useLocation().search);
  const [errorUrlQuery, setErrorUrlQuery] = useState({errorurl_code: "", technicalInformations: {}});

  useEffect(()=> {
    let errorurl_code = query.get("errorurl_code");
    let errorurl_ts = query.get("errorurl_ts");
    let errorurl_rp = query.get("errorurl_rp");
    let errorurl_tid = query.get("errorurl_tid");
    let errorurl_ctx = query.get("errorurl_ctx");

    const convertUnixDate = new Date(errorurl_ts * 1000);
    const newConvertTs = ' ('+ convertUnixDate.getFullYear()+'-' + ((convertUnixDate.getMonth()+1).toString())+ '-'+(convertUnixDate.getDate().toString())+')';

    setErrorUrlQuery({
      errorurl_code: errorurl_code, 
      technicalInformations: {
        errorurl_ts: errorurl_ts ? errorurl_ts + newConvertTs  : undefined, 
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
    Object.keys(errorUrlQuery.technicalInformations).some((key) => {
      if (errorUrlQuery.technicalInformations[key] !== undefined){
        return true
      } else 
      return false
  });

  let technicalInfomations = 
    Object.keys(errorUrlQuery.technicalInformations).map((key) => {
      return (
        <div className={"technical-info-text"} key={key}>
          <p>{key.toUpperCase()}</p>
          <p>{errorUrlQuery.technicalInformations[key]}</p>
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
              {technicalInfomations}
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default i18n(Errors);
