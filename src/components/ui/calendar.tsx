"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { id } from "date-fns/locale"
import "react-day-picker/dist/style.css"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={id}
      showOutsideDays={showOutsideDays}
      className={cn("p-4 w-full flex justify-center", className)}
      classNames={{
        today: "text-brand font-bold bg-brand/10 rounded-lg",
        selected: "bg-brand text-white font-bold rounded-lg",
        ...classNames,
      }}

      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
