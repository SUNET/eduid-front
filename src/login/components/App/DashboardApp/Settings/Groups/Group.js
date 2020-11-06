import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";

const RenderAdminList = (props) => {
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

const RenderMemberList = (props) => {
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
            <AnimateDropdownIcon openGroup={this.state.openGroup} />
            <p>{this.props.group.display_name}</p>
          </div>
          <button
            onClick={() => {
              props.toggleMode();
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

Group.propTypes = {};

export default i18n(Group);
