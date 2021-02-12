let invitesByRole = (invites) => {
  if (invites.length === 0) return [];
  // 1. combine invite email addresses
  let inviteEmailAddresses = invites.map((invite) => {
    let members = invite.member_invites.map((member) => member.email_address);
    let owners = invite.owner_invites.map((owner) => owner.email_address);
    return { members, owners };
  });
  let memberInvites = inviteEmailAddresses[0].members;
  let ownerInvites = inviteEmailAddresses[0].owners;
  let combinedInvites = memberInvites.concat(ownerInvites).sort();
  // 2. remove duplicate  email addresses
  let combinedUniqueInvites = combinedInvites.filter(
    (invite, i, invitesArrayCopy) => i === invitesArrayCopy.indexOf(invite)
  );
  // 3. create new object (roles set to false)
  let invitesByEmail = Object.assign(
    combinedUniqueInvites.map((invite, i) => ({
      email: invite,
      member: false,
      owner: false,
    }))
  );
  // 4. Match the roles with the list in which it appears
  let invitesByRole = invitesByEmail.map((invite) => {
    if (
      memberInvites.includes(invite.email) &&
      ownerInvites.includes(invite.email)
    ) {
      invite.member = true;
      invite.owner = true;
    } else if (memberInvites.includes(invite.email)) {
      invite.member = true;
    } else {
      invite.owner = true;
    }
    return invite;
  });
  return invitesByRole;
};

export default invitesByRole;
