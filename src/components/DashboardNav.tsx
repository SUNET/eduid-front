import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import { NavLink } from "react-router-dom";

// export for use in tests
export const activeClassName = "active";

interface DashboardNavProps {
  toggle(value: boolean): void;
}

function DashboardNav(props: DashboardNavProps): JSX.Element | null {
  const eppn = useDashboardAppSelector((state) => state.personal_data?.eppn);

  function closeMenu() {
    props.toggle(false);
  }

  if (!eppn) {
    return null;
  }

  return (
    <nav id="dashboard-nav">
      <ul className="horizontal-content-margin">
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? activeClassName : undefined)}
            to="/profile/"
            onClick={closeMenu}
            end
          >
            <FormattedMessage defaultMessage="Profile" description="Dashboard nav tab name" />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? activeClassName : undefined)}
            to="/profile/verify-identity/"
            onClick={closeMenu}
          >
            <FormattedMessage defaultMessage="Identity" description="Dashboard nav tab name" />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? activeClassName : undefined)}
            to="/profile/settings/personaldata"
            onClick={closeMenu}
          >
            <FormattedMessage defaultMessage="Settings" description="Dashboard nav tab name" />
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? activeClassName : undefined)}
            to="/profile/settings/advanced-settings"
            onClick={closeMenu}
          >
            <FormattedMessage defaultMessage="Advanced settings" description="Dashboard nav tab name" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default DashboardNav;
