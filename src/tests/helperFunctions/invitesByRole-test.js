import { not } from "expect";
import invitesByRole from "../../login/app_utils/helperFunctions/invitesByRole";

let noInvites = [];
let invites = [
  {
    group_identifier: "1",
    member_invites: [
      { email_address: "member1@email.com" },
      { email_address: "member2@email.com" },
      { email_address: "member3@email.com" },
      { email_address: "member4@email.com" },
      { email_address: "both1@email.com" },
      { email_address: "both2@email.com" },
    ],
    owner_invites: [
      { email_address: "owner1@email.com" },
      { email_address: "owner2@email.com" },
      { email_address: "both1@email.com" },
      { email_address: "both2@email.com" },
    ],
  },
];

let memberInvites = [
  "member1@email.com",
  "member2@email.com",
  "member3@email.com",
  "member4@email.com",
  "both1@email.com",
  "both2@email.com",
];

let ownerInvites = [
  "owner1@email.com",
  "owner1@email.com",
  "both1@email.com",
  "both2@email.com",
];

test("invitesByRole returns an array", () => {
  let invitesFromMeByRole = invitesByRole(invites);
  expect(Array.isArray(invitesFromMeByRole)).toEqual(true);
});

test("invitesByRole returns an array, even with empty input ", () => {
  let invitesFromMeByRole = invitesByRole(noInvites);
  expect(Array.isArray(invitesFromMeByRole)).toEqual(true);
});

test("invitesByRole returns an array with only unique email addresses", () => {
  let memberInvitesLength = invites[0].member_invites.length;
  let ownerInvitesLength = invites[0].owner_invites.length;
  let invitesFromMeByRole = invitesByRole(invites);
  expect(invitesFromMeByRole.length).toBe(8);
  expect(invitesFromMeByRole.length).not.toBe(
    memberInvitesLength + ownerInvitesLength
  );
});

test("invitesByRole returns an array sorted in alpabetical order", () => {
  let unsortedInvites = memberInvites.concat(ownerInvites);
  let sortedInvites = memberInvites.concat(ownerInvites).sort();
  expect(unsortedInvites).not.toEqual(sortedInvites);

  let firstUnsortedEmail = unsortedInvites[0];
  let firstSortedEmail = sortedInvites[0];
  let invitesFromMeByRole = invitesByRole(invites);
  expect(invitesFromMeByRole[0].email).toEqual(firstSortedEmail);
  expect(invitesFromMeByRole[0].email).not.toEqual(firstUnsortedEmail);
});

test("invitesByRole returns an array pairing invite emails with its role/s", () => {
  let invitesFromMeByRole = invitesByRole(invites);
  let both1Email = invitesFromMeByRole[0];
  expect(both1Email.member).toEqual(true);
  expect(both1Email.owner).toEqual(true);

  let member1Email = invitesFromMeByRole[3];
  expect(member1Email.member).toEqual(true);
  expect(member1Email.owner).toEqual(false);

  let owner1Email = invitesFromMeByRole[6];
  expect(owner1Email.member).toEqual(false);
  expect(owner1Email.owner).toEqual(true);
});
