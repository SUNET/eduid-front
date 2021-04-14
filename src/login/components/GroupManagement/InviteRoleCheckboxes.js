import React, { Fragment } from "react";
import { Field } from "redux-form";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

const checkboxNamesLabels = [
  { member: "User belongs to group as a member" },
  { owner: "User can edit who belongs to the group as an owner" },
];

export const RenderCheckboxInput = ({ meta, input, id, label, type }) => {
  const { error } = meta;
  const { onChange, value } = input;
  return (
    <Fragment>
      <div className="checkbox-label">
        <label className={value ? "checked" : null} htmlFor={id}></label>
        <p>{label}</p>
      </div>
      {/* input is display:none to allow custom styling of box */}
      <input
        id={id}
        type={type}
        value={value}
        checked={value}
        onChange={onChange}
      />
      {error && (
        <div className="small form-text">
          <span className={"input-validate-error"}>
            At least one membership must be set to create an invite
          </span>
        </div>
      )}
    </Fragment>
  );
};

let InviteRoleCheckboxes = ({ helpBlock }) => {
  return (
    <div className={"invite-role"}>
      <div className={"input-label-helptext-container"}>
        <label>
          Membership<span className={"label-required"}>*</span>
        </label>
        {helpBlock && <span className={"help-block"}>{helpBlock}</span>}
      </div>
      <div className={"checkbox-wrapper"}>
        {checkboxNamesLabels.map((checkbox, i) => {
          let role = Object.keys(checkbox).toString();
          let label = Object.values(checkbox).toString();
          return (
            <Field
              key={i}
              label={label}
              id={role}
              component={RenderCheckboxInput}
              name={role}
              type="checkbox"
            />
          );
        })}
      </div>
    </div>
  );
};

// InviteRoleCheckboxes.propTypes = {};

export default InjectIntl(InviteRoleCheckboxes);
