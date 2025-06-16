import { Label } from '@repo/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/select';
import { useQueryState } from 'nuqs';
import { ReactNode } from 'react';

import { FilterItemStyle } from '@/components/FilterStyle';
import { cn } from '@/lib/utils';

export default function useQueryParamsSelect({
  key,
  label,
  placeholder,
  options,
  defaultValue = '',
  disabled = false,
}: {
  key: string;
  label?: string;
  placeholder?: string;
  options: {
    label: ReactNode;
    value: string;
  }[];
  defaultValue?: string;
  disabled?: boolean;
}): [string, (className?: string) => JSX.Element] {
  const [query, setQuery] = useQueryState(key, { defaultValue });

  const onChange = (value: string) => {
    setQuery(value);
  };

  const renderQueryParamsSelect = (className?: string) => (
    <FilterItemStyle>
      {label && (
        <Label className="font-regular" htmlFor={key}>
          {label}
        </Label>
      )}
      <Select
        disabled={disabled}
        value={options.length > 0 ? query : undefined}
        onValueChange={(value) => {
          onChange(value);
        }}
      >
        <SelectTrigger className={cn(className)} disabled={options.length === 0}>
          <SelectValue placeholder={options.length === 0 ? '-' : placeholder || '전체'} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {/* FIXME: value 타입이슈로 any 적용 - https://github.com/radix-ui/primitives/issues/2706 */}
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SelectItem value={null as any}>전체</SelectItem>
            {options.map(({ label, value }, index) => {
              return (
                <SelectItem value={value} key={index}>
                  {label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FilterItemStyle>
  );

  return [query, renderQueryParamsSelect];
}
