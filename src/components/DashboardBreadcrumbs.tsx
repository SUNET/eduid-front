import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

interface DashboardBreadcrumbsTypes {
  pageIcon: IconProp;
  currentPage: string;
}

export function DashboardBreadcrumbs({ pageIcon, currentPage }: DashboardBreadcrumbsTypes): JSX.Element {
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
      <Link key="/start/" to="/start/" aria-label="go to start page">
        <FontAwesomeIcon icon={faHome as IconProp} />
        <FormattedMessage description="Start" defaultMessage="Start" />
      </Link>
      <span aria-hidden="true">/</span>
      <Link to="#" className="disabled" aria-label={`disabled link to ${currentPage}`}>
        <FontAwesomeIcon icon={pageIcon} />
        {currentPage}
      </Link>
    </nav>
  );
}
