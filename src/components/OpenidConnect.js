
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EduIDButton from 'components/EduIDButton';
import NotificationsContainer from 'containers/Notifications';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Well from 'react-bootstrap/lib/Well';
import Image from 'react-bootstrap/lib/Image';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import CookieChecker from "components/CookieChecker";

import 'style/OpenidConnect.scss';


class OpenidConnect extends Component {

  render () {
    let spinning = false;

    if (this.props.is_fetching) spinning = true;

    const seleg_instructions = (
      <Well id="openid-connect-seleg-instructions">
        <ol>
          <li>{this.props.l10n('oc.instructions_step_1')}</li>
          <li>{this.props.l10n('oc.instructions_step_2')}</li>
          <li>{this.props.l10n('oc.instructions_step_3')}</li>
        </ol>
      </Well>
    );

    return (
      <CookieChecker cookieName="show-se-leg">
      <div>
        <form id="openid-connect-form"
              className="form-horizontal"
              role="form">
          <fieldset id="openid-connect">
            <EduIDButton bsStyle="primary"
                         spinning={spinning}
                         disabled={this.props.disabled}
                         onClick={this.props.handleShowModal}
                         block>
              {this.props.l10n('oc.initialize_proofing')}
            </EduIDButton>
            <HelpBlock>{this.props.l10n('oc.initialize_proofing_help_text')}</HelpBlock>
          </fieldset>
        </form>

        <div id="openid-connect-seleg-info-dialog"
             tabIndex="-1"
             role="dialog"
             aria-labelledby="askDialogPrompt"
             aria-hidden="true"
             data-backdrop="true">

          <Modal show={this.props.showModal} id="openid-connect-seleg-modal">
            <Modal.Header>
              <Modal.Title>{this.props.l10n('oc.modal_title')}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <h4>{this.props.l10n('oc.instructions_title')}</h4>
              {seleg_instructions}
              <NotificationsContainer/>

              <Image src={this.props.qr_img} className="img-responsive center-block" alt={this.props.qr_code} />

            </Modal.Body>

            <Modal.Footer>
              <Button className="finish-button"
                      id="openid-connect-seleg-hide-modal"
                      onClick={this.props.handleHideModal}>
                {this.props.l10n('cm.close')}
              </Button>
            </Modal.Footer>

          </Modal>
        </div>
      </div>
      </CookieChecker>
    );
  }
}

OpenidConnect.propTypes = {
  disabled: PropTypes.bool,
  qr_img: PropTypes.string,
  qr_code: PropTypes.string,
  is_fetching: PropTypes.bool,
  handleShowModal: PropTypes.func,
  handleHideModal: PropTypes.func,
  showModal: PropTypes.bool
}

export default OpenidConnect;
