import expect from "expect";
import {
  createInitValues,
  createCheckboxNamesAndLabels,
} from "../../login/app_utils/helperFunctions/checkboxHelpers";

let noInvitesByRole = [];
let manyInvitesByRole = [
  { email: "hardcoded@test.email", member: true, owner: true },
  { email: "hardcoded1@test.email", member: true, owner: false },
  { email: "hardcoded2@test.email", member: true, owner: false },
  { email: "hardcoded3@test.email", member: true, owner: true },
  { email: "hardcoded4@test.email", member: true, owner: false },
  { email: "hardcoded5@test.email", member: true, owner: true },
  { email: "hardcoded6@test.email", member: true, owner: false },
  { email: "hardcoded7@test.email", member: true, owner: true },
  { email: "hardcoded8@test.email", member: true, owner: false },
  { email: "hardcoded9@test.email", member: true, owner: true },
  { email: "hardcoded10@test.email", member: true, owner: false },
  { email: "hardcoded11@test.email", member: true, owner: true },
  { email: "hardcoded12@test.email", member: true, owner: false },
  { email: "hardcoded13@test.email", member: true, owner: true },
  { email: "hardcoded14@test.email", member: true, owner: true },
  { email: "hardcoded15@test.email", member: true, owner: false },
  { email: "hardcoded16@test.email", member: true, owner: true },
  { email: "hardcoded17@test.email", member: true, owner: false },
  { email: "hardcoded18@test.email", member: true, owner: true },
  { email: "hardcoded19@test.email", member: true, owner: false },
  { email: "hardcoded20@test.email", member: true, owner: true },
];

let fewInvitesByRole = [
  { email: "hardcoded@test.email", member: true, owner: true },
  { email: "hardcoded1@test.email", member: true, owner: false },
  { email: "hardcoded2@test.email", member: true, owner: false },
  { email: "hardcoded3@test.email", member: true, owner: true },
  { email: "hardcoded4@test.email", member: true, owner: false },
  { email: "hardcoded5@test.email", member: true, owner: true },
];

let hardcodedInitialValues = {
  "hardcoded@test-member": true,
  "hardcoded@test-owner": true,
  "hardcoded1@test-member": true,
  "hardcoded1@test-owner": false,
  "hardcoded2@test-member": true,
  "hardcoded2@test-owner": false,
  "hardcoded3@test-member": true,
  "hardcoded3@test-owner": true,
  "hardcoded4@test-member": true,
  "hardcoded4@test-owner": false,
  "hardcoded5@test-member": true,
  "hardcoded5@test-owner": true,
};

let mixedRolesInvitesByRole = [
  { email: "hardcoded8@test.email", member: true, owner: true },
  { email: "hardcoded9@test.email", member: false, owner: true },
  { email: "hardcoded10@test.email", member: true, owner: false },
  { email: "hardcoded11@test.email", member: true, owner: true },
  { email: "hardcoded12@test.email", member: true, owner: false },
];

let memberOnlyHardcodedInitialValues = {
  "hardcoded8@test-member": true,
  "hardcoded8@test-owner": true,
  "hardcoded9@test-member": false,
  "hardcoded9@test-owner": true,
  "hardcoded10@test-member": true,
  "hardcoded10@test-owner": false,
  "hardcoded11@test-member": true,
  "hardcoded11@test-owner": true,
  "hardcoded12@test-member": true,
  "hardcoded12@test-owner": false,
};

describe("createInitValues returns an object", () => {
  it("with invites", () => {
    let initialValues = createInitValues(fewInvitesByRole);
    expect(initialValues).toEqual(hardcodedInitialValues);
  });

  it("with no invites", () => {
    let initialValues = createInitValues(noInvitesByRole);
    expect(initialValues).toEqual({});
  });

  it("where each email address repeats once per role (many invites)", () => {
    let manyInvitesByRoleLength = manyInvitesByRole.length;
    let manyInitialValues = createInitValues(manyInvitesByRole);
    let manyInitialValuesLength = Object.entries(manyInitialValues).length;
    expect(manyInvitesByRoleLength * 2).toBe(manyInitialValuesLength);
  });

  it("where each email address repeats once per role (few invites)", () => {
    let fewInvitesByRoleLength = fewInvitesByRole.length;
    let fewInitialValues = createInitValues(fewInvitesByRole);
    let fewInitialValuesLength = Object.entries(fewInitialValues).length;
    expect(fewInvitesByRoleLength * 2).toBe(fewInitialValuesLength);
  });

  it("pairing invite emails with its role/s", () => {
    let initialValues = createInitValues(mixedRolesInvitesByRole);
    expect(initialValues).toEqual(memberOnlyHardcodedInitialValues);
  });
});

let noEmail = "";
let email = "hardcoded25@test.email";

let hardcodedCheckboxNames = [
  { name: "hardcoded25@test-member", label: "" },
  { name: "hardcoded25@test-owner", label: "" },
];

describe("createCheckboxNamesAndLabels returns an array", () => {
  it("with invites", () => {
    let checkboxNames = createCheckboxNamesAndLabels(email);
    expect(Array.isArray(checkboxNames)).toEqual(true);
  });

  it("with no invites", () => {
    let checkboxNames = createCheckboxNamesAndLabels(noEmail);
    expect(Array.isArray(checkboxNames)).toEqual(true);
  });

  it("where each email address repeats once per role", () => {
    let emailLength = 1;
    let checkboxNames = createCheckboxNamesAndLabels(email);
    let checkboxNamesLength = checkboxNames.length;
    expect(emailLength * 2).toBe(checkboxNamesLength);
  });

});
