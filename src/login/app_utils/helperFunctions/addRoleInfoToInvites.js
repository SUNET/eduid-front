let incomingInvitesByRole = (invites) => {
  if (invites.length === 0) return [];

  // 1. get unique ids from invites array
  const inviteIds = invites.map((invite) => invite.group_identifier);
  const uniqueInviteIds = inviteIds.filter(
    (value, i, self) => self.indexOf(value) === i
  );

  // ATTEMPT
  // const mutatedInvites = invites.map((invite, i, arrayCopyInvites) => {
  //   return Object.assign({
  //     index: i,
  //     ...invite,
  //     // roles: [invite.role],
  //     // member: invite.role === "member" ? true : false,
  //     // owner: invite.role === "owner" ? true : false,
  //   });
  //   // }
  //   // return invite;
  //   // console.log("invite.group_identifier", invite.group_identifier);
  // });
  // console.log("mutatedInvites", mutatedInvites);

  // 2. detect the group_identifiers that repeat (have both roles)
  //count repeating ids
  const countedIds = inviteIds.reduce((allInvites, invite, i) => {
    invite in allInvites ? allInvites[invite]++ : (allInvites[invite] = 1);
    return allInvites;
  }, {});
  const countedIdsArr = Object.entries(countedIds);
  // filter out entries with count > 1
  const inviteIdsWithBothRoles = countedIdsArr
    .filter((entry, i) => entry[1] > 1)
    .map((id, i) => id[0]);
  console.log("countedIds ", countedIds);
  console.log("inviteIdsWithBothRoles", inviteIdsWithBothRoles);

  // 3. ATTEMPT: map through invites adding role info based on knowledge
  // from inviteIdsWithBothRoles array
  // finally filter out groups with uniqueInviteIds array
  // const combinedRolesForSameInvite = invites.map((invite, i) => {
  //   console.log("invite", invite);
  //   console.log("invite.group_identifier", invite.group_identifier);
  //   /// console.log("inviteIdsWithBothRoles[0]", inviteIdsWithBothRoles[0]);
  //   console.log(inviteIdsWithBothRoles.includes(invite.group_identifier));
  //   return Object.assign({
  //     ...invite,
  //     roles: inviteIdsWithBothRoles.includes(invite.group_identifier)
  //       ? ["member", "owner"]
  //       : [invite.role],
  //     member: invite.role === "member" ? true : false,
  //     owner: invite.role === "owner" ? true : false,
  //   });
  // });
  // .filter((invite, i) => {
  //   console.log("uniqueInviteIds", uniqueInviteIds);
  //   console.log("invite.group_identifier", invite.group_identifier);
  //   // console.log(uniqueInviteIds.includes(invite.group_identifier));
  //   return uniqueInviteIds.includes(invite.group_identifier);
  // });

  // ATTEMPT: start with adding role info to all invites
  // const combinedRolesForSameInvite = invites.map((invite, i, self) => {
  //   console.log("invite", invite);
  //   return Object.assign({
  //     group: invite.group_identifier,
  //     roles: [
  //       { member: invite.role === "member" ? true : false },
  //       { owner: invite.role === "owner" ? true : false },
  //     ],
  //   });
  // });

  // ATTEMPT: set role info only on unique ids
  // const mapValues = invitesByRole.map((invite, i, self) => {
  //   if (self.indexOf(invite) === i) {
  //     return Object.assign({
  //       ...invite,
  //       roles: [invite.role],
  //       member: invite.role === "member" ? true : false,
  //       owner: invite.role === "owner" ? true : false,
  //     });
  //   }
  // });

  // ATTEMPT: set role info only on unique ids
  // const invitesByRole = Object.assign(
  //   uniqueInvites.map((invite, i) => ({
  //     ...invite,
  //     roles: invite.group_identifier.includes()
  //       ? ["member", "owner"]
  //       : [invite.role],
  //     member: invite.role === "member" ? true : false,
  //     owner: invite.role === "owner" ? true : false,
  //   }))
  // );
  // console.log("mapValues ", mapValues);
  // console.log("invitesWithRoleInfo", invitesWithRoleInfo);
  // console.log("combinedRolesForSameInvite ", combinedRolesForSameInvite);

  // console.log("invitesByRole", invitesByRole);

  // ATTEMPT: reduce through invites array and compare group_identifier
  // with the previous value (in array)
  // let uniqueInviteIds = invites.reduce(
  //   (previousValue, invite, i, invitesArrayCopy) => {
  //     // console.log("invitesArrayCopy", invitesArrayCopy);
  //     // if (previousValue.length > 0) {
  //     // if (invite.group_identifier === previousValue) {
  //     //   console.log("invite.group_identifier", invite.group_identifier);
  //     console.log("previousValue", previousValue);
  //     console.log(
  //       "previousValue.group_identifier",
  //       previousValue.group_identifier
  //     );
  //     console.log("previousValue[i]", previousValue[i]);
  //     //   // previousValue.push(invite);
  //     // }
  //     //   console.log("invite.group_identifier ", invite.group_identifier);
  //     //   console.log("previousValue ", i, previousValue);
  //     //   console.log(
  //     //     "previousValue.group_identifier",
  //     //     previousValue.group_identifier
  //     //   );
  //     // }
  //     // if (previousValue.length > 0) {
  //     // console.log(
  //     //   "previousValue[i] !== undefined",
  //     //   previousValue[i] !== undefined
  //     // );
  //     // if (previousValue[i] !== undefined) {
  //     // console.log(
  //     //   "previousValue !== undefined",
  //     //   previousValue[i] undefined
  //     // );
  //     // if (invite.group_identifier !== previousValue.group_identifier) {
  //     //   console.log(
  //     //     "invite.group_identifier !== previousValue.group_identifier",
  //     //     invite.group_identifier !== previousValue.group_identifier
  //     //   );
  //     //   return previousValue.push(
  //     //     Object.assign({
  //     //       ...invite,
  //     //       roles:
  //     //         invite.group_identifier === previousValue.group_identifier
  //     //           ? ["member", "owner"]
  //     //           : [invite.role],
  //     //       member: invite.role === "member" ? true : false,
  //     //       owner: invite.role === "owner" ? true : false,
  //     //     })
  //     //   );
  //     // }
  //     // return previousValue;
  //     // }
  //     // return previousValue;
  //     // previousValue.length > 0;
  //     // }
  //     // console.log("invite.group_identifier", invite.group_identifier);
  //     // console.log("previousValue[i]", previousValue[i]);
  //     // if (invite.group_identifier !== previousValue.group_identifier) {
  //     // console.log(
  //     //   "invite.group_identifier !== previousValue.group_identifier",
  //     //   invite.group_identifier !== previousValue.group_identifier
  //     // );
  //     // if (previousValue[i] !== undefined) {
  //     previousValue.push(
  //       Object.assign({
  //         ...invite,
  //         roles:
  //           invite.group_identifier === previousValue.group_identifier
  //             ? ["member", "owner"]
  //             : [invite.role],
  //         member: invite.role === "member" ? true : false,
  //         owner: invite.role === "owner" ? true : false,
  //       })
  //     );
  //     // }
  //     return previousValue;
  //   },
  //   []
  // );

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
};

export default incomingInvitesByRole;
