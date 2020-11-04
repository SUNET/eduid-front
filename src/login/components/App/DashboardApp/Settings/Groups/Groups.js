import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../../../translation/InjectIntl_HOC_factory";
import WizardPanel from "../../../../Wizard/WizardPanel";
import DataPanel from "../../../../DataPanel/DataPanelContainer";
import ViewDataTable from "../../../../DataPanel/ViewDataTable";

const RenderCreateButton = (props) => {
  return (
    <Fragment>
      {props.data && (
        <button
          className="create-group"
          onClick={props.handleCreateGroup}
        >
          create group
        </button>
      )}
    </Fragment>
  );
};

class Groups extends Component {
  componentDidMount() {
    this.props.handleGetAllData();
  }

  render() {
    let renderGetAllGroups = "empty";
    const { data } = this.props
    console.log('this is data from deconstructed props:', data)
    if (data) {
      renderGetAllGroups  = ( 
         <div className="group-data">
           <pre>{JSON.stringify(data, null, 2)}</pre>
         </div>
      )
    }
    
    return (
      <article>
        <div className="intro">
          <div className="heading">
            <h4>Groups</h4>
            <RenderCreateButton
              handleCreateGroup={this.props.handleCreateGroup}
              data={data}
            />
          </div>
          <p>
            Create groups with other eduID users. What the groups are used for
            is up to you and the local services your univeristy provides.
          </p>
           {renderGetAllGroups}
        </div>
      </article>
    );
  }
}

Groups.propTypes = {};

export default InjectIntl(Groups);
