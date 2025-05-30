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
      <div className={props.showModal ? "modal fade show" : "modal"} id={props.id} tabIndex={-1}>
        <div className={`modal-dialog ${props.id}`}>
          <div className={`modal-content ${props.id} `}>
            <div className="modal-header">
              <h4 className="modal-title">{props.title}</h4>
              <EduIDButton
                type="button"
                id={`${props.id}-close-button`}
                buttonstyle="close"
                onClick={props.closeModal}
              ></EduIDButton>
            </div>
            <div className="modal-body">{props.mainText}</div>
            <div className="modal-footer">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (props.acceptModal) {
                    props.acceptModal();
                  }
                }}
              >
                <EduIDButton type="submit" id={`${props.id}-accept-button`} buttonstyle="primary">
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
