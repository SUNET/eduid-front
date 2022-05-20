import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";
import orcidIcon from "../../img/vector_iD_icon-w.svg";

class Orcid extends Component {
  render() {
    let orcidData;

    if (this.props.orcid != null) {
      let orcidAuthor = this.props.orcid.name;
      if (!orcidAuthor) {
        orcidAuthor = this.props.orcid.given_name + " " + this.props.orcid.family_name;
      }
      orcidData = (
        <div className="table-responsive">
          <table className="table table-striped table-form">
            <tbody>
              <tr className="email-row">
                <td>
                  <div className="flex-between">
                    {orcidAuthor}
                    <EduIDButton buttonstyle="link" id="remove-orcid-button" onClick={this.props.handleOrcidDelete}>
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
                  </div>
                  <a href={this.props.orcid.id}>
                    <div className="orcid-logo-container">
                      <span className="orcid-logo" />
                      <span className="orcid-link">{this.props.orcid.id}</span>
                    </div>
                  </a>
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
              onClick={this.props.handleOrcidConnect}
            >
              <img className="orcid-logo" src={orcidIcon} />
              {this.props.translate("orc.button_connect")}
            </EduIDButton>
          </div>
          <p className="help-text">{this.props.translate("orc.long_description")}</p>
        </Fragment>
      );
    }
    return <Fragment>{orcidData}</Fragment>;
  }
}

Orcid.propTypes = {
  orcid: PropTypes.object,
  handleOrcidConnect: PropTypes.func,
  handleOrcidDelete: PropTypes.func,
  langs: PropTypes.array,
};

export default Orcid;
