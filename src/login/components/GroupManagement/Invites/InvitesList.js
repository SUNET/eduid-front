import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import InviteListItem from "./InviteListItem";
import disableInvitesNotInFocus from "../../../app_utils/helperFunctions/disableInvitesNotInFocus";
import { createInitValues } from "../../../app_utils/helperFunctions/checkboxHelpers";
import invitesByRole from "../../../app_utils/helperFunctions/invitesByRole";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const RenderListHeading = () => {
  const navId = useSelector((state) => state.groups.navId);
  let columnNumber = navId === "edit-invite" ? "four-columns" : "three-columns";
  let headingText =
    columnNumber === "four-columns"
      ? ["Invites", "Member", "Owner", ""]
      : ["Invites", "Member", "Owner"];
  return (
    <div className="list-grid" id={columnNumber}>
      {headingText.map((text, i) => (
        <div key={i} className="list-cell">
          <label>{text}</label>
        </div>
      ))}
    </div>
  );
};

let RenderListItems = ({ invitesForGroup, pristine }) => {
  const [isUpdate, setsUpdateStatus] = useState(false);
  const navId = useSelector((state) => state.groups.navId);
  const updatedInvite = useSelector((state) => state.invites.updatedInvite);
  const invitesFromMeByRole = invitesByRole(invitesForGroup);
  const initialValues = createInitValues(invitesFromMeByRole);
  useEffect(() => {
    navId.includes("edit") ? setsUpdateStatus(true) : null;
  }, [updatedInvite]);
  let disabledInvites = isUpdate
    ? disableInvitesNotInFocus(invitesFromMeByRole, updatedInvite)
    : [];
  return (
    <div className="list-data invites">
      <ul>
        {!pristine
          ? disabledInvites.map((invite, i) => (
              <InviteListItem
                key={i}
                invite={invite}
                initialValues={initialValues}
              />
            ))
          : invitesFromMeByRole.map((invite, i) => (
              <InviteListItem
                key={i}
                invite={invite}
                initialValues={initialValues}
              />
            ))}
      </ul>
    </div>
  );
};

RenderListItems = reduxForm({
  form: "editInviteRole",
  destroyOnUnmount: false,
})(RenderListItems);

const InvitesList = ({ groupId, allInvitesFromMe }) => {
  let invitesForGroup = allInvitesFromMe.filter(
    (invite) => invite.group_identifier === groupId
  );
  return (
    <div className="invites-list">
      <h3>Sent invites</h3>
      <div className="list-data invites">
        <RenderListHeading />
        <RenderListItems invitesForGroup={invitesForGroup} />
      </div>
    </div>
  );
};

// InvitesList.propTypes = {};

export default InjectIntl(InvitesList);
