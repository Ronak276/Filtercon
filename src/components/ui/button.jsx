import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-xs font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#0284C7] text-white hover:bg-[#0369A1] shadow-sm shadow-sky-950/20",
        secondary: "bg-[#0F172A] text-white hover:bg-[#1E293B]",
        tertiary: "bg-[#16A34A] text-white hover:bg-[#15803D]",
        outline: "border border-slate-200 bg-white text-[#0F172A] hover:bg-slate-50 hover:border-slate-300",
        soft: "bg-[#F0F9FF] text-[#0284C7] hover:bg-[#E0F2FE] border border-sky-100",
        ghost: "hover:bg-slate-100 text-slate-700",
        link: "text-[#0284C7] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-xl px-3",
        lg: "h-13 rounded-2xl px-6 text-sm",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
