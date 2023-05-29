import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import EduIDButton from "../../../components/EduIDButton";

interface NotificationModalProps {
  id: string;
  title: React.ReactNode;
  mainText: React.ReactNode;
  showModal: boolean;
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  acceptModal: (event?: React.MouseEvent<HTMLElement>) => void;
  acceptButtonText: React.ReactNode;
}

function NotificationModal(props: NotificationModalProps) {
  function handlePress(event: React.KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    if (event.key === "Enter") {
      props.acceptModal();
    }
  }

  return (
    <div id={props.id} tabIndex={-1} onKeyDown={handlePress} role="dialog" aria-hidden="true" data-backdrop="true">
      <Modal isOpen={props.showModal} className={props.id}>
        <ModalHeader>
          {props.title}
          <EduIDButton
            id={`${props.id}-close-button`}
            buttonstyle="close"
            className="float-right"
            onClick={props.closeModal}
          ></EduIDButton>
        </ModalHeader>
        <ModalBody>{props.mainText}</ModalBody>
        <ModalFooter>
          <EduIDButton id={`${props.id}-accept-button`} buttonstyle="primary" onClick={props.acceptModal}>
            {props.acceptButtonText}
          </EduIDButton>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NotificationModal;
