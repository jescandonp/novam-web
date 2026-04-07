import { type ReactNode, type ButtonHTMLAttributes } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-nova-blue text-white border-2 border-nova-blue hover:bg-nova-blue-dark hover:border-nova-blue-dark focus-visible:ring-2 focus-visible:ring-nova-cyan focus-visible:ring-offset-2 shadow-[0_4px_14px_rgba(0,86,179,0.35)] hover:shadow-[0_6px_20px_rgba(0,86,179,0.45)] hover:-translate-y-0.5",
  secondary:
    "bg-transparent text-nova-blue border-2 border-nova-blue hover:bg-nova-blue hover:text-white focus-visible:ring-2 focus-visible:ring-nova-blue focus-visible:ring-offset-2",
  ghost:
    "bg-transparent text-nova-blue border-2 border-transparent hover:border-nova-blue focus-visible:ring-2 focus-visible:ring-nova-blue focus-visible:ring-offset-2",
  white:
    "bg-white text-nova-navy border-2 border-white hover:bg-transparent hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-nova-navy",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-sm gap-2",
  lg: "px-8 py-4 text-base gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  icon,
  iconPosition = "right",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-display font-bold tracking-wide uppercase rounded transition-all duration-200 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

  const classes = [
    base,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span aria-hidden="true">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span aria-hidden="true">{icon}</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
