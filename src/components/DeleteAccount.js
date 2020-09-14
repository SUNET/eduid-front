import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";
import DeleteModal from "components/DeleteModal";

import "../login/styles/index.scss";

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
            <h4>{this.props.translate("settings.account_title")}</h4>
            <p>{this.props.translate("settings.account_description")}</p>
          </div>
          <EduIDButton
            className="btn-link"
            id="delete-button"
            onClick={this.props.handleStartConfirmationDeletion}
          >
            {this.props.translate("security.button_delete_account")}
          </EduIDButton>
        </div>

        <DeleteModal
          title={this.props.translate("settings.modal_delete_title")}
          showModal={this.props.confirming_deletion}
          closeModal={this.props.handleStopConfirmationDeletion}
          handleConfirm={this.props.handleConfirmationDeletion}
          acceptButtonText={this.props.translate("delete.confirm_button")}
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
