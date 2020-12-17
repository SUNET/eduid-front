import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import EmailForm from "../EditMode/EmailForm";

class CreateInvite extends Component {

  handleInviteEmail = (emailValue) => {
    let groupId = this.props.groupId;
    this.props.createInvite(emailValue, groupId);
  };

  render() {
    return (
      <Fragment>
        <div className="title">
          <p>Invite people to your group</p>
        </div>
        <p>
          You can invite people to a group via their email address. All invites
          will be sent to members, but you can upgrade specific individials to
          fellow admins.
        </p>
        <div className="invite-email">
          <EmailForm onSubmit={this.handleInviteEmail} />
        </div>
      </Fragment>
    );
  }
}

CreateInvite.propTypes = {};

export default i18n(CreateInvite);
