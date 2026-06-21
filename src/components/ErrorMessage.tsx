interface ErrorMessageInterface {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = "altersfehler" }: ErrorMessageInterface) {
  return (
    <p className={className} aria-live="polite">{message}</p>
  );
}
