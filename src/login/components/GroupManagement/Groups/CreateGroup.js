import React, { Component, Fragment } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import NameForm from "../NameForm";

class CreateGroup extends Component {
  state = { firstInvite: true };

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
        {this.props.openPanel && (
          <div className="wizard">
            <div className="title">
              <p>
                Create {this.props.hasNoGroups ? "your first" : "a new"} group.
              </p>
              <button onClick={() => this.props.toggleCreateGroupPanel()}>
                X
              </button>
            </div>
            <p>
              As the creator of a group you will be an admin, which allows you
              to edit the group and send out invites.
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
        )}
      </Fragment>
    );
  }
}

CreateGroup.propTypes = {};

export default InjectIntl(CreateGroup);
