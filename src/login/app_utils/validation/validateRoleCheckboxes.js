const validateRoleCheckboxes = (values) => {
  const errors = {};
  if (values !== undefined) {
    let roles = new Array(values.member, values.owner);
    let hasRole = roles.some((role) => role === true);
    if (!hasRole) {
      errors.owner = "required";
    }
  }
  return errors;
};

export default validateRoleCheckboxes;
