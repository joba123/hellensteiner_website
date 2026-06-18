interface ErrorMessageInterface {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = "alter-error" }: ErrorMessageInterface) {
  return (
    <p className={className} aria-live="polite">{message}</p>
  );
}
