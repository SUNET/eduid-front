import { lookupMobileProofing } from "apis/eduidLookupMobileProofing";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { translate } from "login/translation";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "reducers/Notifications";
import NotificationModal from "../Modals/NotificationModal";
import { HashLink } from "react-router-hash-link";

interface LookupMobileProofingProps {
  disabled: boolean;
}

function LookupMobileProofing(props: LookupMobileProofingProps): JSX.Element {
  const nin = useDashboardAppSelector((state) => state.identities.nin);
  const phones = useDashboardAppSelector((state) => state.phones.phones);
  const dispatch = useDashboardAppDispatch();
  const [showModal, setShowModal] = useState(false);

  const withoutNin = !nin;
  const withoutPhoneNumber = !phones.length;
  const unverifiedNumber = !phones.some((num) => num.verified === true);
  const nonSweNumber = !phones.some((num) => num.number.startsWith("+46"));

  function handleShowModal() {
    dispatch(clearNotifications());
    setShowModal(true);
  }
  function handleCloseModal() {
    dispatch(clearNotifications());
    setShowModal(false);
  }
  function handleLookupMobile() {
    setShowModal(false);

    if (nin && !nin.verified) {
      dispatch(lookupMobileProofing(nin.number));
    }
  }

  const linkToSettings = (
    <HashLink key="1" to={"/profile/settings/#phone"}>
      {translate("verify-identity.vetting_link_settings")}
    </HashLink>
  );

  const explanationText = (
    <div className="explanation-link">
      {
        /* if user not added id number, text will help the user to add id number */
        withoutNin ? (
          translate("verify-identity.vetting_explanation_add_nin")
        ) : /* else if, without phone number text will help the user to add phone number and
            the text "setting" is linked to the setting page phone number section */
        withoutPhoneNumber ? (
          <>
            {" "}
            {translate("verify-identity.vetting_explanation_add_phone_number")} {linkToSettings}
          </>
        ) : /* else if, unverified phone number, text will help the user to confirm phone number and
            the text "setting" is linked to the setting page phone number section */
        unverifiedNumber ? (
          <>
            {" "}
            {translate("verify-identity.vetting_explanation_confirm_phone_number")} {linkToSettings}
          </>
        ) : /* else if, the verified phone number is not a Swedish number, description text show "only available with Swedish number" */
        nonSweNumber ? (
          translate("verify-identity.vetting_explanation_only_available_swe_number")
        ) : null
      }
    </div>
  );

  return (
    <div key="0">
      <div key="0" className="vetting-button">
        <button disabled={props.disabled} onClick={handleShowModal}>
          <div key="1" className="text">
            {translate("verify-identity.vetting_phone_tagline")}
            {explanationText}
          </div>
          <div key="2" className="name">
            {translate("lmp.button_text_request")}
          </div>
        </button>
        <p className={"proofing-btn-help" + (props.disabled === true ? " disabled" : "")}>
          <FormattedMessage
            description="lmp initialize proofing help text"
            defaultMessage={`The phone number registry is maintained by phone operators at their convenience and may not
            include all registered phone numbers.`}
          />
        </p>
      </div>
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
            If they have not added your details, we won't be able to find you and you need to choose another way
            to verify your identity.`}
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
