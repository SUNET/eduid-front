import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";
import NotificationModal from "../login/components/Modals/NotificationModal";
import "../login/styles/index.scss";
import { FormattedMessage } from "react-intl";

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
      <article id="delete-account-container">
        <div className="intro">
          <h3>{this.props.translate("settings.account_title")}</h3>
          <p>{this.props.translate("settings.account_description")}</p>
        </div>
        <EduIDButton buttonstyle="link" id="delete-button" onClick={this.props.handleStartConfirmationDeletion}>
          {this.props.translate("security.button_delete_account")}
        </EduIDButton>

        <NotificationModal
          id="delete-account-modal"
          title={
            <FormattedMessage
              defaultMessage={`Are you sure you want to delete your eduID?`}
              description="settings.modal_delete_title"
            />
          }
          mainText={
            <FormattedMessage
              defaultMessage={`Deleting your eduID will permanently remove all your saved 
              information. After clicking the button you need to use your log in details one final time.`}
              description="delete.modal_info"
            />
          }
          showModal={this.props.confirming_deletion}
          closeModal={this.props.handleStopConfirmationDeletion}
          acceptModal={this.props.handleConfirmationDeletion}
          acceptButtonText={<FormattedMessage defaultMessage="Delete my eduID" description="delete.confirm_button" />}
        />
      </article>
    );
  }
}

DeleteAccount.propTypes = {
  credentials: PropTypes.array,
  deleted: PropTypes.bool,
  confirming_deletion: PropTypes.bool,
  handleStartConfirmationDeletion: PropTypes.func,
  handleStopConfirmationDeletion: PropTypes.func,
  handleConfirmationDeletion: PropTypes.func,
};

export default DeleteAccount;
