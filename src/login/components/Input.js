import React, { Component } from "react";
import PropTypes from "prop-types";

import FormText from "reactstrap/lib/FormText";
import FormGroup from "reactstrap/lib/FormGroup";
import FormFeedback from "reactstrap/lib/FormFeedback";
import Input from "reactstrap/lib/Input";
import i18n from "i18n-messages";

const TextInput = props => {
  const {
    input,
    meta,
    disabled
  } = props;
  console.log("these are props:", props);

  let valid = false;
  let invalid = false;

  if (meta.touched || meta.submitFailed) {
    if (meta.error) {
      invalid = true;
    } else {
      valid = true;
    }
  }

  // const errmsg = (invalid && l10n(meta.error)) || "";
  // let feedback = "",
  let help = "";
  // if (errmsg !== "") {
  //  let  feedback = <span className="eduid-field-error">{errmsg}</span>;
  //   help = (
  //     <FormText>
  //       {feedback} | {helpBlock}
  //     </FormText>
  //   );
  // } else {
  //   help = <FormText>{helpBlock}</FormText>;
  // }

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

  return (
    <div id={input.name} className="input-container">
      {/* {labelElem} */}
      <label for={props.name}>{props.label}</label>
      <Input
        type={props.type}
        disabled={disabled}
        placeholder={props.placeholder}
        id={props.name}
        name={props.name}
        valid={valid}
        invalid={invalid}
        {...input}
      />
      {/* {help} */}
    </div>
  );
};

export default i18n(TextInput);
