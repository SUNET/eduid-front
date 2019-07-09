import React, { Component } from "react";
import PropTypes from "prop-types";
import { ButtonGroup } from "reactstrap";
import { connect } from "react-redux";
import DashboardNav from "./DashboardNav";
import AddNin from "./AddNin";
import NotificationsContainer from "containers/Notifications";
import vettingRegistry from "vetting-registry";

import "style/Nins.scss";

class VerifyIdentityProcess extends Component {
  render() {
    let vettingButtons = "",
      connectNin = "";
    let buttonTextArray = [
      "Recieve a confirmation code in the mail",
      "Recieve a confirmation code to your mobile phone",
      "Use the FrejaID app"
    ];
    if (this.props.is_configured) {
      const vettingBtns = vettingRegistry(!this.props.valid_nin);
      const verifyOptions = this.props.proofing_methods.filter(
        option => option !== "oidc"
      );
      vettingButtons = verifyOptions.map((key, index) => {
        let text = buttonTextArray[index];
        return (
          <div className="vetting-button" key={index}>
            {/* <p className="vetting-button-text">{text}</p> */}
            {vettingBtns[key]}
          </div>
        );
      });
    }

    
    if (this.props.nins.length && !this.props.verifiedNinStatus) {
      connectNin = [
        <div key="1" id="connect-nin-number">
          <label>
            {" "}
            2. Choose a way below to verify that the given identity number
            belongs to you.
          </label>
          {/* <p className="profile-data">Request a confirmation code to</p>*/}
          <div>
            <ButtonGroup vertical={true} id="nins-btn-group">
              {vettingButtons}
            </ButtonGroup>
          </div>
        </div>
      ];
    }

    return (
      <div id="verify-identity-container">
        <h3 className="verify-identity-header">
          Add and verify your id number here
        </h3>
        <AddNin {...this.props} />
        {connectNin}
      </div>
    );
  }
}

// Nins.propTypes = {
//   nin: PropTypes.string,
//   nins: PropTypes.array,
//   validateNin: PropTypes.func,
//   handleDelete: PropTypes.func,
//   proofing_methods: PropTypes.array
// };

export default VerifyIdentityProcess;
