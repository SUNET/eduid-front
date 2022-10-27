import Emails from "components/Emails";
import Phones from "components/Phones";
import { Fragment, useEffect } from "react";
import PersonalDataParent from "../login/components/PersonalData/PersonalDataParent";
import { useIntl } from "react-intl";
import SecurityCenterDisplay from "./SecurityZoneDisplay";

/* The Dashboard "Settings" tab */
export function Settings(): JSX.Element {
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Settings",
      defaultMessage: "Settings | eduID",
    });
  }, []);

  return (
    <Fragment>
      <PersonalDataParent />
      <Emails />
      <Phones />
      <SecurityCenterDisplay />
    </Fragment>
  );
}
