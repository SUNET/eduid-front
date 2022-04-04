import React, { Component } from "react";
import PropTypes from "prop-types";

import i18n from "../login/translation/InjectIntl_HOC_factory";
import EduIDButton from "components/EduIDButton";

class TableList extends Component {
  render() {
    let rows = [],
      key;
    if (this.props.entries) {
      rows = this.props.entries.map((entry, index) => {
        if (entry.number) {
          key = entry.number;
        } else {
          key = entry.email;
        }
        if (entry.primary) {
          return (
            <tr className="emailrow primary" data-identifier={index} data-object={key} key={key}>
              <td className="identifier data">{key}</td>
              <td className="non-identifier status-label">
                <span className="nobutton verify-status-label">{this.props.translate("tl.primary")}</span>
              </td>
              <td className="non-identifier data-remove-button">
                <EduIDButton buttonStyle="link" onClick={this.props.handleRemove}>
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
          );
        } else if (entry.verified) {
          return (
            <tr className="emailrow make-primary" data-identifier={index} data-object={key} key={key}>
              <td className="identifier data">{key}</td>
              <td className="non-identifier">
                <EduIDButton buttonStyle="link" onClick={this.props.handleMakePrimary}>
                  {this.props.translate("tl.make_primary")}
                </EduIDButton>
              </td>
              <td className="non-identifier ">
                <EduIDButton buttonStyle="close" onClick={this.props.handleRemove}></EduIDButton>
              </td>
            </tr>
          );
        } else {
          return (
            <tr className="emailrow make-primary" data-identifier={index} data-object={key} key={key}>
              <td className="identifier data">{key}</td>
              <td className="non-identifier ">
                <EduIDButton buttonStyle="link" onClick={this.props.handleStartConfirmation}>
                  {this.props.translate("tl.pending")}
                </EduIDButton>
              </td>
              <td className="non-identifier">
                <EduIDButton buttonStyle="close" onClick={this.props.handleRemove}></EduIDButton>
              </td>
            </tr>
          );
        }
      }, this);
    }
    return (
      <div className="table-responsive">
        <table className="table-form">
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

TableList.propTypes = {
  entries: PropTypes.array,
  handleStartConfirmation: PropTypes.func,
  handleRemove: PropTypes.func,
  handleMakePrimary: PropTypes.func,
};

export default i18n(TableList);
