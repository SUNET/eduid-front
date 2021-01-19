import React, { Component, Fragment } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import NameForm from "../NameForm";

const WizardHeading = (props) => {
  return (
    <Fragment>
      <p>Create your first group.</p>
      <button onClick={() => props.toggleCreateGroupOrGroupData()}>+</button>
    </Fragment>
  );
};

const CreateGroupHeading = (props) => {
  return (
    <Fragment>
      <p>Create a new group.</p>
      <button onClick={() => props.toggleCreateGroupOrGroupData()}>X</button>
    </Fragment>
  );
};

class CreateGroup extends Component {
  handleGroupName = (e) => {
    e.preventDefault();
    let groupName = this.props.values.groupName;
    // api call
    this.props.handleCreateGroup(groupName);
    // close panel
    this.props.toggleCreateGroupPanel();
  };

  render() {
    return (
      <Fragment>
        <div className="wizard">
          <div className="title">
            {this.props.hasNoGroups ? (
              <WizardHeading
                toggleCreateGroupOrGroupData={
                  this.props.toggleCreateGroupOrGroupData
                }
              />
            ) : (
              <CreateGroupHeading
                toggleCreateGroupOrGroupData={
                  this.props.toggleCreateGroupOrGroupData
                }
              />
            )}
          </div>
          <p>
            As the creator of a group you will be an admin, which allows you to
            edit the group and send out invites.
          </p>
          <div className="group-name">
            <NameForm
              form={"groupName"}
              label={"Group name"}
              placeholder={"Name your group"}
              helpBlock={""}
              handleSubmit={this.handleGroupName}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

CreateGroup.propTypes = {};

export default InjectIntl(CreateGroup);
