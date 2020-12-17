import React, { Component, Fragment } from "react";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import WizardParent from "./Wizard/WizardParent";
import GroupsParent from "./Groups/GroupsParent";

const RenderCreateGroupButton = (props) => {
  return (
    <Fragment>
      {!props.hasNoGroups && (
        <button className="create-group" onClick={props.handleCreateGroup}>
          create group
        </button>
      )}
    </Fragment>
  );
};

const RenderWizardOrData = (props) => {
  if (props.loading) return <p>Loading...</p>;
  return props.hasNoGroups ? (
    <WizardParent {...props} />
  ) : (
    <GroupsParent {...props} />
  );
};

class GroupManagement extends Component {
  componentDidMount() {
    this.props.handleGetAllData();
  }

  render() {
    return (
      <article>
        <div className="intro">
          <div className="heading">
            <h4>Groups</h4>
            <RenderCreateGroupButton
              handleCreateGroup={this.props.handleCreateGroup}
              hasNoGroups={this.props.hasNoGroups}
            />
          </div>
          <p>
            Create groups with other eduID users. What the groups are used for
            is up to you and the local services your univeristy provides.
          </p>
          <RenderWizardOrData {...this.props} />
        </div>
      </article>
    );
  }
}

GroupManagement.propTypes = {};

export default InjectIntl(GroupManagement);
