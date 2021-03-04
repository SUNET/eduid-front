import React, { Fragment } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const RenderEmailAddress = ({ email }) => (
  <div className="hide-overflow list-cell">
    <p>{email}</p>
  </div>
);

const RenderRoleIndicators = ({ member, owner }) => (
  <Fragment>
    <div className="list-cell">{owner && "X"}</div>
    <div className="list-cell">{member && "X"}</div>
  </Fragment>
);

const InviteListItem = ({ invite }) => {
  let { email, member, owner } = invite;
  return (
    <Fragment>
      <li>
        <div className="list-grid" id="three-columns">
          <RenderEmailAddress email={email} />
          <RenderRoleIndicators member={member} owner={owner} />
        </div>
      </li>
    </Fragment>
  );
};

// InviteListItem.propTypes = {};

export default InjectIntl(InviteListItem);
