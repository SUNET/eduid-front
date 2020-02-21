import React, { Component } from "react";
import PropTypes from "prop-types";

import FormText from "reactstrap/lib/FormText";
import FormGroup from "reactstrap/lib/FormGroup";
import FormFeedback from "reactstrap/lib/FormFeedback";
import Input from "reactstrap/lib/Input";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const TextInput = props => {
  const { input, meta, translate } = props;

  // set to determine styling of visual feedback upon writing valid vs invalid input
  let valid = false;
  let invalid = false;
  if (meta.touched || meta.submitFailed) {
    if (meta.error) {
      invalid = true;
    } else {
      valid = true;
    }
  }

  // log the correct error under input following validation
  let errorMessage = <span className="transparent-input-error">X</span>;
  // this is what comes back form validation (translated by l10n)
  const validationError = (invalid && translate(meta.error)) || "";
  // if validation error is not "" display the html element
  if (validationError !== "") {
    errorMessage = <span className="input-error">{validationError}</span>;
  }

  // let field;

  // if (type === "select") {
  //   let options = [];
  //   if (selectOptions) {
  //     options = selectOptions.slice();
  //   }
  //   const children = options.map(opt => {
  //     return (
  //       <option key={opt[0]} value={opt[0]}>
  //         {opt[1]}
  //       </option>
  //     );
  //   });
  //   field = (
  //     <Input
  //       type={type}
  //       disabled={disabled}
  //       placeholder={placeholder}
  //       id={name}
  //       name={name}
  //       valid={valid}
  //       invalid={invalid}
  //       {...input}
  //     >
  //       {children}
  //     </Input>
  //   );
  // } else {
  // field = (
  //   <Input
  //     type={type}
  //     disabled={disabled}
  //     placeholder={placeholder}
  //     id={name}
  //     name={name}
  //     valid={valid}
  //     invalid={invalid}
  //     {...input}
  //   />
  // );
  // }
  // let labelElem = "";
  // if (label) {
  //   labelElem = <Label for={name}>{label}</Label>;
  // }

  console.log("these are the props in text input", props)

  return (
    <div id={input.name} className="input-container">
      {/* {labelElem} */}
      <label>{props.label}</label>
      <Input
        id={props.name}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        valid={valid}
        invalid={invalid}
        // onChange={props.onChange}
        {...input}
      />
      <FormText>{errorMessage}</FormText>
    </div>
  );
};

export default InjectIntl(TextInput);
