let invitesByRole = (invites) => {
  let invitesByRole = invites.map((invite) => {
    // 1. get member and owner arrays for group
    let memberInvites = invite.member_invites.map(
      (member) => member.email_address
    );
    let ownerInvites = invite.owner_invites.map((owner) => owner.email_address);
    let combinedInvites = memberInvites.concat(ownerInvites).sort();
    // 2. remove duplicate emails
    let combinedUniqueInvites = combinedInvites.filter(
      (invite, i, invitesArrayCopy) => i === invitesArrayCopy.indexOf(invite)
    );
    // 3. create new object 
    let invitesByEmail = Object.assign(
      combinedUniqueInvites.map((invite, i) => ({
        email: invite,
        member: false,
        owner: false,
      }))
    );
    // 4. match the roles with each of the list it appears in
    return invitesByEmail.map((invite) => {
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
  });
  return invitesByRole[0];
};

export default invitesByRole;
