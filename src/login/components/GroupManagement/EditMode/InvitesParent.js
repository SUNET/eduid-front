import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import CreateInvite from "./CreateInviteContainer";
import InvitesList from "./InvitesList";

class InvitesParent extends Component {
  componentDidMount() {
    this.props.handleGetAllOutgoingInvites();
  }

  // handleRemoveInvite = () => {
  //   this.props.handleRemoveOutgoingInvite();
  // };

  render() {
    let { group, invitesFromMe } = this.props;
    return (
      <Fragment>
        <CreateInvite groupId={group.identifier} />
        <InvitesList groupsWithInvites={invitesFromMe} />
      </Fragment>
    );
  }
}

InvitesParent.propTypes = {};

export default i18n(InvitesParent);
