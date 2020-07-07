import React from "react";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import i18n from "../../translation/InjectIntl_HOC_factory";

const RenderInput = props => {
  const {
    input,
    name,
    selectOptions,
    type,
    disabled,
    placeholder
  } = props;
  
  if (type === "select") {
    let options = [];
    if (selectOptions) {
      options = selectOptions.slice();
    }
    const selectedOption = options.map(option => {
      return (
        <option key={option[0]} value={option[0]}>
          {option[1]}
        </option>
      );
    });
    
    return(
      <Input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        id={name}
        name={name}
        {...input}
      >
        {selectedOption}
      </Input>

)} else {
  return(
    <Input
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      id={name}
      name={name}
      {...input}
    />
  )}
}

const customInput = props => {
  const {
    input,
    label,
    name,
  } = props;

  return (
    <FormGroup id={input.name}>
      <Label for={name}>{label && label}</Label>
      <RenderInput {...props}/>
    </FormGroup>
  );
};

export default i18n(customInput);