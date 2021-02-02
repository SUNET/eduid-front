import React, { Fragment } from "react";
import { Field } from "redux-form";
import i18n from "../../translation/InjectIntl_HOC_factory";

const checkboxNamesLabels = [
  { member: "User belongs to group as a member" },
  { owner: "User can edit who belongs to the group as an owner" },
];

const RenderCheckboxInput = ({
  meta: { error },
  input: { onChange, value },
  id,
  label,
}) => {
  return (
    <Fragment>
      <div className="role-form">
        <div className="checkbox-label">
          <label className={value ? "checked" : null} htmlFor={id}></label>
          <p>{label}</p>
        </div>
        <input
          id={id}
          type="checkbox"
          value={value}
          checked={value}
          onChange={onChange}
        />
      </div>
      {error && (
        <p>
          <span className="input-validate-error">
            At least one membership must be set to create an invite
          </span>
        </p>
      )}
    </Fragment>
  );
};

let InviteRoleCheckboxes = ({ helpBlock }) => {
  return (
    <div className="invite-role">
      <div className={"input-label-helptext-container"}>
        <label>
          Membership<span className="label-required">*</span>
        </label>
        {helpBlock && <span className={"help-block"}>{helpBlock}</span>}
      </div>
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
  );
};

// RoleCheckboxes.propTypes = {};

export default i18n(InviteRoleCheckboxes);
