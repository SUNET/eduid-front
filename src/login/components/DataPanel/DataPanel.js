import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../translation/InjectIntl_HOC_factory";

class DataPanel extends Component {
  // this component should:

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={"data-panel"}>
        <p> This will be the DataPanel component</p>
      </div>
    );
  }
}

DataPanel.propTypes = {};

export default InjectIntl(DataPanel);
