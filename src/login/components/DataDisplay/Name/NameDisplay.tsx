interface NameDisplayProps {
  label?: string | JSX.Element;
  name?: string | JSX.Element;
  htmlFor: string;
}

export default function NameDisplay({ label, name, htmlFor }: NameDisplayProps) {
  return (
    <div className="profile-grid-cell">
      <label id={htmlFor} htmlFor={htmlFor}>
        {label}
      </label>
      <span id={htmlFor} className="display-data verified">
        {name}
      </span>
    </div>
  );
}
