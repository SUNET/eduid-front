import EduIDButton from "components/Common/EduIDButton";
import NotificationModal from "components/Common/NotificationModal";
import { Fragment, useState } from "react";
import { FormattedMessage } from "react-intl";
import { eidasApi } from "services/eidas";

function Eidas(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [eidasVerifyIdentity_trigger] = eidasApi.useLazyEidasVerifyIdentityQuery();

  // Temporary instructions until Sweden Connect has more alternatives and we have a DS
  const freja_instructions = (
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
      <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">
        <FormattedMessage description="eidas freja instructions install link" defaultMessage={`What is Freja eID?`} />
      </a>
    </div>
  );

  async function useFrejaeID() {
    const response = await eidasVerifyIdentity_trigger({ method: "freja" });
    if (response.isSuccess) {
      if (response.data.payload.location) {
        window.location.assign(response.data.payload.location);
      }
    }
  }

  return (
    <Fragment>
      <p className="proofing-btn-help">
        <FormattedMessage
          description="eidas proofing help text"
          defaultMessage={`To use this option you will need to first create a digital ID in the 
            {freja_eid_link} app.`}
          values={{
            freja_eid_link: (
              <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">
                Freja
              </a>
            ),
          }}
        />
      </p>

      <EduIDButton buttonstyle="primary sm" onClick={() => setShowModal(true)}>
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
        mainText={freja_instructions}
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
        acceptModal={useFrejaeID}
        acceptButtonText={<FormattedMessage description="eidas freja eid ready" defaultMessage={`Use my Freja eID`} />}
      />
    </Fragment>
  );
}

export default Eidas;
