import AccountId from "containers/AccountId";
import AccountLinkingContainer from "containers/AccountLinking";
import SecurityContainer from "containers/Security";
import { Fragment } from "react";
import LadokContainer from "./Ladok";

/* The Dashboard "Advanced Settings" tab */
export function AdvancedSettings(): JSX.Element {
  return (
    <Fragment>
      <SecurityContainer />
      <AccountLinkingContainer />
      <LadokContainer />
      <AccountId />
    </Fragment>
  );
}
