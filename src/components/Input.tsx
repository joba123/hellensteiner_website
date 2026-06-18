import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fieldClassName?: string;
  labelInSpan?: boolean;
}

export function Input({ label, fieldClassName, labelInSpan = false, ...inputProps }: InputProps) {
  return (
    <label className={fieldClassName}>
      {labelInSpan ? <span>{label}</span> : label}
      <input {...inputProps} />
    </label>
  );
}
