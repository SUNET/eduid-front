import React, { Component } from "react";
import PropTypes from "prop-types";
import GenericConfirmModal from "components/GenericConfirmModal";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import EduIDButton from "components/EduIDButton";

import "style/PendingActions.scss";
import "style/EduIDButton.scss";

class PendingActions extends Component {
  render() {
    // console.log("these are the props in pending actions:", this.props);
    let modal = "";
    let pdataMissing = true,
      toShow = this.props.pending.map((missing, index) => {
        if (
          ["given_name", "surname", "display_name", "language"].indexOf(
            missing
          ) >= 0
        ) {
          if (pdataMissing) {
            pdataMissing = false;
            return (
              <li key={index} className="pending-action-item">
                <a href="/profile/personaldata">
                  {this.props.l10n("pending.pdata")}
                </a>
              </li>
            );
          }
        } else {
          return (
            <li key={index} className="pending-action-item">
              <a onClick={this.props.handleGoToPending(missing).bind(this)}>
                {this.props.l10n("pending." + missing)}
              </a>
            </li>
          );
        }
      }),
      toConfirm = this.props.pending_confirm.map((missing, index) => {
        return (
          <li key={index} className="pending-action-item">
            <a onClick={this.props.handleGoToPending(missing).bind(this)}>
              {this.props.l10n("pending_confirm." + missing)}
            </a>
          </li>
        );
      });

    if (this.props.showModal) {
      modal = [
        <Modal isOpen={this.props.showModal}>
          <ModalHeader>
            {this.props.l10n("beta-link.to-beta.modal.header")}
          </ModalHeader>
          <ModalBody>
            <p>{this.props.l10n("beta-link.to-beta.modal.text")}</p>
          </ModalBody>
          <ModalFooter>
            <EduIDButton
              className="cancel-button"
              onClick={this.props.handleCloseModal}
            >
              {this.props.l10n("cm.cancel")}
            </EduIDButton>
            <a href="/feature/beta">
              <button id="beta-link-button" className="eduid-button">
                {this.props.l10n("cm.accept")}
              </button>
            </a>
          </ModalFooter>
        </Modal>
      ];
    }

    return (
      <div>
        <button id="beta-link" onClick={this.props.handleShowModal}>
          {this.props.l10n("beta-link.to-beta")}
        </button>
        <ul className="list-unstyled pending-actions">
          {toShow}
          {toConfirm}
        </ul>
        <div>{modal}</div>
      </div>
    );
  }
}

PendingActions.propTypes = {
  pending: PropTypes.array
};

export default PendingActions;
