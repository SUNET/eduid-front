import React, { Fragment } from "react";
import FormText from "reactstrap/lib/FormText";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import i18n from "../login/translation/InjectIntl_HOC_factory";


const textInput = props => {
  const {
    input,
    label,
    name,
    meta,
    selectOptions,
    type,
    translate,
    disabled,
    helpBlock,
    placeholder
  } = props;
  let valid = false,
    invalid = false;
  if (meta.touched || meta.submitFailed) {
    if (meta.error) {
      invalid = true;
    } else {
      valid = true;
    }
  }
  const errmsg = (invalid && translate(meta.error)) || "";
  let feedback = "",
    help;
  if (errmsg !== "") {
    feedback = <span className="eduid-field-error">{errmsg}</span>;
    help = (
      <FormText>
        {feedback} | {helpBlock}
      </FormText>
    );
  } else {
    help = <FormText>{helpBlock}</FormText>;
  }

  let field;
  if (selectOptions) {
    const renderSelectLanguage = selectOptions.map((option, index) => {
      return (
        <Fragment key={index}>
          <label key={option[0]} htmlFor={option[1]}>
          <input
            className={"radio-input"}
            key={option[0]}
            id={option[1]}
            type='radio'
            {...input}
            value={option[0]}
            checked={option[0]===input.value}
          />
          <span key={index}>{option[1]}
          </span>
          </label>
        </Fragment>
      );
    });
    field = (
      <div className='radio-input-container'>
        {renderSelectLanguage}
      </div>
    );
  } 
  else {
    field = (
      <Input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        id={name}
        name={name}
        valid={valid}
        invalid={invalid}
        {...input}
      />
    );
  }
  let labelElem = "";
  if (label) {
    labelElem = <Label for={name}>{label}</Label>;
  }

  return (
    <FormGroup id={input.name}>
      {labelElem}
      {field}
      {help}
    </FormGroup>
  );
};
export default i18n(textInput);