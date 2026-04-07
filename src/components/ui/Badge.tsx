import { type ReactNode } from "react";

type BadgeVariant = "tech" | "sector" | "brand" | "success";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  tech: "bg-nova-cyan-light text-nova-blue border border-nova-cyan label-tech",
  sector:
    "bg-nova-navy text-white border border-nova-navy/20 label-tech",
  brand:
    "bg-white/10 text-white border border-white/20 label-tech backdrop-blur-sm",
  success:
    "bg-green-50 text-green-700 border border-green-200 label-tech",
};

export function Badge({
  variant = "tech",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-1 rounded text-xs font-medium",
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
