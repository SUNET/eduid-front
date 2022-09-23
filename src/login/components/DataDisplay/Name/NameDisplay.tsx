interface NameDisplayProps {
  label?: string | JSX.Element;
  name?: string | JSX.Element;
}

export default function NameDisplay({ label, name }: NameDisplayProps) {
  return (
    <div className="profile-grid-cell">
      <label>{label}</label>
      <div className="display-data verified">{name}</div>
    </div>
  );
}
