import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variant === "default"
            ? "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground"
            : "border-border bg-background hover:bg-accent hover:text-accent-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
