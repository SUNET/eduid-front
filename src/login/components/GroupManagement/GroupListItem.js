import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../translation/InjectIntl_HOC_factory";

export const RenderOwnerList = (props) => {
  let owners = props.group.group.owners;
  return (
    <Fragment>
      <label>Owner</label>
      {owners.map((owner, i) => (
        <p key={owner.identifier}>
          {i + 1}. {owner.display_name}
        </p>
      ))}
    </Fragment>
  );
};

export const RenderMemberList = (props) => {
  let members = props.group.group.members;
  return (
    <Fragment>
      <label>Member</label>
      {members.map((member, i) => (
        <p key={member.identifier}>
          {i + 1}. {member.display_name}
        </p>
      ))}
    </Fragment>
  );
};

const RenderOpenGroup = (props) => {
  return props.openGroup ? (
    <div className="open-group">
      <RenderOwnerList {...props} />
      <RenderMemberList {...props} />
    </div>
  ) : null;
};

class GroupListItem extends Component {
  state = {
    openGroup: false,
  };

  toggleGroupOpenClosed = () => {
    this.setState((prevState) => {
      return {
        openGroup: !prevState.openGroup,
      };
    });
  };

  render() {
    return (
      <li
        className="closed"
        onClick={() => {
          this.toggleGroupOpenClosed();
        }}
      >
        <div className="list-grid">
          <div className="title list-cell">
            <div className="element-pair">
              <button
                className={
                  this.state.openGroup ? "dropdown-open" : "dropdown-closed"
                }
              >
                ^
              </button>
              <p>{this.props.group.group.display_name}</p>
            </div>
          </div>
          <div className="list-cell">
            <div className={this.state.openGroup ? "transparent" : null}>
              {this.props.group.isOwner ? "X" : null}
            </div>
          </div>
          <div className="list-cell">
            <div className={this.state.openGroup ? "transparent" : null}>
              {this.props.group.isMember ? "X" : null}
            </div>
          </div>
          <div className="list-cell">
            <button
              onClick={() => {
                this.props.toggleViewOrEditMode(this.props.group);
              }}
            >
              edit
            </button>
          </div>
        </div>
        <RenderOpenGroup openGroup={this.state.openGroup} {...this.props} />
      </li>
    );
  }
}

GroupListItem.propTypes = {};

export default i18n(GroupListItem);
