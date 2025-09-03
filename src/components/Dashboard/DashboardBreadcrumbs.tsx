import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router";

interface DashboardBreadcrumbsTypes {
  readonly pageIcon?: IconProp;
  readonly currentPage: string;
  readonly icon?: string;
}

export function DashboardBreadcrumbs({ pageIcon, currentPage, icon }: DashboardBreadcrumbsTypes): React.JSX.Element {
  if (currentPage === "Start") {
    return (
      <nav className="breadcrumb" aria-label="breadcrumb">
        <Link to="#" className="disabled" aria-label="disabled link to start page">
          <FontAwesomeIcon icon={faHome as IconProp} />
          <FormattedMessage description="Start" defaultMessage="Start" />
        </Link>
      </nav>
    );
  }
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <Link key="/profile/" to="/profile/" aria-label="go to start page">
        <FontAwesomeIcon icon={faHome as IconProp} />
        <FormattedMessage description="Start" defaultMessage="Start" />
      </Link>
      <span aria-hidden="true">/</span>
      <Link to="#" className="disabled" aria-label={`disabled link to ${currentPage}`}>
        {pageIcon ? (
          <FontAwesomeIcon icon={pageIcon} />
        ) : (
          <img height="18" src={icon} alt={`current page ${currentPage}`} />
        )}
        {currentPage}
      </Link>
    </nav>
  );
}
