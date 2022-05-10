import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import EduIDButton from "../../../components/EduIDButton";
import { FormattedMessage } from "react-intl";

interface NotificationModalProps {
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  acceptModal: React.MouseEventHandler<HTMLButtonElement>;
  modalId: string;
  mainText: React.ReactNode;
  acceptButtonId?: string;
  showModal: boolean;
  href?: any;
  title: React.ReactNode;
  closeButtonId?: string;
}

function NotificationModal(props: NotificationModalProps) {
  return (
    <div id={props.modalId} tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="true">
      <Modal isOpen={props.showModal} className={props.modalId}>
        <ModalHeader>
          {props.title}
          <EduIDButton
            id={props.closeButtonId}
            buttonstyle="close"
            className="float-right"
            onClick={props.closeModal}
          ></EduIDButton>
        </ModalHeader>
        {/* {props.modalId !== "register-modal" ? ( */}
        <ModalBody>{props.mainText}</ModalBody>
        {/* ) : (
          <ModalBody dangerouslySetInnerHTML={{ __html: props.mainText }} />
        )} */}
        <ModalFooter>
          {!props.href ? (
            <EduIDButton id={props.acceptButtonId} buttonstyle="primary" onClick={props.acceptModal}>
              <FormattedMessage defaultMessage="accept" description="accept button" />
            </EduIDButton>
          ) : (
            <EduIDButton
              id={props.acceptButtonId}
              buttonstyle="primary"
              onClick={props.href}
              // href={props.href}
            >
              <FormattedMessage defaultMessage="accept" description="accept button" />
            </EduIDButton>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NotificationModal;
