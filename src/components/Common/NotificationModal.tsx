import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import EduIDButton from "./EduIDButton";

interface NotificationModalProps {
  readonly id: string;
  readonly title: React.ReactNode;
  readonly mainText: React.ReactNode;
  readonly showModal: boolean;
  readonly closeModal: React.MouseEventHandler<HTMLButtonElement>;
  readonly acceptModal: (event?: React.MouseEvent<HTMLElement>) => void;
  readonly acceptButtonText: React.ReactNode;
}

function NotificationModal(props: NotificationModalProps) {
  function handlePress(event: React.KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    if (event.key === "Enter") {
      props.acceptModal();
    }
  }

  return (
    <dialog>
      <div id={props.id} tabIndex={-1} onKeyDown={handlePress} aria-hidden="true" data-backdrop="true">
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
    </dialog>
  );
}

export default NotificationModal;
