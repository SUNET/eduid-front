import React from "react";
import { EduIDButton } from "./EduIDButton";

interface NotificationModalProps {
  id: string;
  title: React.ReactNode;
  mainText: React.ReactNode;
  showModal: boolean;
  closeModal: React.MouseEventHandler<HTMLButtonElement>;
  acceptModal: (event?: React.MouseEvent<HTMLElement>) => void;
  acceptButtonText: React.ReactNode;
}

export function NotificationModal({
  id,
  title,
  mainText,
  showModal,
  closeModal,
  acceptModal,
  acceptButtonText,
}: Readonly<NotificationModalProps>) {
  if (!showModal) return null;

  return (
    <dialog open={showModal}>
      <div className={showModal ? "modal fade show" : "modal"} id={id} tabIndex={-1}>
        <div className={`modal-dialog horizontal-content-margin ${id}`}>
          <div className={`modal-content ${id} `}>
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
              <EduIDButton
                type="button"
                id={`${id}-close-button`}
                buttonstyle="close"
                onClick={closeModal}
              ></EduIDButton>
            </div>
            <div className="modal-body">{mainText}</div>
            <div className="modal-footer">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (acceptModal) {
                    acceptModal();
                  }
                }}
              >
                <EduIDButton type="submit" id={`${id}-accept-button`} buttonstyle="primary">
                  {acceptButtonText}
                </EduIDButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
