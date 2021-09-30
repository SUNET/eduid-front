// TEST DATA: what I have form backend
// [
//   {
//     display_name: "group 2",
//     email_address: "njons13@test.com",
//     group_identifier: "a45e1518-cce5-4027-b832-5539fbbc873e",
//     owners: [
//       {
//         display_name: "njons14@test.com",
//         identifier: "726dc9ea-32ed-41a8-b126-f794a468c0a0",
//       },
//     ],
//     role: "member",
//   },
//   {
//     display_name: "group 1",
//     email_address: "njons13@test.com",
//     group_identifier: "89e1518-cce5-4027-b832-5539fbbc873e",
//     owners: [
//       {
//         display_name: "njons14@test.com",
//         identifier: "726dc9ea-32ed-41a8-b126-f794a468c0a0",
//       },
//     ],
//     role: "member",
//   },
//   {
//     display_name: "group 1",
//     email_address: "njons13@test.com",
//     group_identifier: "89e1518-cce5-4027-b832-5539fbbc873e",
//     owners: [
//       {
//         display_name: "njons14@test.com",
//         identifier: "726dc9ea-32ed-41a8-b126-f794a468c0a0",
//       },
//     ],
//     role: "owner",
//   },
// ];

// TEST DATA: what I want result to look like
// let invitesToMeByRole = [
//   {
//     display_name: "Group 1",
//     email_address: "njons13@test.com",
//     group_identifier: "f60657f6-8e38-4011-9747-19fecbc34442",
//     roles: ["owner", "member"],
//     member: true,
//     owner: true,
//   },
//   {
//     display_name: "Group 2",
//     email_address: "njons13@test.com",
//     group_identifier: "a45e1518-cce5-4027-b832-5539fbbc873e",
//     roles: ["owner", "member"],
//     member: true,
//     owner: true,
//   },
// ];

let incomingInvitesByRole = (invites) => {
  if (invites.length === 0) return [];

  const modifiedInvites = invites.map(function(invite) {
    let modifiedInvite = {
      ...invite,
      member: false,
      owner: false
    }
    if (invite.role === 'member') {
      modifiedInvite.member = true
    } else if (invite.role === 'owner') {
      modifiedInvite.owner = true
    }
    return modifiedInvite;
  });

  return modifiedInvites
};

export default incomingInvitesByRole;
