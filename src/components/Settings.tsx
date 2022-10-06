import DeleteAccount from "components/DeleteAccount";
import SecurityContainer from "containers/Security";
import { Fragment } from "react";
import GroupManagement from "../login/components/GroupManagement/GroupManagement";
import { AccountLinking } from "./AccountLinking";
import ChangePasswordDisplay from "./ChangePasswordDisplay";
import LadokContainer from "./Ladok";
import { FormattedMessage } from "react-intl";

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
      <div className="intro">
        <h1>
          <FormattedMessage description="settings main title" defaultMessage="Settings" />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage description="settings description" defaultMessage="settings lead text" />
          </p>
        </div>
      </div>
      <AccountLinking />
      <RenderGroups />
      <LadokContainer />
      <section className="security-zone">
        <h2 className="security-text">Extra authentication features</h2>
        <p className="security-text">You need to login again to edit the features below... </p>
        <hr className="border-line" />
        <SecurityContainer />
        <ChangePasswordDisplay />
        <DeleteAccount />
      </section>
    </Fragment>
  );
}
