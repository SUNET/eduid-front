import React from "react";
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
  if (!props.showModal) return null;

  return (
    <dialog open={props.showModal}>
      <div
        className={props.showModal ? "modal fade show" : "modal"}
        id={props.id}
        tabIndex={-1}
        aria-hidden={!props.showModal}
      >
        <div className={`modal-dialog ${props.id}`}>
          <div className={`modal-content ${props.id} `}>
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <EduIDButton id={`${props.id}-close-button`} buttonstyle="close" onClick={props.closeModal}></EduIDButton>
            </div>
            <div className="modal-body">{props.mainText}</div>
            <div className="modal-footer">
              <form onSubmit={() => props.acceptModal}>
                <EduIDButton
                  type="submit"
                  id={`${props.id}-accept-button`}
                  buttonstyle="primary"
                  onClick={props.acceptModal}
                >
                  {props.acceptButtonText}
                </EduIDButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default NotificationModal;
