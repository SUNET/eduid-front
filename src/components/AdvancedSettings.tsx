import { AccountId } from "components/AccountId";
import { AccountLinking } from "components/AccountLinking";
import LadokContainer from "components/Ladok";
import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";

/* The Dashboard "Advanced Settings" tab */
export function AdvancedSettings(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Advanced Settings",
      defaultMessage: "Advanced Settings | eduID",
    });
  }, []);

  return (
    <Fragment>
      <AccountLinking />
      <LadokContainer />
      <AccountId />
    </Fragment>
  );
}
