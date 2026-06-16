interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = "alter-error" }: ErrorMessageProps) {
  return (
    <p className={className} aria-live="polite">{message}</p>
  );
}
