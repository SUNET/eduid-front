export function ToggleSwitchButton(props: any) {
  return (
    <form className="switch-field">
      <div className="switch-title">{props.title}</div>
      <input
        type="radio"
        id="switch_left"
        name="switchToggle"
        value={props.leftLabel}
        onChange={props.toggleState}
        checked={!props.toggle}
      />
      <label htmlFor="switch_left">{props.leftLabel}</label>

      <input
        type="radio"
        id="switch_right"
        name="switchToggle"
        value={props.rightLabel}
        onChange={props.toggleState}
        checked={props.toggle}
      />
      <label htmlFor="switch_right">{props.rightLabel}</label>
    </form>
  );
}
