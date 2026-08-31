import { ReactNode } from "react";

interface NameDisplayProps {
  label?: ReactNode;
  name?: ReactNode;
  htmlFor: string;
}

export function NameDisplay({ label, name, htmlFor }: Readonly<NameDisplayProps>) {
  return (
    <div className="profile-grid-cell">
      <span aria-label={htmlFor}>
        <strong>{label}</strong>
      </span>
      <output id={htmlFor} className="display-data verified">
        {name}
      </output>
    </div>
  );
}
