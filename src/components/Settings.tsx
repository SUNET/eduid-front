import DeleteAccount from "components/DeleteAccount";
import SecurityContainer from "containers/Security";
import { Fragment } from "react";
import GroupManagement from "../login/components/GroupManagement/GroupManagement";
import { AccountLinking } from "./AccountLinking";
import ChangePasswordDisplay from "./ChangePasswordDisplay";
import LadokContainer from "./Ladok";

function RenderGroups(): JSX.Element | null {
  // functionality to be removed when groups feature is released
  const showComponent = false;
  if (!showComponent) return null;

  return <GroupManagement />;
}

/* The Dashboard "Settings" tab */
export function Settings(): JSX.Element {
  return (
    <Fragment>
      <AccountLinking />
      <RenderGroups />
      <LadokContainer />
      <SecurityContainer />
      <ChangePasswordDisplay />
      <DeleteAccount />
    </Fragment>
  );
}
