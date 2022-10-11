import NinDisplay from "components/NinDisplay";
import EmailDisplay from "components/EmailDisplay";
import NameDisplay from "components/NameDisplay";
import PhoneDisplay from "components/PhoneDisplay";
import { useDashboardAppSelector } from "dashboard-hooks";
import { useEffect } from "react";
import { useIntl } from "react-intl";

export default function Profile(): JSX.Element {
  const nin = useDashboardAppSelector((state) => state.identities.nin);
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Profile",
      defaultMessage: "Profile | eduID",
    });
  }, []);

  return (
    <div id="profile-grid">
      <NameDisplay />
      <NinDisplay nin={nin} allowDelete={false} />
      <PhoneDisplay />
      <EmailDisplay />
    </div>
  );
}
