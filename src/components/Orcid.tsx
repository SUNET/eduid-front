import React, { Fragment } from "react";
import EduIDButton from "components/EduIDButton";

const orcidIcon = require("../../assets/logo.png");

function Orcid(props: any): JSX.Element {
  let orcidData;
  if (props.orcid && Object.keys(props.orcid).length) {
    let orcidAuthor = props.orcid.name;
    if (orcidAuthor !== undefined) {
      orcidAuthor = props.orcid.given_name + " " + props.orcid.family_name;
    }
    orcidData = (
      <div className="table-responsive">
        <table className="table table-striped table-form">
          <tbody>
            <tr className="email-row">
              <td>
                {orcidAuthor}
                <div className="orcid-logo-container">
                  <span className="orcid-logo" />
                  <a href={props.orcid.id}>{props.orcid.id}</a>
                  <EduIDButton
                    buttonstyle="close"
                    size="sm"
                    id="remove-orcid-button"
                    onClick={props.handleOrcidDelete}
                  ></EduIDButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    orcidData = (
      <Fragment>
        <div className="buttons">
          <EduIDButton
            buttonstyle="primary"
            id="connect-orcid-button"
            className="btn-icon"
            onClick={props.handleOrcidConnect}
          >
            <img className="orcid-logo" src={orcidIcon} />
            {props.translate("orc.button_connect")}
          </EduIDButton>
        </div>
        <p className="help-text">{props.translate("orc.long_description")}</p>
      </Fragment>
    );
  }
  return <Fragment>{orcidData}</Fragment>;
}

export default Orcid;
