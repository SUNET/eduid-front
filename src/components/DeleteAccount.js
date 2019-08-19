import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";
import DeleteModal from "components/DeleteModal";

import "style/Security.scss";

class DeleteAccount extends Component {
  render() {
    if (this.props.redirect_to !== "") {
    window.location.href = this.props.redirect_to;
      return null;
    }
    if (this.props.deleted) {
      window.location.href = "https://eduid.se";
      return null;
    }

    return (
      <div>
        <div id="delete-account-container">
          <div className="intro">
            <h4>{this.props.l10n("settings.account_title")}</h4>
            <p>{this.props.l10n("settings.account_description")}</p>
          </div>
          <EduIDButton
            className="btn-link"
            id="delete-button"
            onClick={this.props.handleStartConfirmationDeletion}
          >
            {this.props.l10n("settings.button_delete_account")}
          </EduIDButton>
        </div>

        <DeleteModal
          title={this.props.l10n("settings.modal_delete_title")}
          showModal={this.props.confirming_deletion}
          closeModal={this.props.handleStopConfirmationDeletion}
          handleConfirm={this.props.handleConfirmationDeletion}
        />
      </div>
    );
  }
}

DeleteAccount.propTypes = {
  credentials: PropTypes.array,
  deleted: PropTypes.bool,
  confirming_deletion: PropTypes.bool,
  handleStartConfirmationDeletion: PropTypes.func,
  handleStopConfirmationDeletion: PropTypes.func,
  handleConfirmationDeletion: PropTypes.func
};

export default DeleteAccount;
