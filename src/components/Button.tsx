import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";

type ButtonVariante = "primary" | "unstyled";

type NativerButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  href: string;
};

type ButtonProps = (NativerButtonProps | LinkButtonProps) & {
  children?: ReactNode;
  variant?: ButtonVariante;
};

function getButtonKlassenName(variante: ButtonVariante, klassenName?: string): string {
  // Primary-Buttons bekommen die Standard-Klasse "club-absenden", sonst keine Basis-Klasse.
  const basisKlasse = variante === "primary" ? "club-absenden" : "";

  if (!klassenName) {
    return basisKlasse;
  }

  if (!basisKlasse) {
    return klassenName;
  }

  return `${basisKlasse} ${klassenName}`;
}

export function Button({ as = "button", children, className, variant = "primary", ...props }: ButtonProps) {
  const buttonKlassenName = getButtonKlassenName(variant, className);

  if (as === "a") {
    const linkProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    const ziel = linkProps.href ?? "";
    const istInternerLink = ziel.startsWith("/") && !ziel.startsWith("//") && !ziel.endsWith(".html");

    if (istInternerLink) {
      const { href: _ignoriert, ...rest } = linkProps;

      return (
        <Link className={buttonKlassenName} to={ziel} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a className={buttonKlassenName} {...linkProps}>
        {children}
      </a>
    );
  }

  const nativeButtonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={buttonKlassenName} {...nativeButtonProps}>
      {children}
    </button>
  );
}
