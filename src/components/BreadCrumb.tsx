import React from "react";

const BreadcrumbItem = ({ children, ...props }: any) => (
  <li className="breadcrumb-item" {...props}>
    {children}
  </li>
);

export function Breadcrumb({ ...props }) {
  let children = React.Children.toArray(props.children);

  children = children.map((child, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  children = children.reduce((row: any, child, index: number) => {
    row.push(
      child,
      <li key={index} className="breadcrumb-separator">
        /
      </li>
    );
    return row;
  }, []);

  return (
    <ol>
      {children}
      <li className="breadcrumb-item">{props.activeLink}</li>
    </ol>
  );
}
