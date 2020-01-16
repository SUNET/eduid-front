import React, { Component } from "react";
import PropTypes from "prop-types";
import GenericConfirmModal from "components/GenericConfirmModal";

import "style/PendingActions.scss";

class PendingActions extends Component {
  render() {
    console.log("these are the props in pending actions:", this.props);
    let modalPrompt = "";
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
      modalPrompt = [
        <GenericConfirmModal
          key="1"
          title={"this is modal title"}
          mainText={"this is mainText"}
          showModal={this.props.showModal}
          closeModal={this.props.handleCloseModal}
          acceptModal={this.props.handleCloseModal}
        />
      ];
    }

    return (
      <div>
        <button id="beta-link" onClick={this.props.handleShowModal}>
          {/* href="/feature/beta" */}
          {this.props.l10n("beta-link.change-version")}
        </button>
        <ul className="list-unstyled pending-actions">
          {toShow}
          {toConfirm}
        </ul>
        {modalPrompt}
      </div>
    );
  }
}

PendingActions.propTypes = {
  pending: PropTypes.array
};

export default PendingActions;
