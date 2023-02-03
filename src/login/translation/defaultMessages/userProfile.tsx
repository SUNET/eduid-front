import { FormattedMessage } from "react-intl";

export const userProfile = {
  // profile page
  "profile.phone_display_unconfirmed_data": (
    <FormattedMessage id="profile.phone_display_unconfirmed_data" defaultMessage={`confirm added number`} />
  ),

  "profile.phone_display_non-primary_data": (
    <FormattedMessage id="profile.phone_display_non-primary_data" defaultMessage={`make number primary`} />
  ),

  "dashboard.tagline_unverified": (
    <FormattedMessage
      id="dashboard.tagline_unverified"
      defaultMessage={`Don't forget to connect your identity to eduID`}
    />
  ),

  "dashboard.tagline_verified": (
    <FormattedMessage id="dashboard.tagline_verified" defaultMessage={`Make eduID more secure`} />
  ),

  /* ----- verifyIdentity  ------- */

  "verify-identity.verified_pw_reset_extra_security": (
    <FormattedMessage
      id="verify-identity.verified_pw_reset_extra_security"
      defaultMessage={`Add a phone number or a security key to your eduID to keep your identity at password reset.`}
    />
  ),

  "verify-identity.verified_main_title": (
    <FormattedMessage id="verify-identity.verified_main_title" defaultMessage={`Your eduID is ready to use`} />
  ),

  "verify-identity.vetting_phone_tagline": (
    <FormattedMessage
      id="verify-identity.vetting_phone_tagline"
      defaultMessage={`For Swedish phone numbers entered and confirmed in eduID.`}
    />
  ),

  "verify-identity.vetting_explanation_add_nin": (
    <FormattedMessage
      id="verify-identity.vetting_explanation_add_nin"
      defaultMessage={`Start by adding your ID number above`}
    />
  ),

  "verify-identity.vetting_explanation_add_phone_number": (
    <FormattedMessage
      id="verify-identity.vetting_explanation_add_phone_number"
      defaultMessage={`Start by adding your Swedish phone number in\n`}
    />
  ),

  "verify-identity.vetting_explanation_confirm_phone_number": (
    <FormattedMessage
      id="verify-identity.vetting_explanation_confirm_phone_number"
      defaultMessage={`Confirm your phone number in\n`}
    />
  ),

  "verify-identity.vetting_link_settings": (
    <FormattedMessage id="verify-identity.vetting_link_settings" defaultMessage={`Settings`} />
  ),

  "verify-identity.vetting_explanation_only_available_swe_number": (
    <FormattedMessage
      id="verify-identity.vetting_explanation_only_available_swe_number"
      defaultMessage={`Only possible with Swedish phone number`}
    />
  ),

  "verify-identity.vetting_freja_tagline": (
    <FormattedMessage
      id="verify-identity.vetting_freja_tagline"
      defaultMessage={`For you able to create a Freja eID by visiting one of the authorised agents`}
    />
  ),
};

