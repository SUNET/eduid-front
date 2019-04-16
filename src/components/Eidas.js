
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EduIDButton from 'components/EduIDButton';
import NotificationsContainer from 'containers/Notifications';

import { Button, ButtonGroup, FormText } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class Eidas extends Component {

  render () {
    // Temporary instructions until Sweden Connect has more alternatives and we have a DS
    const freja_instructions = (
      <div className="well" id="freja-instructions">
        <ol>
          <li>{this.props.l10n('eidas.freja_instructions_step_1')}</li>
          <li>{this.props.l10n('eidas.freja_instructions_step_2')}</li>
          <li>{this.props.l10n('eidas.freja_instructions_step_3')}</li>
          <li>{this.props.l10n('eidas.freja_instructions_step_4')}</li>
        </ol>
      </div>
    );

    let eidasButton, showModalButton, buttonGroup;

    eidasButton = (
        <EduIDButton className="btn-link"
                     href={this.props.eidas_sp_freja_idp_url}>
          {this.props.l10n('eidas.freja_eid_ready')}
          </EduIDButton>
    );

    buttonGroup = (
      <ButtonGroup vertical block>
        <Button className="btn-link"
                href="https://frejaeid.com/skaffa-freja-eid/"
                target="_blank">
          {this.props.l10n('eidas.freja_instructions_install_link')}
        </Button>

        {eidasButton}
      </ButtonGroup>
    );

    showModalButton = (
      <EduIDButton 
              id="eidas-show-modal"
              onClick={this.props.handleShowModal}
              block>
            {this.props.l10n('eidas.freja_eid')}
      </EduIDButton>
    );

    return (
      <div>
        <form id="eidas-form"
              className="form-horizontal"
              role="form">
          <fieldset id="eidas">
            {showModalButton}
            <FormText>{this.props.l10n('eidas.initialize_proofing_help_text')}</FormText>
          </fieldset>
        </form>

        <div id="eidas-info-dialog"
             tabIndex="-1"
             role="dialog"
             aria-labelledby="askDialogPrompt"
             aria-hidden="true"
             data-backdrop="true">

          <Modal isOpen={this.props.showModal} id="eidas-modal">
            <ModalHeader>
              {this.props.l10n('eidas.modal_title')}
            </ModalHeader>

            <ModalBody>
              <h4>{this.props.l10n('eidas.freja_instructions_title')}</h4>
              {freja_instructions}
              <NotificationsContainer/>
              {buttonGroup}
            </ModalBody>

            <ModalFooter>
              <Button className="finish-button"
                      id="eidas-hide-modal"
                      onClick={this.props.handleHideModal}>
                {this.props.l10n('cm.close')}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

Eidas.propTypes = {
  handleShowModal: PropTypes.func,
  handleHideModal: PropTypes.func,
  showModal: PropTypes.bool,
  eidas_sp_freja_idp_url: PropTypes.string
};

export default Eidas;
