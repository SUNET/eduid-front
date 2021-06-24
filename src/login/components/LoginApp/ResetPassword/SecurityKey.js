import React from "react";
import InjectIntl  from "../../../translation/InjectIntl_HOC_factory";

const SecurityKey = (props) => {
  return (
    <>
      <p>{props.translate("mfa.reset-password-tapit")}</p>
      <div className="key-animation"  />
      <div>
        <form method="POST" action="#" id="form" className="form-inline">
          <div id="tou-form-buttons" className="form-group">
            <div className="input-group" />
          </div>
          <input type="hidden" name="tokenResponse" id="tokenResponse" />
        </form>
      </div>
      <div className="text-center">
        <div className="card" id="mfa-try-another-way">
          <div className="card-header">
            {props.translate("mfa.problems-heading")}
          </div>
          <div className="card-body">
            <button className="btn-link">
              {props.translate("mfa.try-again")}
            </button>
            <button className="btn-link">
              {props.translate("mfa.freja-eid")}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default InjectIntl(SecurityKey);