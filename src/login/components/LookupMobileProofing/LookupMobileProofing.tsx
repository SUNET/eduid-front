import { lookupMobileProofing } from "apis/eduidLookupMobileProofing";
import { fetchIdentities, requestAllPersonalData } from "apis/eduidPersonalData";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { HashLink } from "react-router-hash-link";
import { clearNotifications } from "reducers/Notifications";
import NotificationModal from "../Modals/NotificationModal";

interface LookupMobileProofingProps {
  disabled: boolean;
}

function LookupMobileProofing(props: LookupMobileProofingProps): JSX.Element {
  const nin = useDashboardAppSelector((state) => state.identities.nin);
  const phones = useDashboardAppSelector((state) => state.phones.phones);
  const dispatch = useDashboardAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const withoutNin = !nin;
  const withoutPhoneNumber = Boolean(!phones);
  const unverifiedNumber = phones?.some((num) => num.verified === false);
  const nonSweNumber = !phones.some((num) => num.number.startsWith("+46"));

  function handleShowModal() {
    dispatch(clearNotifications());
    setShowModal(true);
  }
  function handleCloseModal() {
    dispatch(clearNotifications());
    setShowModal(false);
  }
  async function handleLookupMobile() {
    setShowModal(false);
    if (nin && !nin.verified) {
      const response = await dispatch(lookupMobileProofing(nin.number));
      if (lookupMobileProofing.fulfilled.match(response)) {
        dispatch(requestAllPersonalData());
      } else if (lookupMobileProofing.rejected.match(response)) {
        dispatch(fetchIdentities());
      }
    }
  }

  const linkToSettings = (
    <HashLink key="1" to={"/profile/settings/#phone"}>
      <FormattedMessage defaultMessage="Settings" description="verify identity vetting link settings" />
    </HashLink>
  );

  const explanationText = (
    <React.Fragment>
      {
        /* if user not added id number, text will help the user to add id number */
        withoutNin ? (
          <FormattedMessage
            defaultMessage="Start by adding your ID number above"
            description="verify identity vetting explanation add nin"
          />
        ) : /* else if, without phone number text will help the user to add phone number and
            the text "setting" is linked to the setting page phone number section */
        withoutPhoneNumber ? (
          <React.Fragment>
            <FormattedMessage
              defaultMessage="Start by adding your Swedish phone number in"
              description="verify identity vetting explanation add phone number"
            />
            &nbsp;{linkToSettings}
          </React.Fragment>
        ) : /* else if, unverified phone number, text will help the user to confirm phone number and
            the text "setting" is linked to the setting page phone number section */
        unverifiedNumber ? (
          <React.Fragment>
            <FormattedMessage
              defaultMessage="Confirm your phone number in"
              description="verify identity vetting explanation confirm phone number"
            />
            &nbsp;{linkToSettings}
          </React.Fragment>
        ) : /* else if, the verified phone number is not a Swedish number, description text show "only available with Swedish number" */
        nonSweNumber ? (
          <FormattedMessage
            defaultMessage="Only possible with Swedish phone number"
            description="verify identity vetting explanation only available swe number"
          />
        ) : null
      }
    </React.Fragment>
  );

  return (
    <div key="0">
      <p className="proofing-btn-help">
        {
          <FormattedMessage
            defaultMessage="For Swedish phone numbers entered and confirmed in eduID."
            description="verify identity vetting phone tagline"
          />
        }
      </p>
      <p>{explanationText}</p>
      <EduIDButton disabled={props.disabled} buttonstyle="primary" size="sm" onClick={() => handleShowModal()}>
        <FormattedMessage defaultMessage="Proceed" description="button proceed" />
      </EduIDButton>

      {/* notificationModal will only opens when user are able to verify identity by phone */}
      <NotificationModal
        id="mobile-confirm-modal"
        title={
          <FormattedMessage
            defaultMessage="Check if your phone number is connected to your id number."
            description="lmp.modal_confirm_title"
          />
        }
        mainText={
          <FormattedMessage
            defaultMessage={`This check will be done in a registry updated by the phone operators.
            If it doesn't find your details you need to choose another way to verify your identity.`}
            description="lmp.confirm_info"
          />
        }
        showModal={showModal}
        closeModal={handleCloseModal}
        acceptModal={handleLookupMobile}
        acceptButtonText={<FormattedMessage defaultMessage="Accept" description="accept button" />}
      />
    </div>
  );
}

export default LookupMobileProofing;
