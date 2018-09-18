
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import i18n from 'i18n-messages';
import TextInput from 'components/EduIDTextInput';
import EduIDButton from 'components/EduIDButton';
import NotificationsContainer from 'containers/Notifications';


const getConfirmForm = inputName => {

    const validate = values => {
        const errors = {},
            code = values[inputName];
        if (!code) {
            errors[inputName] = 'required';
        }
        return errors;
    };

    let ConfirmForm = props => {

        let spinning = false;
        if (props.is_fetching) spinning = true;

        let resendMarkup = '';
        if (props.with_resend_link) {
            resendMarkup = (
                <div>
                    {props.resendHelp} <a href="#" onClick={props.handleResend}className="resend-code">{props.resendText}</a>
                </div>
            );
        }

        return (
            <form id={inputName + '-form'}
                  className="form-horizontal"
                  role="form">
                <Modal.Header>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <NotificationsContainer />
                    <div id="confirmation-code-area">
                        <Field component={TextInput}
                               componentClass="input"
                               type="text"
                               label={props.resendLabel}
                               placeholder={props.placeholder}
                               controlId={inputName}
                               name={inputName} />
                        {resendMarkup}
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="cancel-button"
                            onClick={props.closeModal} >
                         {props.l10n('cm.cancel')}
                    </Button>
                    <EduIDButton bsStyle="primary"
                          className="ok-button"
                          spinning={spinning}
                          disabled={props.invalid}
                          onClick={props.handleConfirm} >
                        {props.l10n('cm.ok')}
                    </EduIDButton>
                </Modal.Footer>
            </form>
        );
    };

    ConfirmForm = reduxForm({
      form: inputName + '-form',
      validate
    })(ConfirmForm);
    
    return ConfirmForm;
}


class ConfirmModal extends Component {

  render () {
    const ConfirmForm = getConfirmForm(this.props.controlId);
    return (
      <div id={this.props.modalId}
           tabIndex="-1"
           role="dialog"
           aria-labelledby="askDialogPrompt"
           aria-hidden="true"
           data-backdrop="true">
          <Modal show={this.props.showModal}>
              <ConfirmForm {...this.props} />
          </Modal>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  placeholder: PropTypes.string,
  handleConfirm: PropTypes.func,
  confirming: PropTypes.string,
  handleResend: PropTypes.func,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  is_fetching: PropTypes.bool,
  with_resend_link: PropTypes.bool
};

ConfirmModal.defaultProps = {
  with_resend_link: true
};

export default i18n(ConfirmModal);

