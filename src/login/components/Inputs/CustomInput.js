import React from "react";
import PropTypes from "prop-types";
import FormGroup from "reactstrap/lib/FormGroup";
import FormText from "reactstrap/lib/FormText";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import i18n from "../../translation/InjectIntl_HOC_factory";

const RenderHelpBlock = props => {
  const { meta, translate, helpBlock, invalid } = props;
  const errmsg = (invalid && translate(meta.error)) || "";

  return(
    errmsg ? (
      <FormText>
        <span className="eduid-field-error">{errmsg} {helpBlock && helpBlock} </span>
      </FormText>
    ):(
      <FormText>{helpBlock}</FormText>
    )
  )
}

const RenderInput = props => {
  const {
    input,
    name,
    selectOptions,
    type,
    disabled,
    placeholder,
    valid,
    invalid
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
        valid={valid}
        invalid={invalid}
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
        valid={valid}
        invalid={invalid}
        {...input}
      />
    )
  }
}

const customInput = (props) => {
  const {
    input,
    label,
    name,
    meta
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

  return (
    <FormGroup id={input.name}>
      {label && <Label for={name}>{label}</Label>}
      <RenderInput {...props} valid={valid} invalid={invalid}/>
      <RenderHelpBlock {...props} valid={valid} invalid={invalid}/>
    </FormGroup>
  );
};

customInput.propTypes = {
  label: PropTypes.string,
  meta: PropTypes.object,
  input: PropTypes.object,
  name: PropTypes.string,
  selectOptions: PropTypes.array,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  valid: PropTypes.bool,
  invalid: PropTypes.bool,
  translate: PropTypes.func, 
  helpBlock: PropTypes.object
};

export default i18n(customInput);