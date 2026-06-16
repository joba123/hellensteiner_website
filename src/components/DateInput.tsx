interface DateInputProps {
  id: string;
  label: string;
  placeholder: string;
  maxLength: number;
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ id, label, placeholder, maxLength, value, onChange }: DateInputProps) {
  return (
    <label htmlFor={id}>
      <span>{label}</span>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        maxLength={maxLength}
        placeholder={placeholder}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
