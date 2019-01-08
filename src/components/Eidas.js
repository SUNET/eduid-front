
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EduIDButton from 'components/EduIDButton';
import NotificationsContainer from 'containers/Notifications';

import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Well from 'react-bootstrap/lib/Well';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


class Eidas extends Component {

  render () {
    // Temporary instructions until Sweden Connect has more alternatives and we have a DS
    const freja_instructions = (
      <Well id="freja-instructions">
        <ol>
          <li>{this.props.l10n('eidas.freja_instructions_step_1')}</li>
          <li>{this.props.l10n('eidas.freja_instructions_step_2')}</li>
          <li>{this.props.l10n('eidas.freja_instructions_step_3')}</li>
          <li>{this.props.l10n('eidas.freja_instructions_step_4')}</li>
        </ol>
      </Well>
    );

    let spinning = false, eidasButton, showModalButton, buttonGroup;
    if (this.props.is_fetching) spinning = true;


    eidasButton = (
        <EduIDButton bsStyle="link"
                     spinning={spinning}
                     href={this.props.eidas_sp_freja_idp_url}>
          {this.props.l10n('eidas.freja_eid_ready')}
          </EduIDButton>
    );

    buttonGroup = (
      <ButtonGroup vertical block>
        <Button bsStyle="link"
                href="https://frejaeid.com/skaffa-freja-eid/"
                target="_blank">
          {this.props.l10n('eidas.freja_instructions_install_link')}
        </Button>

        {eidasButton}
      </ButtonGroup>
    );

    showModalButton = (
      <EduIDButton bsStyle="primary"
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
            <HelpBlock>{this.props.l10n('eidas.initialize_proofing_help_text')}</HelpBlock>
          </fieldset>
        </form>

        <div id="eidas-info-dialog"
             tabIndex="-1"
             role="dialog"
             aria-labelledby="askDialogPrompt"
             aria-hidden="true"
             data-backdrop="true">

          <Modal show={this.props.showModal} id="eidas-modal">
            <Modal.Header>
              <Modal.Title>{this.props.l10n('eidas.modal_title')}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <h4>{this.props.l10n('eidas.freja_instructions_title')}</h4>
              {freja_instructions}
              <NotificationsContainer />
              {buttonGroup}
            </Modal.Body>

            <Modal.Footer>
              <Button className="finish-button"
                      id="eidas-hide-modal"
                      onClick={this.props.handleHideModal}>
                {this.props.l10n('cm.close')}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

Eidas.propTypes = {
  is_fetching: PropTypes.bool,
  handleShowModal: PropTypes.func,
  handleHideModal: PropTypes.func,
  showModal: PropTypes.bool,
  eidas_sp_freja_idp_url: PropTypes.string
};

export default Eidas;
