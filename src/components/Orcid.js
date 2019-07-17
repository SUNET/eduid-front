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
                    {this.props.l10n("tl.remove")}
                  </EduIDButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      orcidData = (
        <div className="orcid-data">
          <p>{this.props.l10n("orc.long_description")}</p>
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
