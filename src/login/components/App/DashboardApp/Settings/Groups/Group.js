import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";

export const RenderAdminList = (props) => {
  let admins = props.group.group.owners;
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
  let members = props.group.group.owners;
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

const AnimateDropdownIcon = (props) =>
  props.openGroup ? (
    <button className="dropdown-open">^</button>
  ) : (
    <button className="dropdown-closed">^</button>
  );

class Group extends Component {
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
    // console.log("these are this.props in Group", this.props);
    return (
      <li
        className="closed"
        onClick={() => {
          this.toggleGroupOpenClosed();
        }}
        key={this.props.group.group.identifier}
      >
        <div className="list-grid">
          <div className="title list-cell">
            <div className="element-pair">
              <AnimateDropdownIcon openGroup={this.state.openGroup} />
              <p>{this.props.group.group.display_name}</p>
            </div>
          </div>
          <div className="list-cell">X</div>
          <div className="list-cell">X</div>
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
        <div>
          <RenderOpenGroup openGroup={this.state.openGroup} {...this.props} />
        </div>
      </li>
    );
  }
}

Group.propTypes = {};

export default i18n(Group);
