import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../translation/InjectIntl_HOC_factory";
// import { RenderOwnerList, RenderMemberList } from "../GroupListItem";
import CreateInvite from "./CreateInviteContainer";
import InvitesList from "./InvitesListContainer";

// const SingleGroup = (props) => {
//   return (
//     <Fragment>
//       <RenderOwnerList group={props.group} />
//       <RenderMemberList group={props.group} />
//     </Fragment>
//   );
// };

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
      <CreateInvite groupId={props.group.group.identifier} />
      <InvitesList />
      {/* <SingleGroup group={props.group} /> */}
    </div>
  );
};

EditMode.propTypes = {};

export default i18n(EditMode);
