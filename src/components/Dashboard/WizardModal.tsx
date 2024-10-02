import EduIDButton from "components/Common/EduIDButton";
import { Security } from "components/Common/Security";
import { useAppSelector } from "eduid-hooks";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useMultiStepForm } from "useMultiStepFrom";
import { VerificationMethod } from "./VerifyIdentity";

function WizardModal(): JSX.Element {
  const [data, setData] = useState(true);
  const [showModal, setShowModal] = useState(true);

  const nin = useAppSelector((state) => state.personal_data.response?.identities?.nin?.verified);
  const credentials = useAppSelector((state) => state.security.credentials);

  function updateFields(fields: Partial<FormData>) {
    // setData((prev) => {
    //   return { ...prev, ...fields };
    // });
  }

  let steps: Element = [];

  if (!nin) {
    steps.push(<VerificationMethod />);
  }
  if (credentials.length < 2) {
    steps.push(<Security />);
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultiStepForm([steps]);

  function onSubmit(e: any) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("Successful Account Creation");
  }
  return (
    <Modal id="confirm-user-data-modal" isOpen={showModal} autoFocus={false}>
      <ModalHeader>
        <EduIDButton buttonstyle="close" onClick={() => setShowModal(!showModal)}></EduIDButton>
      </ModalHeader>
      <ModalBody>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              {currentStepIndex + 1} / {steps.length}
            </div>
            {step}
            <div>
              {!isFirstStep && (
                <EduIDButton buttonstyle="primary" onClick={back}>
                  Back
                </EduIDButton>
              )}
              <EduIDButton buttonstyle="primary" type="submit">
                {isLastStep ? "Finish" : "Next"}
              </EduIDButton>
            </div>
          </form>
        </div>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
}

export default WizardModal;
