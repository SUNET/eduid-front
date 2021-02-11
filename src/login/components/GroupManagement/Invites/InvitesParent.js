import React, { Component } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import CreateInvite from "./CreateInviteContainer";
import InvitesList from "./InvitesListContainer";

class InvitesParent extends Component {
  componentDidMount() {
    this.props.handleGetAllOutgoingInvites();
  }

  render() {
    let { groupsWithInvites } = this.props;
    let { identifier } = this.props.group;
    let groupHasInvites = groupsWithInvites.includes(identifier);

    return (
      <div className="invites">
        <CreateInvite groupId={identifier} />
        {groupHasInvites ? <InvitesList groupId={identifier} /> : null}
      </div>
    );
  }
}

// InvitesParent.propTypes = {};

export default InjectIntl(InvitesParent);
