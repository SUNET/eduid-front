interface NameDisplayProps {
  label?: string | React.JSX.Element;
  name?: string | React.JSX.Element;
  htmlFor: string;
}

export default function NameDisplay({ label, name, htmlFor }: NameDisplayProps) {
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
