import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";
import WizardPanel from "../Wizard/WizardPanel";
import DataPanel from "../DataPanel/DataPanelContainer";

const RenderCreateGroupButton = (props) => {
  return (
    <Fragment>
      {!props.noGroups && (
        <button className="create-group" onClick={props.handleCreateGroup}>
          create group
        </button>
      )}
    </Fragment>
  );
};

const RenderWizardOrData = (props) => {
  if (props.loading) return <p>Loading...</p>;
  return props.noGroups ? <WizardPanel {...props} /> : <DataPanel {...props} />;
};

class Groups extends Component {
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
              noGroups={this.props.noGroups}
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

Groups.propTypes = {};

export default InjectIntl(Groups);
