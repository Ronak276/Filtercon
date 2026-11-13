import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-tight transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0284C7] text-white shadow hover:bg-[#0369A1]",
        secondary:
          "border-slate-200 bg-[#0F172A] text-white",
        tertiary:
          "border-green-100 bg-[#F0FDF4] text-[#16A34A]",
        outline: "text-slate-800 border-slate-200",
        accent: "border-sky-100 bg-[#F0F9FF] text-[#0284C7]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
