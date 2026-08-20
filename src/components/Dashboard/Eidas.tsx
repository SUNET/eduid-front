import { eidasApi } from "apis/eduidEidas";
import { EduIDButton } from "components/Common/EduIDButton";
import { NotificationModal } from "components/Common/NotificationModal";
import { FREJA_EID_FOREIGN_INSTRUCTION_URL_SV } from "helperFunctions/constants";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

// Temporary instructions until Sweden Connect has more alternatives and we have a DS
function FrejaInstructions() {
  return (
    <div id="freja-instructions">
      <ol>
        <li>
          <FormattedMessage description="eidas freja instructions step1" defaultMessage={`Install the app`} />
        </li>
        <li>
          <FormattedMessage
            description="eidas freja instructions step2"
            defaultMessage={`Create a Freja eID Plus account (awarded the "Svensk e-legitimation" quality mark)`}
          />
        </li>
        <li>
          <FormattedMessage
            description="eidas freja instructions step3"
            defaultMessage={`The app will generate a QR-code`}
          />
        </li>
        <li>
          <FormattedMessage
            description="eidas freja instructions step4"
            defaultMessage={`Find a local authorised agent, show them a valid ID together with the QR-code and 
              they will be able to verify your identity`}
          />
          <span>
            <FormattedMessage
              description="eidas freja instruction tip1"
              defaultMessage={`Tip: Use the app to find your nearest agent`}
            />
          </span>
        </li>
        <li>
          <FormattedMessage
            description="eidas freja instructions step5"
            defaultMessage={`Freja eID is now ready to be used with your eduID, proceed by clicking the button below `}
          />
        </li>
      </ol>
      <a href={FREJA_EID_FOREIGN_INSTRUCTION_URL_SV} target="_blank" rel="noreferrer">
        <FormattedMessage description="eidas freja instructions install link" defaultMessage={`What is Freja eID?`} />
      </a>
    </div>
  );
}

export function Eidas() {
  const [showModal, setShowModal] = useState(false);
  const [eidasVerifyIdentity] = eidasApi.useLazyEidasVerifyIdentityQuery();

  async function useFrejaeID() {
    const response = await eidasVerifyIdentity({ method: "freja" });
    if (response.isSuccess) {
      if (response.data.payload.location) {
        globalThis.location.assign(response.data.payload.location);
      }
    }
  }

  return (
    <>
      <p>
        <FormattedMessage
          description="eidas proofing help text"
          defaultMessage={`To use this option you will need to first create a digital ID in the 
            {freja_eid_link} app.`}
          values={{
            freja_eid_link: (
              <a href={FREJA_EID_FOREIGN_INSTRUCTION_URL_SV} target="_blank" rel="noreferrer">
                Freja
              </a>
            ),
          }}
        />
      </p>

      <EduIDButton buttonstyle="primary sm" onClick={() => setShowModal(true)} aria-label="Proceed with Freja eID">
        <FormattedMessage defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>

      <NotificationModal
        id="eidas-info-modal"
        title={
          <FormattedMessage
            description="eidas modal title"
            defaultMessage={`Use Freja eID+ and pass a local authorised agent`}
          />
        }
        mainText={<FrejaInstructions />}
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
        acceptModal={useFrejaeID}
        acceptButtonText={<FormattedMessage description="eidas freja eid ready" defaultMessage={`Use my Freja eID`} />}
      />
    </>
  );
}
