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

  let catchAllErrorInfo = (
    <>
      { props.translate("error_identification_failed"),
        props.translate("error_authentication"),
        props.translate("error_insufficient_privileges"),
        props.translate("error_access")
      }
    </>
  );

  let errorText = (
    <>
      { errorUrlQuery.errorurl_code === "IDENTIFICATION_FAILURE" ? props.translate("error_identification_failed") :
        errorUrlQuery.errorurl_code === "AUTHENTICATION_FAILURE" ? props.translate("error_authentication") :
        errorUrlQuery.errorurl_code === "AUTHORIZATION_FAILURE" ? props.translate("error_insufficient_privileges") :
        errorUrlQuery.errorurl_code === "OTHER_ERROR" ? props.translate("error_access") : catchAllErrorInfo
      }
    </>
  );

  let technicalInformation = 
    errorUrlQuery.technicalInformation && Object.keys(errorUrlQuery.technicalInformation).map((result, key) => {
      return <p key={key}>{errorUrlQuery.technicalInformation[result]}</p>
    }
  );

  return(
    <div className="vertical-content-margin">
      <div className="swamid-error">
        {errorText}
      </div>
      {technicalInformation}
    </div>
  )
}

export default i18n(Errors);
