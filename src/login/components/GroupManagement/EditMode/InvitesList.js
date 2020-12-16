import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import InvitesListItem from "./InvitesListItem";

class InvitesList extends Component {
  handleRemoveInvite = () => {
    this.props.handleRemoveOutgoingInvite();
  };

  render() {
    let { groupId, membersList } = this.props;
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
          {membersList.map((list) => (
            <InvitesListItem
              key={groupId}
              membersList={list}
              handleRemoveInvite={this.handleRemoveInvite}
            />
          ))}
        </ul>
      </div>
    );
  }
}

InvitesList.propTypes = {};

export default i18n(InvitesList);
