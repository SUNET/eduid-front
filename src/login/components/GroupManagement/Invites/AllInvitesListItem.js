import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import ButtonRemoveData from "../../Buttons/ButtonRemoveData";
import {
  acceptInviteMember,
  acceptInviteOwner,
} from "../../../redux/actions/postAcceptInviteActions";
import {
  declineInviteMember,
  declineInviteOwner,
} from "../../../redux/actions/postDeclineInviteActions";

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

const RenderRemoveButton = ({ invite }) => {
  const dispatch = useDispatch();
  const { group_identifier, email_address, roles } = invite;
  const handleRejectInvite = () => {
    if (roles.length > 1) {
      dispatch(declineInviteMember(group_identifier, email_address));
      dispatch(declineInviteOwner(group_identifier, email_address));
    } else {
      if (roles.includes("member")) {
        dispatch(declineInviteMember(group_identifier, email_address));
      } else if (roles.includes("owner")) {
        dispatch(declineInviteOwner(group_identifier, email_address));
      }
    }
  };
  return (
    <div className="list-cell">
      <ButtonRemoveData
        className="icon-button"
        onClick={() => handleRejectInvite()}
      />
    </div>
  );
};

const RenderAcceptButton = ({ invite }) => {
  const dispatch = useDispatch();
  const { group_identifier, email_address, roles } = invite;
  const handleAcceptInvite = () => {
    if (roles.length > 1) {
      dispatch(acceptInviteMember(group_identifier, email_address));
      dispatch(acceptInviteOwner(group_identifier, email_address));
    } else {
      if (roles.includes("member")) {
        dispatch(acceptInviteMember(group_identifier, email_address));
      } else if (roles.includes("owner")) {
        dispatch(acceptInviteOwner(group_identifier, email_address));
      }
    }
  };
  return (
    <div className="list-cell">
      <button className="accept">
        <FontAwesomeIcon icon={faCheck} onClick={() => handleAcceptInvite()} />
      </button>
    </div>
  );
};

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
        <RenderAcceptButton invite={invite} />
        <RenderRemoveButton invite={invite} />
      </div>
      <RenderOpenInvite open={open} invite={invite} />
    </li>
  );
};

export default InjectIntl(AllInvitesListItem);
