import { validateUserNameField } from "helperFunctions/validation/validateUserName";
import React from "react";
import { Field as FinalField } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import CustomInput from "./CustomInput";

// exported for use in tests
export const userNameInputPlaceHolder = "enter username";

interface UserNameInputProps {
  required: boolean;
  autoFocus: boolean;
  name: string;
  autoComplete?: "username";
  helpBlock?: React.ReactNode; // help text shown above input
  defaultValue?: string;
}

export default function UserNameInput(props: UserNameInputProps): JSX.Element {
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "placeholder.username",
    defaultMessage: "enter username",
    description: "placeholder text for user name input",
  });

  function validate(value: string) {
    if (!value && props.autoComplete !== undefined) {
      /* Browsers handle auto-completed fields differently. Current Chrome for example seems to often (but not always)
       * fill in the value on-screen, but not tell Javascript about it so the validator doesn't see that a value has
       * been entered, and might show "required", which will confuse the user. As soon as the user clicks anywhere on
       * the page (including on a seemingly disabled submit-button), the validator will run and the error will be
       * cleared.
       *
       * We want to suppress this exact validation error before the user clicks anywhere.
       */
      return undefined;
    }

    return validateUserNameField(value);
  }

  return (
    <FinalField
      required={props.required}
      component={CustomInput}
      componentClass="input"
      type="text"
      name={props.name}
      autoFocus={props.autoFocus}
      autoComplete={props.autoComplete}
      placeholder={placeholder}
      validate={validate}
      defaultValue={props.defaultValue}
      // parameters for InputWrapper
      helpBlock={props.helpBlock}
      label={<FormattedMessage defaultMessage="Username" description="profile username display title" />}
    />
  );
}
