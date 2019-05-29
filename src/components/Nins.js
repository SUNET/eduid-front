import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonGroup } from "reactstrap";

import AddNin from "./AddNin";
import vettingRegistry from "vetting-registry";
import NotificationsContainer from "containers/Notifications";
import "style/Nins.scss";

class Nins extends Component {
  render() {
    let vettingButtons = "",
      connectNin = "";
  
    if (this.props.is_configured) {
      const vettingBtns = vettingRegistry(!this.props.valid_nin);
      const verifyOptions = this.props.proofing_methods.filter(
        option => option !== "oidc"
      );
      vettingButtons = verifyOptions.map((key, index) => {
        return (
          <div className="vetting-button" key={index}>
            {vettingBtns[key]}
          </div>
        );
      });
    }

    if (this.props.nins.length) {
      connectNin = [
        <div key="1" id="connect-nin-number">
          <h3> Step 2. Connect your national identity number to eduID</h3>
          <p>
            Choose a way below to verify that the given identity number belongs
            to you.
          </p>
          <div>
            <ButtonGroup vertical={true} id="nins-btn-group">
              {vettingButtons}
            </ButtonGroup>
          </div>
        </div>
      ];
    }
  
    return (
      <div id="nin-process">
        <NotificationsContainer />
        <div id="add-nin-number-container">
          <AddNin {...this.props} />
        </div>
        <div id="connect-nin-number-container">{connectNin}</div>
      </div>
    );
  }
}

Nins.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
  proofing_methods: PropTypes.array
};

export default Nins;
