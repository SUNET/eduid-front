import React from "react";
import { Form as FinalForm } from "react-final-form";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import EduIDButton from "../../../components/EduIDButton";

interface NotificationModalProps {
  id: string;
  title: React.ReactNode;
  mainText: React.ReactNode;
  showModal: boolean;
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  acceptModal: React.MouseEventHandler<HTMLButtonElement>;
  acceptButtonText: React.ReactNode;
}

function NotificationModal(props: NotificationModalProps) {
  return (
    <div id={props.id} tabIndex={-1} role="dialog" aria-hidden="true" data-backdrop="true">
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
          <FinalForm
            onSubmit={props.acceptModal}
            {...props}
            render={({ handleSubmit }) => {
              return (
                <form id={props.id + "-form"} role="form" onSubmit={handleSubmit} method="post">
                  <EduIDButton
                    id={`${props.id}-accept-button`}
                    type="submit"
                    buttonstyle="primary"
                    onClick={handleSubmit}
                    form={props.id + "-form"}
                  >
                    {props.acceptButtonText}
                  </EduIDButton>
                </form>
              );
            }}
          ></FinalForm>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default NotificationModal;
