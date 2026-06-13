import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "unstyled";

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  href: string;
};

type ButtonProps = (NativeButtonProps | AnchorButtonProps) & {
  children?: ReactNode;
  variant?: ButtonVariant;
};

function getButtonClassName(variant: ButtonVariant, className?: string): string {
  const baseClassName = variant === "primary" ? "club-submit" : "";

  return [baseClassName, className].filter(Boolean).join(" ");
}

export function Button({ as = "button", children, className, variant = "primary", ...props }: ButtonProps) {
  const buttonClassName = getButtonClassName(variant, className);

  if (as === "a") {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a className={buttonClassName} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
}
