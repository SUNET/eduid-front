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
  console.log("activeLink", props.activeLink);
  children = children.reduce((row: any, child, index: number) => {
    row.push(
      child,
      props.activeLink !== null && (
        <li key={index} className="breadcrumb-separator">
          /
        </li>
      )
    );
    return row;
  }, []);

  return (
    <ol className="breadcrumb">
      {children}
      <li className="breadcrumb-item">{props.activeLink}</li>
    </ol>
  );
}
