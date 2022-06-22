import { addNin } from "apis/eduidSecurity";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";
import { useIntl } from "react-intl";
import CustomInput from "../login/components/Inputs/CustomInput";
import EduIDButton from "./EduIDButton";
import { FormattedMessage } from "react-intl";
import Accordion from "./Accordion";
import SeFlagSvg from "../../img/se.svg";
import EuFlagSvg from "../../img/eu.svg";
import WorldFlagSvg from "../../img/world.svg";

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
  const nin = useDashboardAppSelector((state) => state.identities.nin);

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
      id="nin-form"
      onSubmit={submitNinForm}
      initialValues={{
        nin: nin?.number || "",
      }}
      render={({ handleSubmit, pristine, invalid }) => {
        const accordionData = [
          {
            icon: <img src={SeFlagSvg} alt="Swedish flag" />,
            title: "Svenskt personnummer",
            additionalInfo: "",
            content: (
              <form onSubmit={handleSubmit} className="single-input-form">
                <fieldset id="nins-form" className="tabpane">
                  <FinalField
                    component={CustomInput}
                    componentClass="input"
                    type="text"
                    name="nin"
                    label={<FormattedMessage description="nin label" defaultMessage="Id number" />}
                    placeholder={placeholder}
                    helpBlock={
                      <FormattedMessage
                        description="nins input help text"
                        defaultMessage="National identity number with 12 digits"
                      />
                    }
                    validate={validateNin}
                  />
                </fieldset>
                <EduIDButton id="add-nin-button" buttonstyle="primary" disabled={pristine || invalid} type="submit">
                  <FormattedMessage description="button_add" defaultMessage="Add" />
                </EduIDButton>
              </form>
            ),
          },
          {
            icon: <img src={EuFlagSvg} alt="European Union flag" />,
            title: "Europeisk medborgare",
            additionalInfo: "eIDAS",
            content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. A, in!`,
          },
          {
            icon: <img src={WorldFlagSvg} alt="European Union flag" />,
            title: "Världsmedborgare",
            additionalInfo: "Svipe ID",
            content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
            quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
            dolor ut sequi minus iste? Quas?`,
          },
          {
            icon: "",
            title: "Övriga galaxen",
            additionalInfo: "Vintergatan",
            content: `Annat kul alternativ`,
          },
        ];

        return (
          <div className="accordions x-adjust">
            {accordionData.map(({ icon, title, additionalInfo, content }) => (
              <Accordion icon={icon} title={title} additionalInfo={additionalInfo} content={content} />
            ))}
            <AccordionUniverse />
          </div>
        );
      }}
    />
  );
}

function AccordionUniverse(): JSX.Element | null {
  return <Accordion icon="" title="Övriga universum" additionalInfo="" content="Annat superkul alternativ" />;
}
export default NinForm;
