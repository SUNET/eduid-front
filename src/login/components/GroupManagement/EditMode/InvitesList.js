import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import InvitesListItem from "./InvitesListItem";

class InvitesList extends Component {
  componentDidMount() {
    this.props.handleGetAllInvites();
  }

  render() {
    let groupsWithInvites = this.props.invitesFromMe;
    return (
      <div className="list-data invites">
        <div className="list-grid">
          <div className="list-cell left-align">
            <label>Invites</label>
          </div>
          <div className="list-cell">
            <label>Owner</label>
          </div>
          <div className="list-cell">
            <label>Member</label>
          </div>
          <div className="list-cell"></div>
        </div>
        <ul>
          {groupsWithInvites.map((group) => (
            <InvitesListItem
              key={group.group_identifier}
              membersList={group.member_invites}
            />
          ))}
        </ul>
      </div>
    );
  }
}

InvitesList.propTypes = {};

export default i18n(InvitesList);
