import React from "react";
import { defineMessages } from "react-intl";

// import content from other files
import { generalErrors, specificErrors } from "./defaultMessages/errors";
import { login } from "./defaultMessages/login";
import { generalInstructions } from "./defaultMessages/instructions";
import { changePassword } from "./defaultMessages/password";
import { register } from "./defaultMessages/register";
import { generalApp } from "./defaultMessages/generalApp";
import {
  userData,
  userProfile,
  userVetting
} from "./defaultMessages/userProfile";

export const formattedMessages = {
  ...generalApp,
  ...generalErrors,
  ...specificErrors,
  ...login,
  ...generalInstructions,
  ...changePassword,
  ...register,
  ...userData,
  ...userProfile,
  ...userVetting
};

// export const formattedMessages = JSON.stringify(formattedMessagesObj);

export const unformattedMessages = defineMessages({
  "pd.choose-language": {
    id: "pd.choose-language",
    defaultMessage: `Choose language`
  },
  "emails.placeholder": {
    id: "emails.confirm_email_placeholder",
    defaultMessage: `Email confirmation code`,
    description: "Placeholder for email text input"
  },
  "mobile.placeholder": {
    id: "mobile.confirm_mobile_placeholder",
    defaultMessage: `Phone confirmation code`,
    description: "Placeholder for phone text input"
  },
  "chpass.help-text-newpass": {
    id: "chpass.help-text-newpass",
    defaultMessage: `<label>Tip: Choose a strong password</label>
            <ul id="password-custom-help">
	            <li>Use upper- and lowercase characters, but not at the beginning or end</li>
	            <li>Add digits somewhere, but not at the beginning or end</li>
                <li>Add special characters, such as &#64; &#36; &#92; &#43; &#95; &#37;</li>
	            <li>Spaces are ignored</li>
            </ul>`,
    description: "help text for custom password"
  },
  "cm.lost_code": {
    id: "cm.lost_code",
    defaultMessage: `Is the code not working?`,
    description: "Lost code problem description"
  },
  "cm.resend_code": {
    id: "cm.resend_code",
    defaultMessage: `Send a new confirmation code`,
    description: "Lost code problem solution"
  },
  "letter.lost_code": {
    id: "letter.lost_code",
    defaultMessage: `When you click on the "Send code" link a letter with a verification code will be sent to your official post address.`,
    description: "Text for letter proofing confirm dialog"
  },
  "letter.resend_code": {
    id: "letter.resend_code",
    defaultMessage: `Send code`,
    description: "Text for letter code resend button"
  },
  "letter.placeholder": {
    id: "letter.placeholder",
    defaultMessage: `Letter confirmation code`,
    description: "Placeholder for letter proofing text input"
  },

  "pd.given_name": {
    id: "pd.given_name",
    defaultMessage: `First name`
  },

  "pd.surname": {
    id: "pd.surname",
    defaultMessage: `Last name`
  },

  "pd.display_name": {
    id: "pd.display_name",
    defaultMessage: `Display Name`
  },

  "pd.language": {
    id: "pd.language",
    defaultMessage: `Language`
  },

  "pd.display_name_input_placeholder": {
    id: "pd.display_name_inputplaceholder",
    defaultMessage: `First and last name`
  },

  "nins.input_placeholder": {
    id: "nins.input_placeholder",
    defaultMessage: `yyyymmddnnnn`
  },

  "phones.input_placeholder": {
    id: "phones.input_placeholder",
    defaultMessage: `phone number`
  }
});
