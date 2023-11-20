import * as React from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "../../lib/utils/cn";
import { IconCalendar } from "@tabler/icons-react";
import { Calendar } from "./calendar";

type CalendarPopoverProps = {
  date: Date | undefined;
  onDateChange: (date: Date) => void;
};

export function CalendarPopover({ date, onDateChange }: CalendarPopoverProps) {
  const handleDateChange = (date: Date | undefined) => {
    if (date) onDateChange(date);
  };
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <IconCalendar className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Wybierz date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
