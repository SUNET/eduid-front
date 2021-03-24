
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/index.scss";
import i18n from "../../translation/InjectIntl_HOC_factory";
import { swamidErrorData } from "./swamidErrorData";

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

const showErrorCode = ({ errorUrlQuery, props }) => {   
  if(errorUrlQuery.errorurl_code === "IDENTIFICATION_FAILURE") {
    return props.translate("error_identification_failed")
  }else if(errorUrlQuery.errorurl_code === "AUTHENTICATION_FAILURE"){
    return props.translate("error_authentication")
  }else if(errorUrlQuery.errorurl_code === "AUTHORIZATION_FAILURE"){
    return props.translate("error_insufficient_privileges");
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

  let isSpecificRP = (
    errorUrlQuery.technicalInformations.errorurl_rp !== undefined &&
      Object.keys(swamidErrorData).map(key=>{
        if (key === errorUrlQuery.technicalInformations.errorurl_rp)
          return swamidErrorData[key]
      }
    )
  );
  
  let specificRpError = 
    isSpecificRP.length > 0 && isSpecificRP.map(key=>{
      if(key!==undefined)
        return Object.keys(key).map((i)=>{
          if(i === errorUrlQuery.errorurl_code){
            let result = key[i];
            return Object.keys(result).map((urlCtx, index)=>{
            if(urlCtx.includes(errorUrlQuery.technicalInformations.errorurl_ctx)){
              return (
                <span key={index}>{Object.values(result[urlCtx]).toString()}</span>
              )
            }
          }
        )
      }
    })
  });

  let specificCtxError = 
    Object.keys(swamidErrorData.common).map(key=>{
      let entry = swamidErrorData.common[key];
      if(key === errorUrlQuery.errorurl_code){
        return Object.keys(entry).map((urlCtx, index)=> {
          if(urlCtx.includes(errorUrlQuery.technicalInformations.errorurl_ctx)){
            return (
              <span key={index}>{Object.values(entry[urlCtx]).toString()}</span>
            )}
        })
      }
  });

  return(
    <div className="vertical-content-margin">
      <div className="swamid-error">
        {isTechnicalInfoNotEmpty ?
          <>
          { isSpecificRP ? specificRpError : specificCtxError}
           <div className={"technical-info-heading"}>
              {props.translate("error_technical_info_heading")}
            </div>
            <div className={"technical-info-box"}>
              {technicalInfomations}
            </div>
          </> : 
          <>
            {showErrorCode({errorUrlQuery, props})}
          </>
        }
      </div>
    </div>
  )
}

export default i18n(Errors);
