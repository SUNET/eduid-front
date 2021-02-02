import React, { Component, Fragment } from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import CreateInvite from "./CreateInviteContainer";
import InvitesList from "./InvitesListContainer";

class InvitesParent extends Component {
  componentDidMount() {
    this.props.handleGetAllOutgoingInvites();
  }

  render() {
    let { group, groupsWithInvites } = this.props;
    // use the group id to filter out only the member info for the group in edit
    let groupIdInEdit = group.identifier;
    let membersListsGroupInEdit = groupsWithInvites
      .filter((group) => Object.keys(group).toString() === groupIdInEdit)
      .map((groupInEdit) => Object.values(groupInEdit));
    // check if memebrslist for the specific group in edit has members
    let groupHasInvites = membersListsGroupInEdit.length > 0;
    return (
      <Fragment>
        <CreateInvite groupId={groupIdInEdit} />
        {groupHasInvites ? (
          <Fragment>
            <div className="title">
              <p>Sent invites</p>
            </div>
            <InvitesList
              groupId={groupIdInEdit}
              membersList={membersListsGroupInEdit}
            />
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}

InvitesParent.propTypes = {};

export default i18n(InvitesParent);
