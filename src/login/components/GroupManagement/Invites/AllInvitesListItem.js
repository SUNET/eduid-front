import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import ButtonRemoveData from "../../Buttons/ButtonRemoveData";

const RenderOpenInvite = ({ open, invite }) => {
  const { owner, member } = invite;
  return open ? (
    <div className="list-cell">
      <p>
        Invited as {owner && "owner"} {member && "member"}
      </p>
    </div>
  ) : null;
};

const RenderGroupName = ({ display_name, open }) => {
  return (
    <div className="title hide-overflow list-cell">
      <div className="element-pair">
        <button className={open ? "dropdown-open" : "dropdown-closed"}>
          ^
        </button>
        <p>{display_name}</p>
      </div>
    </div>
  );
};

const RenderRoleIndicators = ({ member, owner, open }) => {
  return (
    <Fragment>
      <div className="list-cell"> {!open && owner ? "X" : null}</div>
      <div className="list-cell">{!open && member ? "X" : null}</div>
    </Fragment>
  );
};

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

const RenderAcceptButton = () => (
  <div className="list-cell">
    <button className="accept">
      <FontAwesomeIcon
        icon={faCheck}
        onClick={() => {
          console.log("you accepted the invite");
        }}
      />
    </button>
  </div>
);

const AllInvitesListItem = ({ invite }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="closed" onClick={() => setOpen(!open)}>
      <div className="list-grid" id="five-columns">
        <RenderGroupName display_name={invite.display_name} open={open} />
        <RenderRoleIndicators
          open={open}
          member={invite.member}
          owner={invite.owner}
        />
        <RenderAcceptButton />
        <RenderRemoveButton />
      </div>
      <RenderOpenInvite open={open} invite={invite} />
    </li>
  );
};

export default InjectIntl(AllInvitesListItem);
