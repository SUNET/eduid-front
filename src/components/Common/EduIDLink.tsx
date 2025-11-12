import React from "react";
import { Link } from "react-router";

interface EduIDLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const EduIDLink: React.FC<EduIDLinkProps> = ({ to, className, children, ...rest }) => {
  if (to.startsWith("http")) {
    return (
      <a className={className} href={to} {...rest} target={rest.target || "_blank"} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={className} {...rest}>
      {children}
    </Link>
  );
};

export default EduIDLink;
