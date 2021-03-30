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

  let isSpecificError = "";
  let errorurlCode = query.get("errorurl_code");
  let errorurlCtx = query.get("errorurl_ctx");
  let errorurlRp = query.get("errorurl_rp");
  let common = swamidErrorData.common;
  let specialRp = swamidErrorData["sp.ladok.se"];

  const checkErrorUrlCtx = () => {
    //Compare error url ctx query string and swaimidErrorData.common 
    Object.keys(common).map(key=>{
      if(key === errorurlCode){
      let result = common[key];
      Object.keys(result).map((urlCtx)=> {
        if(errorurlCtx && errorurlCtx.includes(urlCtx)){
          return isSpecificError = (
            <div className="specific-error">{props.translate(Object.values(result[urlCtx]).toString())}</div>
        )}
      })
    }
  })};

  if(errorurlRp && errorurlRp.includes("sp.ladok.se"))
    Object.keys(specialRp).map((key)=>{
      let ctxResult = specialRp[key];
      if(key === errorurlCode){
        Object.keys(ctxResult).map((urlCtx)=>{
          if(errorurlCtx && errorurlCtx.includes(urlCtx)){
            return isSpecificError = (
              <div className="specific-error">{props.translate(Object.values(ctxResult[urlCtx]).toString())}</div>
            );
          }else checkErrorUrlCtx();
        })
      }else checkErrorUrlCtx();
    }
  )
  else checkErrorUrlCtx();
  
  let showErrorCode = (
    errorurlCode  === "IDENTIFICATION_FAILURE" ? props.translate("error_identification_failed") :
    errorurlCode  === "AUTHENTICATION_FAILURE" ? props.translate("error_authentication") : 
    errorurlCode  === "AUTHORIZATION_FAILURE" ? props.translate("error_insufficient_privileges") : 
    errorurlCode  === "OTHER_ERROR" ? props.translate("error_access") :   
    <div className="specific-error">{props.translate("error_without_code")}</div>
  );

  let isTechnicalInfoNotEmpty = 
    Object.keys(techInformations).some((key) => {
      if(techInformations[key] !== undefined){
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