export const userVetting = {
  /* ----- LETTER PROOFING  ------- */
  "letter.button_text_code": <FormattedMessage id="letter.button_text_code" defaultMessage={`Enter code here`} />,

  "letter.no_state_found": <FormattedMessage id="letter.no_state_found" defaultMessage={`No state found`} />,

  "letter.letter_sent_msg": (
    <FormattedMessage id="letter.letter_sent_msg" defaultMessage={`You have been sent a verification letter`} />
  ),

  "letter.already-sent": (
    <FormattedMessage id="letter.already-sent" defaultMessage={`You have already been sent a verification letter`} />
  ),

  "letter.no-address-found": (
    <FormattedMessage id="letter.no-address-found" defaultMessage={`No postal address found`} />
  ),

  "letter.bad-postal-address": (
    <FormattedMessage
      id="letter.bad-postal-address"
      defaultMessage={`The registered postal address is not a valid address`}
    />
  ),

  "letter.saved-unconfirmed": (
    <FormattedMessage id="letter.saved-unconfirmed" defaultMessage={`A letter with a code has been sent.`} />
  ),

  "letter.wrong-code": <FormattedMessage id="letter.wrong-code" defaultMessage={`Incorrect code`} />,

  "letter.verification_success": (
    <FormattedMessage id="letter.verification_success" defaultMessage={`Successfully verified national id number`} />
  ),

  "letter.not-sent": (
    <FormattedMessage id="letter.not-sent" defaultMessage={`Letter send request failed. Please try again.`} />
  ),

  /* ----- Phone Subscription ------- */

  "lmp.button_text_request": <FormattedMessage id="lmp.button_text_request" defaultMessage={`by phone`} />,

  "lmp.button_text_code": <FormattedMessage id="lmp.button_text_code" defaultMessage={`Enter code here`} />,

  "lmp.initialize_proofing_help_text_tip_1": (
    <FormattedMessage
      id="lmp.initialize_proofing_help_text_tip_1"
      defaultMessage={`Tip: The registry is updated by phone operators at their convenience and may not include all registered phone numbers`}
    />
  ),

  /* ----- confirmed number > ready for vetting------- */

  "lmp.verification_success": (
    <FormattedMessage
      id="lmp.verification_success"
      defaultMessage={`Your national id number has been successfully verified`}
    />
  ),

  /* ----- FREJA------- */

  "eidas.modal_title": (
    <FormattedMessage id="eidas.modal_title" defaultMessage={`Use Freja eID+ and pass a local authorised agent`} />
  ),
  "eidas.freja_instructions_step1": (
    <FormattedMessage id="eidas.freja_instructions_step1" defaultMessage={`Install the app`} />
  ),

  "eidas.freja_instructions_step2": (
    <FormattedMessage
      id="eidas.freja_instructions_step2"
      defaultMessage={`Create a Freja eID Plus account (awarded the ‘Svensk e-legitimation’ quality mark)`}
    />
  ),

  "eidas.freja_instructions_step3": (
    <FormattedMessage id="eidas.freja_instructions_step3" defaultMessage={`The app will generate a QR-code`} />
  ),

  "eidas.freja_instructions_step4": (
    <FormattedMessage
      id="eidas.freja_instructions_step4"
      defaultMessage={`Find a local authorised agent, show them a valid ID together with the QR-code and they will be able to verify your identity`}
    />
  ),

  "eidas.freja_instructions_tip1": (
    <FormattedMessage
      id="eidas.freja_instructions_tip_1"
      defaultMessage={`Tip: Use the app to find your nearest agent`}
    />
  ),

  "eidas.freja_instructions_step5": (
    <FormattedMessage
      id="eidas.freja_instructions_step5"
      defaultMessage={`Freja eID is now ready to be used with your eduID`}
    />
  ),
  "eidas.freja_instructions_install_link": (
    <FormattedMessage id="eidas.freja_instructions_install_link" defaultMessage={`What is Freja eID?`} />
  ),

  "eidas.token_not_found": <FormattedMessage id="eidas.token_not_found" defaultMessage={`U2F token not found`} />,

  "eidas.token_not_in_credentials_used": (
    <FormattedMessage id="eidas.token_not_in_credentials_used" defaultMessage={`U2F token not used for login`} />
  ),

  "eidas.nin_not_matching": (
    <FormattedMessage
      id="eidas.nin_not_matching"
      defaultMessage={`The identity does not match the one verified for this eduID`}
    />
  ),

  "eidas.nin_already_verified": (
    <FormattedMessage id="eidas.nin_already_verified" defaultMessage={`You have already verified your identity`} />
  ),

  "eidas.nin_verify_success": (
    <FormattedMessage id="eidas.nin_verify_success" defaultMessage={`Identity verified successfully`} />
  ),

  "eidas.token_verify_success": (
    <FormattedMessage id="eidas.token_verify_success" defaultMessage={`U2F token verified successfully`} />
  ),

  "eidas.authn_context_mismatch": (
    <FormattedMessage id="eidas.authn_context_mismatch" defaultMessage={`Wrong authentication context received`} />
  ),

  "eidas.reauthn_expired": (
    <FormattedMessage id="eidas.reauthn_expired" defaultMessage={`Authentication has expired. Please try again.`} />
  ),

  /* ----- OIDC SE-LEG ------- */

  "oc.initialize_proofing": <FormattedMessage id="oc.initialize_proofing" defaultMessage={`SE-LEG`} />,

  "oc.initialize_proofing_help_text": (
    <FormattedMessage
      id="oc.initialize_proofing_help_text"
      defaultMessage={`To use this option you need to visit a {seleg_info_link} and show identification.`}
      values={{
        seleg_info_link: (
          <a href="https://www.sunet.se/samarbeten/projekt-nationell-tjanst-for-grundidentifiering/" target="_blank">
            SE-LEG RA
          </a>
        ),
      }}
    />
  ),

  "oc.modal_title": <FormattedMessage id="oc.modal_title" defaultMessage={`Confirm using SE-LEG`} />,

  "oc.instructions_title": (
    <FormattedMessage id="oc.instructions_title" defaultMessage={`How to confirm your account using SE-LEG`} />
  ),

  "oc.instructions_step_1": (
    <FormattedMessage id="oc.instructions_step_1" defaultMessage={`Visit the nearest library on this list:`} />
  ),

  "oc.instructions_step_2": (
    <FormattedMessage
      id="oc.instructions_step_2"
      defaultMessage={`Bring your chosen form of ID and the QR code below and ask the librarian for a verification of your eduID account.`}
    />
  ),

  "oc.instructions_step_3": (
    <FormattedMessage
      id="oc.instructions_step_3"
      defaultMessage={`Within a couple of hours you account should be verified.`}
    />
  ),

  /* ----- OIDC FREJA------- */

  "ocf.initialize_proofing": <FormattedMessage id="ocf.initialize_proofing" defaultMessage={`with Freja eID`} />,

  "ocf.initialize_proofing_help_text": (
    <FormattedMessage
      id="ocf.initialize_proofing_help_text"
      defaultMessage={`To use this option you need to have the {skaffa_freja_eid_link} app installed on your device.`}
      values={{
        skaffa_freja_eid_link: (
          <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">
            Freja eID
          </a>
        ),
      }}
    />
  ),

  "ocf.modal_title": <FormattedMessage id="ocf.modal_title" defaultMessage={`Confirm using Freja eID`} />,

  "ocf.freja_instructions_title": (
    <FormattedMessage
      id="ocf.freja_instructions_title"
      defaultMessage={`How to confirm your account using Freja eID`}
    />
  ),

  "ocf.freja_instructions_step_1": (
    <FormattedMessage
      id="ocf.freja_instructions_step_1"
      defaultMessage={`Install the Freja eID app on your mobile device.`}
    />
  ),

  "ocf.freja_instructions_step_2": (
    <FormattedMessage
      id="ocf.freja_instructions_step_2"
      defaultMessage={`Open the app and follow the instructions to reach Freja eID+ (Plus) status.`}
    />
  ),

  "ocf.freja_instructions_step_3": (
    <FormattedMessage
      id="ocf.freja_instructions_step_3"
      defaultMessage={`Bring your chosen form of ID to an authorized agent and ask them to scan the QR-code in the Freja eID app. There is a map function in the Freja eID app to help you locate your nearest agent.`}
    />
  ),

  "ocf.freja_instructions_step_4": (
    <FormattedMessage
      id="ocf.freja_instructions_step_4"
      defaultMessage={`Return here using your mobile phone and click the link at the bottom of the page. The app will open.`}
    />
  ),

  "ocf.freja_instructions_step_5": (
    <FormattedMessage
      id="ocf.freja_instructions_step_5"
      defaultMessage={`Approve that Freja eID sends your personal identity number to eduID. Done!`}
    />
  ),

  "ocf.freja_instructions_install_link": (
    <FormattedMessage id="ocf.freja_instructions_install_link" defaultMessage={`I need to install Freja eID`} />
  ),

  "ocf.open_app": <FormattedMessage id="ocf.open_app" defaultMessage={`I have Freja eID installed`} />,

  "ocf.not_on_mobile_title": <FormattedMessage id="ocf.not_on_mobile_title" defaultMessage={`Not using your phone?`} />,

  "ocf.not_on_mobile_message": (
    <FormattedMessage
      id="ocf.not_on_mobile_message"
      defaultMessage={`You need to switch to a mobile device (iOS or Android) with {skaffa_freja_eid_link} installed before you will be able to confirm your account using Freja eID.`}
      values={{
        skaffa_freja_eid_link: (
          <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">
            Freja eID
          </a>
        ),
      }}
    />
  ),
};

