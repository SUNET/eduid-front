import expect from "expect";
import { emptyValueValidation } from "../../login/app_utils/validation/emptyValueValidation";

// input values
let anyValue = { key: "anyValue" };
let minmalValue = { key: "X" };
let noPasswordValue = { password: "" };
let noGroupNameValue = { groupName: "" };

// expected error replies
const valid = {};
const pwRequiredError = { password: "required" };
const groupNameRequiredError = { groupName: "required" };

describe("emptyValueValidation indicates a valid answer if any value", () => {
  it("with password value", () => {
    let validation = emptyValueValidation(anyValue);
    expect(validation).toEqual(valid);
  });

  it("with minimal value", () => {
    let validation = emptyValueValidation(minmalValue);
    expect(validation).toEqual(valid);
  });
});

describe("emptyValueValidation indicates an error if no value", () => {
  it("without password value", () => {
    let validation = emptyValueValidation(noPasswordValue);
    expect(validation).toEqual(pwRequiredError);
  });

  it("without group name value", () => {
    let validation = emptyValueValidation(noGroupNameValue);
    expect(validation).toEqual(groupNameRequiredError);
  });
});

describe("emptyValueValidation returns an error object with a value for a specific key", () => {
  it("error specific for the key 'password'", () => {
    let validation = emptyValueValidation(noPasswordValue);
    expect(validation).toEqual(pwRequiredError);
    expect(validation).not.toEqual(groupNameRequiredError);
  });

  it("error specific for the key 'group name'", () => {
    let validation = emptyValueValidation(noGroupNameValue);
    expect(validation).toEqual(groupNameRequiredError);
    expect(validation).not.toEqual(pwRequiredError);
  });

});
