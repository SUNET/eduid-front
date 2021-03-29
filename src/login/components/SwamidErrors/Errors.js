
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/index.scss";
import i18n from "../../translation/InjectIntl_HOC_factory";
import { swamidErrorData } from "./swamidErrorData";

function Errors(props){
  let query = new URLSearchParams(useLocation().search);
  const [techInformations, setTechInformations] = useState({});
  useEffect(()=> {
    let errorurl_ts = query.get("errorurl_ts");
    let errorurl_rp = query.get("errorurl_rp");
    let errorurl_tid = query.get("errorurl_tid");
    let errorurl_ctx = query.get("errorurl_ctx");
    //Convert unix time stamp to (YYYY-MM-DD) format
    const convertUnixDate = new Date(errorurl_ts * 1000);
    const newDateUrlTs = 
      ' ('+ convertUnixDate.getFullYear()+'-' + ((convertUnixDate.getMonth()+1).toString())+ '-'+(convertUnixDate.getDate().toString())+')';

      setTechInformations({
        errorurl_ts: errorurl_ts &&  errorurl_ts !== "ERRORURL_TS" ? errorurl_ts + newDateUrlTs : undefined, 
        errorurl_rp: errorurl_rp && errorurl_rp !== "ERRORURL_RP" ? errorurl_rp : undefined,
        errorurl_tid: errorurl_tid && errorurl_tid !== "ERRORURL_TID" ? errorurl_tid : undefined,
        errorurl_ctx: errorurl_ctx && errorurl_ctx !== "ERRORURL_CTX" ? errorurl_ctx : undefined,
    })
  }, []);

  const checkErrorUrlCtx = () => {
    //Compare error url ctx query string and swaimidErrorData.common 
    Object.keys(common).map(key=>{
      if(key === errorurl_code){
      let result = common[key];
      Object.keys(result).map((urlCtx)=> {
        if(urlCtx === techInformations.errorurl_ctx){
          return isSpecificError = (
            <div className="specific-error">{props.translate(Object.values(result[urlCtx]).toString())}</div>
        )}
      })
    }
  })}

  let isSpecificError = "";
  let errorurl_code = query.get("errorurl_code")
  let common = swamidErrorData.common;
  let specialRp = swamidErrorData["sp.ladok.se"];
 
  if(techInformations.errorurl_rp === "sp.ladok.se")
    Object.keys(specialRp).map((key)=>{
      let ctxResult = specialRp[key];
      if(key === errorurl_code){
        Object.keys(ctxResult).map((urlCtx)=>{
          if(urlCtx === techInformations.errorurl_ctx){
            return isSpecificError = (
              <div className="specific-error">{props.translate(Object.values(ctxResult[urlCtx]).toString())}</div>
            );
          }
        })
      }else checkErrorUrlCtx();
    }
  )
  else if (techInformations.errorurl_rp !== "sp.ladok.se"){
    checkErrorUrlCtx();
  }

  let showErrorCode = (
    errorurl_code === "IDENTIFICATION_FAILURE" ? props.translate("error_identification_failed") :
    errorurl_code === "AUTHENTICATION_FAILURE" ? props.translate("error_authentication") : 
    errorurl_code === "AUTHORIZATION_FAILURE" ? props.translate("error_insufficient_privileges") : 
    errorurl_code === "OTHER_ERROR" ? props.translate("error_access") :   
    <div className="specific-error">{props.translate("error_without_code")}</div>
  );

  let isTechnicalInfoNotEmpty = 
    Object.keys(techInformations).some((key) => {
      if (techInformations[key] !== undefined){
        return true
      } else 
      return false
  });

  let technicalInfomations = (
    Object.keys(techInformations).map((key) => {
      return (
        <div className={"technical-info-text"} key={key}>
          <p>{key.toUpperCase()}</p>
          <p>{techInformations[key]}</p>
        </div>
      )}
    )
  );

  return(   
    <div className="vertical-content-margin">
      <div className="swamid-error">
        {isTechnicalInfoNotEmpty ?
          <>
            {isSpecificError ? isSpecificError : showErrorCode}
            <div className={"technical-info-heading"}>
              {props.translate("error_technical_info_heading")}
            </div>
            <div className={"technical-info-box"}>
              {technicalInfomations}
            </div>
          </> : 
          <>{showErrorCode}</>
        }
      </div>
    </div>
  )
}

export default i18n(Errors);
