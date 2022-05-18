import React, { useState } from "react";
import NotificationModal from "../login/components/Modals/NotificationModal";
import { FormattedMessage } from "react-intl";
import { useDashboardAppSelector } from "dashboard-hooks";

function Eidas(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);
  const config = useDashboardAppSelector((state) => state.config);
  let eidas_sp_url = config.eidas_url;
  const freja_idp_url = config.token_verify_idp;
  const verify_path = "verify-nin";
  if (eidas_sp_url && !eidas_sp_url.endsWith("/")) {
    eidas_sp_url = eidas_sp_url.concat("/");
  }
  const eidas_sp_freja_idp_url = eidas_sp_url + verify_path + "?idp=" + freja_idp_url;

  // Temporary instructions until Sweden Connect has more alternatives and we have a DS
  const freja_instructions = (
    <div id="freja-instructions">
      <ol>
        <li>{<FormattedMessage description="eidas freja instructions step1" defaultMessage={`Install the app`} />}</li>
        <li>
          {
            <FormattedMessage
              description="eidas freja instructions step2"
              defaultMessage={`Create a Freja eID Plus account (awarded the "Svensk e-legitimation" quality mark)`}
            />
          }
        </li>
        <li>
          {
            <FormattedMessage
              description="eidas freja instructions step3"
              defaultMessage={`The app will generate a QR-code`}
            />
          }
        </li>
        <li>
          {
            <FormattedMessage
              description="eidas freja instructions step4"
              defaultMessage={`Find a local authorised agent, show them a valid ID together with the QR-code and 
              they will be able to verify your identity`}
            />
          }
        </li>
        <label>
          {
            <FormattedMessage
              description="eidas freja instruction tip1"
              defaultMessage={`Tip: Use the app to find your nearest agent`}
            />
          }
        </label>
        <li>
          {
            <FormattedMessage
              description="eidas freja instructions step5"
              defaultMessage={`Freja eID is now ready to be used with your eduID`}
            />
          }
        </li>
      </ol>
      <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">
        {<FormattedMessage description="eidas freja instructions install link" defaultMessage={`What is Freja eID?`} />}
      </a>
    </div>
  );

  function useFrejaeID(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    window.location.href = eidas_sp_freja_idp_url;
  }

  return (
    <React.Fragment>
      <div className="vetting-button">
        <button
          id="eidas-show-modal"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <div className="text">
            {
              <FormattedMessage
                description="verify identity vetting freja tagline"
                defaultMessage={`For you able to create a Freja eID+ by visiting one of the authorised agents`}
              />
            }
          </div>

          <div className="name">
            {<FormattedMessage description="eidas vetting button freja" defaultMessage={`with a digital ID-card`} />}
          </div>
        </button>
      </div>
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
    </React.Fragment>
  );
}

export default Eidas;
