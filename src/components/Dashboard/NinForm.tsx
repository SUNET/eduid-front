import CustomInput from "components/Common/CustomInput";
import EduIDButton from "components/Common/EduIDButton";
import { useAppSelector } from "eduid-hooks";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { FormattedMessage, useIntl } from "react-intl";
import securityApi from "services/security";

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
  const nin = useAppSelector((state) => state.personal_data?.response?.identities?.nin);
  const [addNin_trigger] = securityApi.useLazyAddNinQuery()

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "nins.input_placeholder",
    defaultMessage: "yyyymmddnnnn",
    description: "Swedish NIN template",
  });

  function submitNinForm(values: NinFormData) {
    const nin = values.nin;
    if (nin) {
      addNin_trigger({nin});
    }
  }

  return (
    <FinalForm<NinFormData>
      id="nin-form"
      onSubmit={submitNinForm}
      initialValues={{
        nin: nin?.number || "",
      }}
      render={({ handleSubmit, pristine, invalid }) => {
        return (
          <form onSubmit={handleSubmit} className="single-input-form x-adjust">
            <FinalField
              component={CustomInput}
              componentClass="input"
              type="text"
              name="nin"
              label={<FormattedMessage description="nin label" defaultMessage="ID number" />}
              placeholder={placeholder}
              helpBlock={<FormattedMessage description="nins input help text" defaultMessage="12 digits" />}
              validate={validateNin}
            />
            <div className="buttons">
              <EduIDButton id="add-nin-button" buttonstyle="primary" disabled={pristine || invalid} type="submit">
                <FormattedMessage description="button_add" defaultMessage="Add" />
              </EduIDButton>
            </div>
          </form>
        );
      }}
    />
  );
}

export default NinForm;
