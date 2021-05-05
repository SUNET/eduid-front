const disableInvitesNotInFocus = (invitesFromMeByRole, updatedInvite) => {
  return invitesFromMeByRole.map((invite) =>
    Object.assign({
      ...invite,
      disabled: invite.email.startsWith(updatedInvite.email) ? false : true,
    })
  );
};

export default disableInvitesNotInFocus;
