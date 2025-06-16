'use client';

import { Button } from '@repo/ui/button';
import { Calendar } from '@repo/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { cn, formatDate } from '@/lib/utils';

type SimpleDatePickerProps = {
  date: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
};

export function SimpleDatePicker({ date, onSelectDate }: SimpleDatePickerProps) {
  const handleDateSelect = (date: Date | undefined) => {
    onSelectDate(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon />
          {date ? formatDate({ date }) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
