import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import PhoneNumDisplay from "../../../DataDisplay/PhoneNumber/PhoneNumDisplay_container";
import PrimaryButton from "../../../Buttons/ButtonPrimary";
import Link from "../../../Links/Link";

// import i18n from "InjectIntl_HOC_factory";

// import "./Resetting.scss";

class GetConfirmationCode extends Component {
  render() {
    // console.log("these are the props in EmailSent:", this.props);
    return (
      <React.Fragment>
        <div className="data-display-button-container">
          <PhoneNumDisplay {...this.props} />
          <PrimaryButton
            id={"get-confirmation-code"}
            disabled={false}
            onClick={this.props.handleGetConfirmCode}
          >
            Send me a code
          </PrimaryButton>
        </div>
        <Link
          id={"bypass-confirmation-code"}
          href={"/reset/reset-password/set-new-password/"}
          text={"I want to set a new password and delete my identity."}
        />
      </React.Fragment>
    );
  }
}

GetConfirmationCode.propTypes = {};

export default withRouter(GetConfirmationCode);
