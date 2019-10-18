import React, { Component } from "react";
import PropTypes from "prop-types";

import EduIDButton from "components/EduIDButton";

import "style/AccountLinking.scss";

class Orcid extends Component {
  render() {
    let orcidData;

    const orcidIntro = (
      <div className="orcid-intro">
        {/* <div className="orcid-logo-container">
          <span className="orcid-logo" />
    </div>*/}
        {/* 
        <label>{this.props.l10n("orc.title")}</label> */}
      </div>
    );

    if (this.props.orcid != null) {
      let orcidAuthor = this.props.orcid.name;
      if (!orcidAuthor) {
        orcidAuthor =
          this.props.orcid.given_name + " " + this.props.orcid.family_name;
      }
      orcidData = (
        <div className="table-responsive">
          <table className="table table-striped table-form">
            <tbody>
              <tr className="emailrow">
                <td>
                  {orcidAuthor}
                  <a href={this.props.orcid.id}>
                    <div className="orcid-logo-container">
                      <span className="orcid-logo" />
                    </div>
                    {this.props.orcid.id}
                  </a>
                </td>
                <td>
                  <EduIDButton
                    className="btn-link"
                    id="remove-orcid-button"
                    onClick={this.props.handleOrcidDelete}
                  >
                    <svg
                      className="remove"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0h2v16H7z" />
                      <path d="M0 9V7h16v2z" />
                    </svg>
                  </EduIDButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      orcidData = (
        <div id="orcid-data">
          <EduIDButton
            id="connect-orcid-button"
            className="settings-button ok-button"
            onClick={this.props.handleOrcidConnect}
          >
            <div className="orcid-logo-container">
              <span className="orcid-logo" />
            </div>
            {this.props.l10n("orc.button_connect")}
          </EduIDButton>
          <p className="orcid-btn-help">
            {this.props.l10n("orc.long_description")}
          </p>
          {/* <p>{this.props.l10n("orc.about_link")}</p> */}
        </div>
      );
    }
    return (
      <div id="orcid-connect">
        {orcidIntro}
        {orcidData}
      </div>
    );
  }
}

Orcid.propTypes = {
  orcid: PropTypes.object,
  handleOrcidConnect: PropTypes.func,
  handleOrcidDelete: PropTypes.func,
  langs: PropTypes.array
};

export default Orcid;
