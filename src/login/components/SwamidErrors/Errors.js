import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/index.scss";
import i18n from "../../translation/InjectIntl_HOC_factory";

const catchAllErrorCodes = (props) => {
  return (
    <>
      {props.translate("error_login_failed")}
      {props.translate("error_identification_failed")}
      {props.translate("error_authentication")}
      {props.translate("error_insufficient_privileges")}
      {props.translate("error_access")}
    </>
  )
};

const checkErrorUrlCtx = ({ errorUrlQuery, props }) => {
  const { errorurl_ctx } = errorUrlQuery.technicalInformations;
  if(errorurl_ctx){
    if(errorurl_ctx.includes("/assurance/al1") || errorurl_ctx.includes("/assurance/IAP/low")){
      return props.translate("error_insufficient_privileges_al1");
    }else if(errorurl_ctx.includes("/assurance/al2") || errorurl_ctx.includes("/assurance/IAP/medium") || errorurl_ctx.includes("/profile/cappuccino")){
      return props.translate("error_insufficient_privileges_al2");
    }else if(errorurl_ctx.includes("/assurance/al3") || errorurl_ctx.includes("/assurance/IAP/high") || errorurl_ctx.includes("/assurance/profile/espresso")){
      return props.translate("error_insufficient_privileges_al3");
    }else return props.translate("error_insufficient_privileges");
  }
  else return props.translate("error_insufficient_privileges");
};

const showErrorCode = ({ errorUrlQuery, props }) => {   
  if(errorUrlQuery.errorurl_code === "IDENTIFICATION_FAILURE") {
    return props.translate("error_identification_failed")
  }else if(errorUrlQuery.errorurl_code === "AUTHENTICATION_FAILURE"){
    return props.translate("error_authentication")
  }else if(errorUrlQuery.errorurl_code === "AUTHORIZATION_FAILURE"){
    //If error_code is AUTHORIZATION_FAILURE, check errorurl_ctx to show more detailed information
    return checkErrorUrlCtx({errorUrlQuery, props})
  }else if(errorUrlQuery.errorurl_code === "OTHER_ERROR"){
    return props.translate("error_access")
  }else return catchAllErrorCodes(props)
};

function Errors(props){
  let query = new URLSearchParams(useLocation().search);
  const [errorUrlQuery, setErrorUrlQuery] = useState({errorurl_code: "", technicalInformations: {}});

  useEffect(()=> {
    let errorurl_code = query.get("errorurl_code");
    let errorurl_ts = query.get("errorurl_ts");
    let errorurl_rp = query.get("errorurl_rp");
    let errorurl_tid = query.get("errorurl_tid");
    let errorurl_ctx = query.get("errorurl_ctx");
    //Convert unix time stamp to (YYYY-MM-DD) format
    const convertUnixDate = new Date(errorurl_ts * 1000);
    const newDateUrlTs = 
      ' ('+ convertUnixDate.getFullYear()+'-' + ((convertUnixDate.getMonth()+1).toString())+ '-'+(convertUnixDate.getDate().toString())+')';

    setErrorUrlQuery({
      errorurl_code: errorurl_code, 
      technicalInformations: {
        errorurl_ts: errorurl_ts &&  errorurl_ts !== "ERRORURL_TS" ? errorurl_ts + newDateUrlTs : undefined, 
        errorurl_rp: errorurl_rp && errorurl_rp !== "ERRORURL_RP" ? errorurl_rp : undefined,
        errorurl_tid: errorurl_tid && errorurl_tid !== "ERRORURL_TID" ? errorurl_tid : undefined,
        errorurl_ctx: errorurl_ctx && errorurl_ctx !== "ERRORURL_CTX" ? errorurl_ctx : undefined,
      }
    })
  }, []);

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
        {showErrorCode({errorUrlQuery, props})}
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
