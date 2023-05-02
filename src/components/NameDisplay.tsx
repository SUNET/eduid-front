import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function NameDisplay(): JSX.Element {
  let userData;
  const personal_data = useDashboardAppSelector((state) => state.personal_data);
  if (!personal_data.response?.given_name) {
    userData = (
      <Link to={`/start/settings/`} className="display-data unverified">
        <FormattedMessage description="profile name display no data" defaultMessage={`add name`} />
      </Link>
    );
  } else {
    userData = (
      <div className="display-data verified">
        {personal_data.response?.given_name} {personal_data.response?.surname}
      </div>
    );
  }
  return (
    <div key="0" className="profile-grid-cell">
      <label key="0" htmlFor="id number">
        <FormattedMessage description="profile name display title" defaultMessage={`Name`} />
      </label>
      {userData}
    </div>
  );
}

export default NameDisplay;
