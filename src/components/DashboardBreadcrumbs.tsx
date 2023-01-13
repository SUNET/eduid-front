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
      <div className="breadcrumb">
        <FontAwesomeIcon icon={faHome as IconProp} />
        <FormattedMessage description="Start" defaultMessage="Start" />
      </div>
    );
  }
  return (
    <div className="breadcrumb">
      <Link key="/profile/" to="/profile/">
        <FontAwesomeIcon icon={faHome as IconProp} />
        <FormattedMessage description="Start" defaultMessage="Start" />
      </Link>
      / <FontAwesomeIcon icon={pageIcon} />
      {currentPage}
    </div>
  );
}
