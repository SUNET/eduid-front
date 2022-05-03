import { addNin } from "apis/eduidSecurity";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { translate } from "login/translation";
import React from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { useIntl } from "react-intl";
import CustomInput from "../login/components/Inputs/CustomInput";
import EduIDButton from "./EduIDButton";

function validateNin(value: string): string | undefined {
  if (!value) {
    return "required";
  }
  // accept only digits
  if (/[^0-9]+/.test(value)) return "nins.illegal_chars";
  if (value.length !== 12) return "nins.wrong_length";

  value = value.slice(2); // To pass the Luhn check only use the 10 last digits

  // The Luhn Algorithm. It's so pretty.
  // taken from https://gist.github.com/DiegoSalazar/4075533/
  let nCheck = 0,
    bEven = false;
  for (let n = value.length - 1; n >= 0; n--) {
    const cDigit = value.charAt(n);
    let nDigit = parseInt(cDigit, 10);
    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }
    nCheck += nDigit;
    bEven = !bEven;
  }
  if (nCheck % 10 !== 0) {
    return "nins.invalid_nin";
  }
  return undefined;
}

export interface NinFormData {
  nin?: string;
}

function NinForm(): JSX.Element {
  const nin = useDashboardAppSelector((state) => state.nins.first_nin);

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "nins.input_placeholder",
    defaultMessage: "yyyymmddnnnn",
    description: "Swedish NIN template",
  });
  const dispatch = useDashboardAppDispatch();

  function submitNinForm(values: NinFormData) {
    const nin = values.nin;
    if (nin) {
      dispatch(addNin(nin));
    }
  }

  return (
    <FinalForm<NinFormData>
      onSubmit={submitNinForm}
      initialValues={{
        nin: nin?.number || "",
      }}
      render={({ handleSubmit, pristine, invalid }) => {
        return (
          <form onSubmit={handleSubmit} className="single-input-form">
            <fieldset id="nins-form" className="tabpane">
              <FinalField
                component={CustomInput}
                componentClass="input"
                type="text"
                name="nin"
                label={translate("nin_display.profile.main_title")}
                placeholder={placeholder}
                helpBlock={translate("nins.input_help_text")}
                validate={validateNin}
              />
            </fieldset>
            <EduIDButton id="add-nin-button" buttonstyle="primary" disabled={pristine || invalid} type="submit">
              {translate("emails.button_add")}
            </EduIDButton>
          </form>
        );
      }}
    />
  );
}

export default NinForm;
