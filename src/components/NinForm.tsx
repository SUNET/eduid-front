import React from "react";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { Field, reduxForm } from "redux-form";

import CustomInput from "../login/components/Inputs/CustomInput";
import { useIntl } from "react-intl";
import { translate } from "login/translation";
import { DashboardRootState } from "dashboard-init-app";
import { useDashboardAppDispatch } from "dashboard-hooks";
import EduIDButton from "./EduIDButton";
import { addNin } from "apis/eduidSecurity";

const validate = (values: { nin: string }) => {
  let value = values.nin;
  // accept only digits
  if (/[^0-9]+/.test(value)) return { nin: "nins.illegal_chars" };
  if (value.length !== 12) return { nin: "nins.wrong_length" };

  // The Luhn Algorithm. It's so pretty.
  // taken from https://gist.github.com/DiegoSalazar/4075533/
  let nCheck = 0,
    bEven = false;
  value = value.slice(2); // To pass the Luhn check only use the 10 last digits
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
    return { nin: "nins.invalid_nin" };
  }
  return {};
};

export interface NinFormData {
  nin?: string;
}

interface ValuesProps {
  nin: string;
}

interface NinFormProps {
  valid: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any; // injected by redux-form, haven't figured out how to type it yet
}

const NinForm = (props: NinFormProps): JSX.Element => {
  const { handleSubmit } = props;
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "nins.input_placeholder",
    defaultMessage: "yyyymmddnnnn",
    description: "Swedish NIN template",
  });
  const dispatch = useDashboardAppDispatch();

  const submitNinForm = (values: ValuesProps) => {
    const nin = values.nin;
    if (nin) {
      dispatch(addNin(nin));
    }
    return 1;
  };

  return (
    <Form id="nin-form" role="form" onSubmit={handleSubmit(submitNinForm)} className="single-input-form">
      <fieldset id="nins-form" className="tabpane">
        <Field
          component={CustomInput}
          componentClass="input"
          type="text"
          name="nin"
          label={translate("nin_display.profile.main_title")}
          placeholder={placeholder}
          helpBlock={translate("nins.input_help_text")}
        />
      </fieldset>
      <EduIDButton id="add-nin-button" buttonstyle="primary" disabled={!props.valid} type="submit" key="1">
        {translate("emails.button_add")}
      </EduIDButton>
    </Form>
  );
};

const DecoratedNinForm = reduxForm<NinFormData, NinFormProps>({
  form: "nins",
  validate,
})(NinForm);

const mapStateToProps = (state: DashboardRootState) => {
  return {
    initialValues: { nin: state.nins.nin },
    touchOnChange: true,
    enableReinitialize: true,
    destroyOnUnmount: false,
  };
};

const FinalNinForm = connect(mapStateToProps)(DecoratedNinForm);

export default FinalNinForm;
