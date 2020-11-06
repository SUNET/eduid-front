import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../../../translation/InjectIntl_HOC_factory";


const RenderOpenGroup = (props) => {
  console.log("these are props:", props);
  return props.openGroup ? (
    <Fragment>
      <p>{props.group.identifier}</p>

    </Fragment>
  ) : null;
};

const AnimateDropdownIcon = (state) =>
  state.openGroup ? (
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
            <AnimateDropdownIcon {...this.state} />
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
