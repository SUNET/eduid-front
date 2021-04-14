export let createInitValues = (invitesByRole) => {
  // 1. remove ".com" from email address to be able to set unique names to each checkbox
  let emails = invitesByRole.map((invite) => invite.email.split(".")[0]);
  let memberStatus = invitesByRole.map((invite) => invite.member);
  let ownerStatus = invitesByRole.map((invite) => invite.owner);

  // 2. data structure required to set initial values for all checkboxes
  let initialValues = emails.reduce((obj, email, i) => {
    obj[`${email}-member`] = memberStatus[i];
    obj[`${email}-owner`] = ownerStatus[i];
    return obj;
  }, {});
  return initialValues;
};

export let createCheckboxNamesAndLabels = (email) => {
  let trimmedEmail = email.split(".")[0];
  return [
    { name: `${trimmedEmail}-member`, label: "" },
    { name: `${trimmedEmail}-owner`, label: "" },
  ];
};
