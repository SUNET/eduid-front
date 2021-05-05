import expect from "expect";
import disableInvitesNotInFocus from "../../login/app_utils/helperFunctions/disableInvitesNotInFocus";
import { mixedRolesInvitesByRole } from "./checkboxHelpers-test";

let updatedInvite9 = { email: "hardcoded9@test", member: true, owner: false };
let updatedInvite11 = { email: "hardcoded11@test", member: false, owner: true };

let disabledInvites9 = [
  { email: "hardcoded8@test.email", member: true, owner: true, disabled: true },
  {
    email: "hardcoded9@test.email",
    member: false,
    owner: true,
    disabled: false,
  },
  {
    email: "hardcoded10@test.email",
    member: true,
    owner: false,
    disabled: true,
  },
  {
    email: "hardcoded11@test.email",
    member: true,
    owner: true,
    disabled: true,
  },
  {
    email: "hardcoded12@test.email",
    member: true,
    owner: false,
    disabled: true,
  },
];

let disabledInvites11 = [
  { email: "hardcoded8@test.email", member: true, owner: true, disabled: true },
  {
    email: "hardcoded9@test.email",
    member: false,
    owner: true,
    disabled: true,
  },
  {
    email: "hardcoded10@test.email",
    member: true,
    owner: false,
    disabled: true,
  },
  {
    email: "hardcoded11@test.email",
    member: true,
    owner: true,
    disabled: false,
  },
  {
    email: "hardcoded12@test.email",
    member: true,
    owner: false,
    disabled: true,
  },
];

describe("disableInvitesNotInFocus returns an array", () => {
  it("with 'disabled:true' for each of the invites, apart from updatedInvite (hardcoded9@test), ", () => {
    let disabledInvites = disableInvitesNotInFocus(
      mixedRolesInvitesByRole,
      updatedInvite9
    );
    expect(disabledInvites).toEqual(disabledInvites9);
    expect(disabledInvites).not.toEqual(updatedInvite11);
  });

  it("with 'disabled:true' for each of the invites, apart from updatedInvite (hardcoded11@test), ", () => {
    let disabledInvites = disableInvitesNotInFocus(
      mixedRolesInvitesByRole,
      updatedInvite11
    );
    expect(disabledInvites).toEqual(disabledInvites11);
    expect(disabledInvites).not.toEqual(updatedInvite9);
  });
});
