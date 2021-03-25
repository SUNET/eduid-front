
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/index.scss";
import i18n from "../../translation/InjectIntl_HOC_factory";
import { swamidErrorData } from "./swamidErrorData";

const isSpecificRP = ({errorUrlQuery, props}) => {
  if(errorUrlQuery.technicalInformations.errorurl_rp !== undefined){
    return Object.keys(swamidErrorData).map(key=>{
      if (key === errorUrlQuery.technicalInformations.errorurl_rp){
        let result = swamidErrorData[key];
        return checkRP({result, errorUrlQuery, props});
      }
    }
  )}
};

const checkRP =({result, errorUrlQuery}) =>{
  return result && Object.keys(result).map(key=>{
    if(key === errorUrlQuery.errorurl_code);
      let r = result[key];
      return Object.keys(r).map((urlCtx, index)=>{
        if(urlCtx === errorUrlQuery.technicalInformations.errorurl_ctx){
          return <span key={index}>{Object.values(r[urlCtx]).toString()}</span>
        }
      }
    )
   }
)};

const checkCtx = ({errorUrlQuery, props})=>{
  let errorCode = swamidErrorData.common;
   return Object.keys(errorCode).map(key=>{
    if(key === errorUrlQuery.errorurl_code){
      let result = errorCode[key];
      return Object.keys(result).map((urlCtx, index)=> {
        if(urlCtx === errorUrlQuery.technicalInformations.errorurl_ctx){
          return <span key={index}>{Object.values(result[urlCtx]).toString()}</span>;
        }else checkDefaultCode({errorUrlQuery, props});
      })
    }else checkDefaultCode({errorUrlQuery, props});
  })
};

const checkDefaultCode =({errorUrlQuery, props})=> {
  if(errorUrlQuery.errorurl_code === "IDENTIFICATION_FAILURE") {
    return props.translate("error_identification_failed");
  }else if(errorUrlQuery.errorurl_code === "AUTHENTICATION_FAILURE"){
    return props.translate("error_authentication");
  }else if(errorUrlQuery.errorurl_code === "AUTHORIZATION_FAILURE"){
    return props.translate("error_insufficient_privileges");
  }else if(errorUrlQuery.errorurl_code === "OTHER_ERROR"){
    return props.translate("error_access")
  }else return catchAllErrorCodes(props)
};

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

  let technicalInfomations = (
    Object.keys(errorUrlQuery.technicalInformations).map((key) => {
      return (
        <div className={"technical-info-text"} key={key}>
          <p>{key.toUpperCase()}</p>
          <p>{errorUrlQuery.technicalInformations[key]}</p>
        </div>
      )}
    )
  );

  return(
    <div className="vertical-content-margin">
      <div className="swamid-error">
        {isTechnicalInfoNotEmpty ?
          <>
            {isSpecificRP({errorUrlQuery, props})}
            {checkCtx({errorUrlQuery, props})}
           <div className={"technical-info-heading"}>
              {props.translate("error_technical_info_heading")}
            </div>
            <div className={"technical-info-box"}>
              {technicalInfomations}
            </div>
          </> : 
          <>
            {checkDefaultCode({errorUrlQuery, props})}
          </>
        }
      </div>
    </div>
  )
}

export default i18n(Errors);
