import React, { Component, Fragment } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import GroupNameForm from "../GroupNameForm";

const CloseButton = () => (
  <svg
    className="close"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 0h2v16H7z" />
    <path d="M0 9V7h16v2z" />
  </svg>
);

const RenderWizardOrCreateGroupHeading = (props) => {
  return (
    <Fragment>
      <p>
        {props.hasNoGroups ? "Create your first group." : "Create a new group."}
      </p>
      <button
        onClick={
          props.hasNoGroups
            ? () => console.log("This will expand a minimised wizard")
            : props.handleCloseCreateGroup
        }
      >
        <CloseButton />
      </button>
    </Fragment>
  );
};

class CreateGroup extends Component {
  handleGroupName = (e) => {
    e.preventDefault();
    let groupName = this.props.values.groupName;
    this.props.handleCreateGroup(groupName);
  };

  render() {
    return (
      <Fragment>
        <div className="wizard">
          <div className="title">
            <RenderWizardOrCreateGroupHeading {...this.props} />
          </div>
          <p>
            As the creator of a group you will be an admin, which allows you to
            edit the group and send out invites.
          </p>
          <div className="group-name">
            <GroupNameForm
              form={"groupName"}
              label={"Group name"}
              placeholder={"Name your group"}
              helpBlock={""}
              submitButton={true}
              handleSubmit={this.handleGroupName}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

// CreateGroup.propTypes = {};

export default InjectIntl(CreateGroup);
