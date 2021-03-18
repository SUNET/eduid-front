import React from "react";
import { useSelector } from "react-redux";
import { reduxForm } from "redux-form";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import InviteListItem from "./InviteListItem";
import createInvitesByRole from "../../../app_utils/helperFunctions/invitesByRole";
import { createInitValues } from "../../../app_utils/helperFunctions/checkboxHelpers";
import disableInvitesNotInFocus from "../../../app_utils/helperFunctions/disableInvitesNotInFocus";

const RenderListHeading = () => {
  const navId = useSelector((state) => state.groups.navId);
  let columnNumber = navId.includes("edit") ? "four-columns" : "three-columns";
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

let RenderListItems = ({
  invitesByRole,
  initialValues,
  pristine,
  invalid,
  anyTouched,
}) => {
  // set disabled status on all invites that were not clicked
  const updatedInvite = useSelector((state) => state.invites.updatedInvite);
  const disabledInvitesByRole = disableInvitesNotInFocus(
    invitesByRole,
    updatedInvite
  );
  // toggle invites with or without disable status
  let invitesArray =
    anyTouched && !pristine ? disabledInvitesByRole : invitesByRole;
  return (
    <div className="list-data invites">
      <ul>
        {invitesArray.map((invite, i) => (
          <InviteListItem
            key={i}
            invite={invite}
            initialValues={initialValues}
          />
        ))}
      </ul>
      {anyTouched && invalid ? (
        <div className="small form-text">
          <span className={"input-validate-error"}>
            At least one membership must be set to update an invite
          </span>
        </div>
      ) : null}
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
  // transform the data into the structures needed to render checkboxes
  const invitesByRole = createInvitesByRole(invitesForGroup);
  const initialValues = createInitValues(invitesByRole);
  return (
    <div className="invites-list">
      <h3>Sent invites</h3>
      <div className="list-data invites">
        <RenderListHeading />
        <RenderListItems
          initialValues={initialValues}
          invitesByRole={invitesByRole}
        />
      </div>
    </div>
  );
};

// InvitesList.propTypes = {};

export default InjectIntl(InvitesList);
