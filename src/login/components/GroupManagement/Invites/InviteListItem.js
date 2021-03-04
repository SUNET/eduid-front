import React, { Fragment } from "react";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

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
          <div className="hide-overflow list-cell left-align">
            <p>{email}</p>
          </div>
          <RenderRoleIndicators member={member} owner={owner} />
        </div>
      </li>
    </Fragment>
  );
};

// InviteListItem.propTypes = {};

export default InjectIntl(InviteListItem);
