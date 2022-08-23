import { AccountId } from "components/AccountId";
import { AccountLinking } from "components/AccountLinking";
import LadokContainer from "components/Ladok";
import SecurityContainer from "containers/Security";
import { Fragment } from "react";

/* The Dashboard "Advanced Settings" tab */
export function AdvancedSettings(): JSX.Element {
  return (
    <Fragment>
      <SecurityContainer />
      <AccountLinking />
      <LadokContainer />
      <AccountId />
    </Fragment>
  );
}
