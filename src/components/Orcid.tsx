import React, { Fragment } from "react";
import EduIDButton from "components/EduIDButton";
import { FormattedMessage } from "react-intl";
import { PDOrcid } from "apis/eduidPersonalData";

const orcidIcon = require("../../img/vector_iD_icon-w.svg");

export interface OrcidProps {
  orcid: PDOrcid;
  handleOrcidConnect: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleOrcidDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Orcid(props: OrcidProps): JSX.Element {
  if (!props.orcid) {
    return (
      <Fragment>
        <div className="buttons">
          <EduIDButton
            buttonstyle="primary"
            id="connect-orcid-button"
            className="btn-icon"
            onClick={props.handleOrcidConnect}
          >
            <img className="orcid-logo" src={orcidIcon} />
            <FormattedMessage description="orcid connect button" defaultMessage={`Add ORCID account`} />
          </EduIDButton>
        </div>
        <p className="help-text">
          <FormattedMessage
            description="orcid description"
            defaultMessage={`ORCID iD distinguishes you from other researchers and allows linking of your research 
            outputs and activities to your identity, regardless of the organisation you are working with.`}
          />
        </p>
      </Fragment>
    );
  } else {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-form">
          <tbody>
            <tr className="email-row">
              <td>
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
  }
}

export default Orcid;
