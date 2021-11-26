import React from "react";
import { connect } from "react-redux";
import { Form } from "reactstrap";
import { Field, FormProps, FormSubmitHandler, reduxForm } from "redux-form";
import * as actions from "actions/Nins";

import CustomInput from "../login/components/Inputs/CustomInput";
import PrimaryButton from "../login/components/Buttons/ButtonPrimary";
import { useIntl } from "react-intl";
import { translate } from "login/translation";
import { DashboardRootState } from "dashboard-init-app";
import { useDashboardAppDispatch } from "dashboard-hooks";

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

//interface ValuesProps extends React.FormEventHandler<HTMLFormElement> {
interface ValuesProps {
  nin: string;
}

interface NinFormProps {
  valid: boolean;
  //handleSubmit?: (data: NinFormData, dispatch: Dispatch<any>, props: IOwnProps) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: any;
}

const NinForm = (props: NinFormProps): JSX.Element => {
  const { handleSubmit } = props;
  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({ id: "nins.input_placeholder", defaultMessage: "yyyymmddnnnn" });
  const dispatch = useDashboardAppDispatch();

  const submitNinForm = (values: ValuesProps) => {
    const nin = values.nin;
    if (nin) {
      dispatch(actions.postNin(nin));
    }
    return 1;
  };

  return (
    <Form id="nin-form" role="form" onSubmit={handleSubmit(submitNinForm)}>
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
      <PrimaryButton id="add-nin-button" disabled={!props.valid} type="submit" key="1">
        {translate("emails.button_add")}
      </PrimaryButton>
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

connect(mapStateToProps)(DecoratedNinForm);

export default DecoratedNinForm;
