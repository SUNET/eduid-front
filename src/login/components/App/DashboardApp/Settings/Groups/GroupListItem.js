import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";

export const RenderAdminList = (props) => {
  let admins = props.group.owners;
  return (
    <Fragment>
      <label>Admin</label>
      {admins.map((admin, i) => (
        <p key={admin.identifier}>
          {i + 1}. {admin.display_name}
        </p>
      ))}
    </Fragment>
  );
};

export const RenderMemberList = (props) => {
  let members = props.group.members;
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
      <RenderAdminList {...props} />
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
        key={this.props.group.identifier}
      >
        <div className="title">
          <div className="element-pair">
            <button
              className={
                this.state.openGroup ? "dropdown-open" : "dropdown-closed"
              }
            >
              ^
            </button>
            <p>{this.props.group.display_name}</p>
          </div>
          <button
            onClick={() => {
              this.props.toggleViewOrEditMode(this.props.group);
            }}
          >
            edit
          </button>
        </div>
        <div>
          <RenderOpenGroup openGroup={this.state.openGroup} {...this.props} />
        </div>
      </li>
    );
  }
}

GroupListItem.propTypes = {};

export default i18n(GroupListItem);
