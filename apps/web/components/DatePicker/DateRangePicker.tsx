'use client';

import { Button } from '@repo/ui/button';
import { Calendar } from '@repo/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { cn, formatDate } from '@/lib/utils';

type DatePickerWithRangeProps = {
  date: DateRange | undefined;
  onSelectDate: (range: DateRange | undefined) => void;
};

export function DatePickerWithRange({ date, onSelectDate }: DatePickerWithRangeProps) {
  const handleDateSelect = (date: DateRange | undefined) => {
    onSelectDate(date);
  };

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'h-[40px] w-[200px] justify-start text-left font-normal px-3 py-4',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate({
                    date: {
                      from: date.from,
                      to: date.to,
                    },
                  })}
                </>
              ) : (
                formatDate({ date: { from: date.from } })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
