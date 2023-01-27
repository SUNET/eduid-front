interface NameDisplayProps {
  label?: string | JSX.Element;
  name?: string | JSX.Element;
  htmlFor: string;
}

export default function NameDisplay({ label, name, htmlFor }: NameDisplayProps) {
  return (
    <div className="profile-grid-cell">
      <label aria-label={htmlFor}>
        <strong>{label}</strong>
      </label>
      <output id={htmlFor} className="display-data verified">
        {name}
      </output>
    </div>
  );
}
