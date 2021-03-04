import React, { Fragment } from "react";
import ButtonRemoveData from "../../Buttons/ButtonRemoveData";
import EditRolesForm from "./EditRolesForm";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

const RenderEmailAddress = ({ email }) => (
  <div className="hide-overflow list-cell">
    <p>{email}</p>
  </div>
);

const RenderEditRolesForm = ({ email }) => {
  let checkboxNames = [
    { name: `${email}-member`, label: "" },
    { name: `${email}-owner`, label: "" },
  ];
  return <EditRolesForm checkboxNames={checkboxNames} />;
};

const RenderRoleIndicators = ({ member, owner }) => (
  <Fragment>
    <div className="list-cell">{owner && "X"}</div>
    <div className="list-cell">{member && "X"}</div>
  </Fragment>
);

const RenderRemoveButton = () => (
  <div className="list-cell">
    <ButtonRemoveData
      className="icon-button"
      onClick={() => {
        console.log("you clicked the cross");
      }}
    />
  </div>
);

const InviteListItem = ({ columnNumber, invite, navId }) => {
  let { email, member, owner } = invite;
  return (
    <li>
      <div className="list-grid" id={columnNumber}>
        <RenderEmailAddress email={email} />
        {navId === "edit-invite" ? (
          <RenderEditRolesForm email={email} />
        ) : (
          <RenderRoleIndicators member={member} owner={owner} />
        )}
        {columnNumber === "four-columns" && <RenderRemoveButton />}
      </div>
    </li>
  );
};

// InviteListItem.propTypes = {};

export default InjectIntl(InviteListItem);
