import EduIDButton from "components/EduIDButton";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { isAndroid, isIOS } from "react-device-detect";
import { Button, ButtonGroup, FormText, Modal } from "reactstrap";

class OpenidConnectFreja extends Component {
  render() {
    // Wait for config to load before rendering, is there a better way?
    try {
      if (!this.props.proofing_methods.includes("oidc_freja")) {
        // Do not render anything
        return null;
      }
    } catch (e) {
      if (e instanceof TypeError) {
        return null;
      }
    }

    const isMobile = isAndroid || isIOS;
    const freja_instructions = (
      <div className="well" id="openid-connect-freja-instructions">
        <ol>
          <li>{this.props.translate("ocf.freja_instructions_step_1")}</li>
          <li>{this.props.translate("ocf.freja_instructions_step_2")}</li>
          <li>{this.props.translate("ocf.freja_instructions_step_3")}</li>
          <li>{this.props.translate("ocf.freja_instructions_step_4")}</li>
          <li>{this.props.translate("ocf.freja_instructions_step_5")}</li>
        </ol>
      </div>
    );

    let notOnMobileMsg, frejaButton, showModalButton, buttonGroup;

    if (!isMobile) {
      notOnMobileMsg = (
        <div id="openid-connect-freja-not-on-mobile">
          <h4>{this.props.translate("ocf.not_on_mobile_title")}</h4>
          <p>{this.props.translate("ocf.not_on_mobile_message")}</p>
        </div>
      );
    } else {
      frejaButton = (
        <EduIDButton
          // className="btn-link"
          color="link"
          onClick={this.props.handleInitializeFrejaProofing}
        >
          {this.props.translate("ocf.open_app")}
        </EduIDButton>
      );
      if (this.props.iaRequestData) {
        frejaButton = (
          <EduIDButton
            // className="btn-link"
            color="link"
            href={"frejaeid://identify?iaRequestData=" + this.props.iaRequestData}
          >
            {this.props.translate("ocf.open_app")}
          </EduIDButton>
        );
      }
      buttonGroup = (
        <ButtonGroup vertical block>
          <Button className="btn-link" href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">
            {this.props.translate("ocf.freja_instructions_install_link")}
          </Button>

          {frejaButton}
        </ButtonGroup>
      );
    }

    showModalButton = (
      <EduIDButton
        // className="proofing-button"
        color="primary"
        id="openid-connect-freja-show-modal"
        onClick={this.props.handleShowModal}
        block
      >
        {this.props.translate("ocf.initialize_proofing")}
      </EduIDButton>
    );

    return (
      <div>
        <form id="openid-connect-freja-form" className="form-horizontal" role="form">
          <fieldset id="openid-connect-freja">
            {showModalButton}
            <FormText className="proofing-btn-help" color="muted">
              {this.props.translate("ocf.initialize_proofing_help_text")}
            </FormText>
          </fieldset>
        </form>

        <div
          id="openid-connect-freja-info-dialog"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="askDialogPrompt"
          aria-hidden="true"
          data-backdrop="true"
        >
          <Modal show={this.props.showModal} id="openid-connect-freja-modal">
            <Modal.Header>
              <Modal.Title>{this.props.translate("ocf.modal_title")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <h4>{this.props.translate("ocf.freja_instructions_title")}</h4>
              {freja_instructions}
              {buttonGroup || notOnMobileMsg}
            </Modal.Body>

            <Modal.Footer>
              <Button
                className="finish-button"
                id="openid-connect-freja-hide-modal"
                onClick={this.props.handleHideModal}
              >
                {this.props.translate("cm.close")}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

OpenidConnectFreja.propTypes = {
  iaRequestData: PropTypes.string,
  handleInitializeFrejaProofing: PropTypes.func,
  handleShowModal: PropTypes.func,
  handleHideModal: PropTypes.func,
  showModal: PropTypes.bool,
  nin: PropTypes.string,
};

export default OpenidConnectFreja;
