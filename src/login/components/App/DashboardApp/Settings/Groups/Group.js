import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";

const RenderOpenGroup = (props) => {
  console.log("these are props:", props);
  return (
    <Fragment>
      <div className="element-pair">
        <button className="dropdown-open">^</button>
        {/* <p>{props.group.display_name}</p> */}
        <p>open group</p>
      </div>
      <button
        onClick={() => {
          props.toggleMode();
        }}
      >
        edit
      </button>
    </Fragment>
  );
};

const RenderClosedGroup = (props) => {
  return (
    <Fragment>
      <div className="element-pair">
        <button className="dropdown-closed">^</button>
        <p>{props.group.display_name}</p>
      </div>
      <button
        onClick={() => {
          props.toggleMode();
        }}
      >
        edit
      </button>
    </Fragment>
  );
};

class Group extends Component {
  state = {
    openGroup: false,
  };

  toggleGroupOpenClosed = (id) => {
    this.setState((prevState) => {
      return {
        openGroup: !prevState.openGroup,
      };
    });
  };

  render() {
    return (
      <li
        onClick={() => {
          this.toggleGroupOpenClosed();
        }}
        key={this.props.group.identifier}
      >
        {this.state.openGroup ? (
          <RenderOpenGroup {...this.props} />
        ) : (
          <RenderClosedGroup {...this.props} />
        )}
      </li>
    );
  }
}

Group.propTypes = {};

export default i18n(Group);
