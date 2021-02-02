import React, { Component } from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import InviteListItem from "./InviteListItem";

class InvitesList extends Component {
  handleRemoveInvite = () => {
    this.props.handleRemoveOutgoingInvite();
  };

  render() {
    let { groupId, membersList } = this.props;
    return (
      <div className="invites-list">
        <div className="title">
          <p>Sent invites</p>
        </div>
        <div className="list-data invites">
          <div className="list-grid" id="three-columns">
            <div className="list-cell left-align">
              <label>Invites</label>
            </div>
            <div className="list-cell">
              <label>Owner</label>
            </div>
            <div className="list-cell">
              <label>Member</label>
            </div>
          </div>
          <ul>
            {membersList.map((list) => (
              <InviteListItem
                key={groupId}
                membersList={list}
                handleRemoveInvite={this.handleRemoveInvite}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

InvitesList.propTypes = {};

export default i18n(InvitesList);
