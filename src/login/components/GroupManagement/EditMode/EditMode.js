import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
import { RenderOwnerList, RenderMemberList } from "../GroupListItem";
import EmailForm from "./EmailForm";

const SingleGroup = (props) => {
  return (
    <Fragment>
      <RenderOwnerList group={props.group} />
      <RenderMemberList group={props.group} />
    </Fragment>
  );
};

const EditMode = (props) => {
  return (
    <div className="edit-data">
      <div className="title">
        <p>Edit your group {props.group.group.display_name}</p>
        <button
          className="save-button"
          onClick={() => {
            props.toggleViewOrEditMode(props.group.group);
          }}
        >
          save
        </button>
      </div>
      <nav>
        <li>
          <p>Invites</p>
        </li>
        <li>
          <p>People</p>
        </li>
        <li>
          <p>Delete</p>
        </li>
      </nav>
      <div className="title">
        <p>Invite people to your group</p>
      </div>
      <p>
        You can invite people to a group via their email address. All invites
        will be sent to members, but you can upgrade specific individials to
        fellow admins.
      </p>
      <div className="invite-email">
        <EmailForm />
      </div>
      {/* <SingleGroup group={props.group} /> */}
    </div>
  );
};

EditMode.propTypes = {};

export default i18n(EditMode);
