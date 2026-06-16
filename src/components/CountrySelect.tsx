interface CountrySelectProps {
  id: string;
  label: string;
  options: Record<string, string>;
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelect({ id, label, options, value, onChange }: CountrySelectProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} name="country" required value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Bitte auswählen</option>
        {Object.entries(options).map(([optionValue, optionLabel]) => (
          <option value={optionValue} key={optionValue}>{optionLabel}</option>
        ))}
      </select>
    </>
  );
}
