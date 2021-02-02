import React, { Component, Fragment } from "react";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import CreateInviteForm from "./CreateInviteForm.js";

class CreateInvite extends Component {
  handleCreateInvite = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <Fragment>
        <div className="title">
          <p>Invite people to your group</p>
        </div>
        <p>
          Send an invite to anyone you want to add to your group. You will need
          to add an email address and set a membership for them.
        </p>
        <div className="create-invite">
          <CreateInviteForm
            {...this.props}
            handleSubmit={this.handleCreateInvite}
          />
        </div>
      </Fragment>
    );
  }
}

CreateInvite.propTypes = {};

export default i18n(CreateInvite);

