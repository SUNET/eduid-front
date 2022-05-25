import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";
import orcidIcon from "../../img/vector_iD_icon-w.svg";

class Orcid extends Component {
  render() {
    let orcidData;
    if (this.props.orcid && Object.keys(this.props.orcid).length) {
      let orcidAuthor = this.props.orcid.name;
      if (orcidAuthor !== undefined) {
        orcidAuthor = this.props.orcid.given_name + " " + this.props.orcid.family_name;
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
                    <a href={this.props.orcid.id}>{this.props.orcid.id}</a>
                    <EduIDButton
                      buttonstyle="close"
                      size="sm"
                      id="remove-orcid-button"
                      onClick={this.props.handleOrcidDelete}
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