export const userData = {
  // nins
  "add_nin.main_title": <FormattedMessage id="add_nin.main_title" defaultMessage={`1. Add your id number`} />,

  /* ----- NINDISPLAY ------- */
  "nin_display.verify-identity_unverified_main_title": (
    <FormattedMessage
      id="nin_display.verify-identity_unverified_main_title"
      defaultMessage={`1. Your added id number`}
    />
  ),

  "nin_display.verify-identity_verified_main_title": (
    <FormattedMessage id="nin_display.verify-identity_verified_main_title" defaultMessage={`id number`} />
  ),

  "nins.invalid_nin": <FormattedMessage id="nins.invalid_nin" defaultMessage={`Invalid national id number`} />,

  "nins.wrong_length": (
    <FormattedMessage id="nins.wrong_length" defaultMessage={`A national id number must have 12 digits`} />
  ),

  "nins.illegal_chars": (
    <FormattedMessage id="nins.illegal_chars" defaultMessage={`A national id number can only have digits`} />
  ),

  "nins.valid_nin": <FormattedMessage id="nins.valid_nin" defaultMessage={`Valid national id number`} />,

  "nins.successfully_added": (
    <FormattedMessage id="nins.successfully_added" defaultMessage={`Your id number was added.`} />
  ),

  "nins.only_one_to_verify": (
    <FormattedMessage
      id="nins.only_one_to_verify"
      defaultMessage={`You can only have one unverified national id number to verify it. Please remove the unwanted ones.`}
    />
  ),

  "nins.success_removal": (
    <FormattedMessage id="nins.success_removal" defaultMessage={`Successfully removed national id number`} />
  ),

  "nins.no-mobile-match": (
    <FormattedMessage
      id="nins.no-mobile-match"
      defaultMessage={`No phone number matching the given national id number`}
    />
  ),

  "nins.verified_no_rm": (
    <FormattedMessage id="nins.verified_no_rm" defaultMessage={`You cannot remove your verified national id number`} />
  ),

  //phone numbers
  "phone.phone_duplicated": <FormattedMessage id="phone_duplicated" defaultMessage={`Added number is duplicated`} />,

  "phone.phone_format": (
    <FormattedMessage
      id="phone_format"
      defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 6-20 digits.`}
    />
  ),

  "still-valid-code": (
    <FormattedMessage
      id="still-valid-code"
      defaultMessage={`You have recently been sent a code. Please wait at least 5 minutes to request a new one.`}
    />
  ),

  "phones.long_description": (
    <FormattedMessage
      id="phones.long_description"
      defaultMessage={`You can connect one or more mobile phone numbers to
           your eduID, but one has to be set as primary.`}
    />
  ),

  "phones.add_new": (
    <FormattedMessage
      id="phones.add_new"
      defaultMessage={`A new phone number will receive a code for you to use by clicking Confirm in the list of numbers.`}
    />
  ),

  "phones.get-success": (
    <FormattedMessage id="phones.get-success" defaultMessage={`Successfully retrieved phone numbers`} />
  ),

  "phones.save-success": <FormattedMessage id="phones.save-success" defaultMessage={`The phone number was saved`} />,

  "phones.unconfirmed_number_not_primary": (
    <FormattedMessage
      id="phones.unconfirmed_number_not_primary"
      defaultMessage={`An unconfirmed phone number cannot be set as primary`}
    />
  ),

  "phones.primary-success": (
    <FormattedMessage id="phones.primary-success" defaultMessage={`The phone number was set as primary`} />
  ),

  "phones.code_expired_send_new": (
    <FormattedMessage id="phones.code_expired_send_new" defaultMessage={`Expired code, sending another`} />
  ),

  "phones.code_invalid": <FormattedMessage id="phones.code_invalid" defaultMessage={`Invalid code`} />,

  "phones.invalid_phone": <FormattedMessage id="phones.invalid_phone" defaultMessage={`Invalid phone number`} />,

  "phones.unknown_phone": (
    <FormattedMessage id="phones.unknown_phone" defaultMessage={`We have no record of the phone number you provided`} />
  ),

  "phones.code_invalid_or_expired": (
    <FormattedMessage
      id="phones.code_invalid_or_expired"
      defaultMessage={`The code is invalid or it has expired, please try again or request a new code`}
    />
  ),

  "phones.verification-success": (
    <FormattedMessage id="phones.verification-success" defaultMessage={`Successfully verified phone number`} />
  ),

  "phones.cannot_remove_unique": (
    <FormattedMessage id="phones.cannot_remove_unique" defaultMessage={`You must have at least one phone number`} />
  ),

  "phones.cannot_remove_primary": (
    <FormattedMessage
      id="phones.cannot_remove_primary"
      defaultMessage={`You cannot remove your primary phone number`}
    />
  ),

  "phones.removal-success": (
    <FormattedMessage id="phones.removal-success" defaultMessage={`Successfully removed phone number`} />
  ),

  "phones.code-sent": <FormattedMessage id="phones.code-sent" defaultMessage={`Successfully sent a code`} />,

  "phone.e164_format": (
    <FormattedMessage
      id="phone.e164_format"
      defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 10-20 digits.`}
    />
  ),

  "phone.swedish_mobile_format": (
    <FormattedMessage
      id="phone.swedish_mobile_format"
      defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 10-20 digits.`}
    />
  ),

  "phones.duplicated": (
    <FormattedMessage id="phones.duplicated" defaultMessage={`The number is already in the list.`} />
  ),

  /* ----- PERSONAL DATA------- */
  "pfilled.completion": <FormattedMessage id="pfilled.completion" defaultMessage={`Completion`} />,

  "pd.all-data-success": (
    <FormattedMessage id="pd.all-data-success" defaultMessage={`Successfully retrieved personal information`} />
  ),

  "pd.pdata-success": (
    <FormattedMessage id="pd.pdata-success" defaultMessage={`Successfully retrieved personal information`} />
  ),

  "pd.save-success": <FormattedMessage id="pd.save-success" defaultMessage={`Personal information updated`} />,

  "pdata.field_required": <FormattedMessage id="pdata.field_required" defaultMessage={`This field is required`} />,

  /* ----- EMAILS------- */

  "emails.email_label": <FormattedMessage id="emails.email" defaultMessage={`Email`} />,

  "emails.input_help_text": <FormattedMessage id="emails.input_help_text" defaultMessage={"A valid email address"} />,

  "emails.code_invalid": (
    <FormattedMessage
      id="emails.code_invalid"
      defaultMessage={`The code is invalid, please try again or request a new code`}
    />
  ),

  "emails.code_invalid_or_expired": (
    <FormattedMessage
      id="emails.code_invalid_or_expired"
      defaultMessage={`The code is invalid or has expired, please try again or request a new code`}
    />
  ),

  "emails.button_add": <FormattedMessage id="emails.button_add" defaultMessage={`Add`} />,

  "emails.add_new": (
    <FormattedMessage
      id="emails.add_new"
      defaultMessage={`A new email address will receive a link to click or a code that can be used by clicking Confirm in the list of email addresses.`}
    />
  ),

  "emails.get-success": (
    <FormattedMessage id="emails.get-success" defaultMessage={`Successfully retrieved Email addresses`} />
  ),

  "emails.save-success": <FormattedMessage id="emails.save-success" defaultMessage={`The email address was saved`} />,

  "emails.unconfirmed_address_not_primary": (
    <FormattedMessage
      id="emails.unconfirmed_address_not_primary"
      defaultMessage={`You need to confim and email address before it can be made primary`}
    />
  ),

  "emails.primary-success": (
    <FormattedMessage id="emails.primary-success" defaultMessage={`The primary email address was updated `} />
  ),

  "emails.code_expired_send_new": (
    <FormattedMessage id="emails.code_expired_send_new" defaultMessage={`Expired code, sending another`} />
  ),

  "emails.verification-success": (
    <FormattedMessage id="emails.verification-success" defaultMessage={`Successfully verified email address`} />
  ),

  "emails.cannot_remove_unique": (
    <FormattedMessage id="emails.cannot_remove_unique" defaultMessage={`You must have at least one email address`} />
  ),

  "emails.cannot_remove_unique_verified": (
    <FormattedMessage
      id="emails.cannot_remove_unique_verified"
      defaultMessage={`You must have at least one verified email address`}
    />
  ),

  "emails.removal-success": (
    <FormattedMessage id="emails.removal-success" defaultMessage={`Successfully removed email address`} />
  ),

  "emails.code-sent": <FormattedMessage id="emails.code-sent" defaultMessage={`Successfully sent a code`} />,

  "emails.cannot_remove_primary": (
    <FormattedMessage id="emails.cannot_remove_primary" defaultMessage={`You can not delete the primary email`} />
  ),

  "emails.invalid_email": (
    <FormattedMessage id="emails.invalid_email" defaultMessage={`The entered value does not look like an email`} />
  ),

  "emails.missing": <FormattedMessage id="emails.missing" defaultMessage={`You must provide an email address`} />,

  "emails.unknown_email": (
    <FormattedMessage
      id="emails.unknown_email"
      defaultMessage={`We have no record of the email address you provided`}
    />
  ),

  "emails.duplicated": <FormattedMessage id="emails.duplicated" defaultMessage={`The email is already in the list.`} />,

  /* -----  Advanced settings ------- */

  "InvalidStateError: The user attempted to register an authenticator that contains one of the credentials already registered with the relying party.":
    (
      <FormattedMessage
        id="InvalidStateError: The user attempted to register an authenticator that contains one of the credentials already registered with the relying party."
        defaultMessage={`You are attempting to register an authenticator that contains one of the credentials already registered with the relying party`}
      />
    ),

  "cred.credential_type": <FormattedMessage id="cred.credential_type" defaultMessage={`Credential type.`} />,

  "security.remove": <FormattedMessage id="security.remove" defaultMessage={`Remove`} />,

  "security.main_title": <FormattedMessage id="security.main_title" defaultMessage={`Security`} />,

  "security.credential": <FormattedMessage id="security.credential" defaultMessage={`Credential`} />,
  "security.user-update-throttled": (
    <FormattedMessage
      id="security.user-update-throttled"
      defaultMessage={`Too many attempts to update names have been made. Try again later.`}
    />
  ),

  "security.user-updated": (
    <FormattedMessage
      id="security.user-updated"
      defaultMessage={`First and last names are up-to-date with those registered in the Swedish Population Register.`}
    />
  ),

  "security.u2f.max_allowed_tokens": (
    <FormattedMessage
      id="security.u2f.max_allowed_tokens"
      defaultMessage={`You already have the maximum allowed number of tokens`}
    />
  ),

  "security.u2f.missing_enrollment_data": (
    <FormattedMessage
      id="security.u2f.missing_enrollment_data"
      defaultMessage={`Found no U2F enrollment data in your session`}
    />
  ),

  "security.u2f.no_token_found": (
    <FormattedMessage id="security.u2f.no_token_found" defaultMessage={`No U2F token found in your session`} />
  ),

  "security.u2f.missing_token": (
    <FormattedMessage id="security.u2f.missing_token" defaultMessage={`No U2F token found in your session`} />
  ),

  "security.u2f.missing_challenge_data": (
    <FormattedMessage
      id="security.u2f.missing_challenge_data"
      defaultMessage={`Found no U2F challenge data in your session`}
    />
  ),

  "security.u2f.description_to_long": (
    <FormattedMessage
      id="security.u2f.description_to_long"
      defaultMessage={`You tried to set a U2F token description long`}
    />
  ),

  "security.add_u2f_token": <FormattedMessage id="security.add_u2f_token" defaultMessage={`Add U2F token`} />,

  "security.u2f_credential_type": <FormattedMessage id="security.u2f_credential_type" defaultMessage={`U2F token`} />,

  "security.u2f_register_success": (
    <FormattedMessage id="security.u2f_register_success" defaultMessage={`U2F token successfully registered`} />
  ),

  "u2f.action-required": (
    <FormattedMessage id="u2f.action-required" defaultMessage={`Action required for multi factor authentication`} />
  ),

  "u2f.push-the-button": (
    <FormattedMessage id="u2f.push-the-button" defaultMessage={`Please touch the button in your U2F key`} />
  ),

  "security.u2f-token-removed": (
    <FormattedMessage id="security.u2f-token-removed" defaultMessage={`U2F token successfully removed`} />
  ),

  "security.u2f-describe-title": (
    <FormattedMessage
      id="security.u2f-describe-title"
      defaultMessage={`Enter a description for the U2F token you are about to register`}
    />
  ),

  "security.add_webauthn_token_key": (
    <FormattedMessage id="security.add_webauthn_token_key" defaultMessage={`Add security key`} />
  ),

  "security.add_webauthn_token_device": (
    <FormattedMessage id="security.add_webauthn_token_device" defaultMessage={`Register this device as security key`} />
  ),

  "security.webauthn.max_allowed_tokens": (
    <FormattedMessage
      id="security.webauthn.max_allowed_tokens"
      defaultMessage={`You are not allowed to register more security keys`}
    />
  ),

  "security.webauthn_register_success": (
    <FormattedMessage id="security.webauthn_register_success" defaultMessage={`Security key added`} />
  ),

  "security.webauthn-token-removed": (
    <FormattedMessage id="security.webauthn-token-removed" defaultMessage={`Security key has been removed.`} />
  ),

  "security.webauthn-missing-pdata": (
    <FormattedMessage
      id="security.webauthn-missing-pdata"
      defaultMessage={`You should add your name in Settings before adding a security key`}
    />
  ),

  "security.webauthn-token-notfound": (
    <FormattedMessage id="security.webauthn-token-notfound" defaultMessage={`Security token not found`} />
  ),

  "security.webauthn-noremove-last": (
    <FormattedMessage
      id="security.webauthn-noremove-last"
      defaultMessage={`You are not allowed to remove your only security key`}
    />
  ),

  "SecurityMsg.rm_webauthn": (
    <FormattedMessage id="SecurityMsg.rm_webauthn" defaultMessage={`Security key has been removed.`} />
  ),

  /* ----- ORCID ------- */

  "orc.authorization_success": (
    <FormattedMessage id="orc.authorization_success" defaultMessage={`ORCID connected successfully`} />
  ),

  "orc.already_connected": (
    <FormattedMessage id="orc.already_connected" defaultMessage={`ORCID already connected to this account`} />
  ),

  "orc.unknown_state": (
    <FormattedMessage
      id="orc.unknown_state"
      defaultMessage={`State was unknown when trying to connect ORCID account`}
    />
  ),

  "orc.sub_mismatch": (
    <FormattedMessage id="orc.sub_mismatch" defaultMessage={`Subject mismatch when trying to connect ORCID account`} />
  ),

  "orc.title": <FormattedMessage id="orc.title" defaultMessage={`ORCID`} />,

  "orc.about_link": (
    <FormattedMessage
      id="orc.about_link"
      defaultMessage={`Learn more about ORCID in eduID from our {faq_link}.`}
      values={{
        faq_link: (
          <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">
            FAQ
          </a>
        ),
      }}
    />
  ),

  "orc.authorization_fail": (
    <FormattedMessage id="orc.authorization_fail" defaultMessage={`ORCID authentication failed`} />
  ),
};
