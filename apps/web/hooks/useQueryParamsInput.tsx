import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'

import { FilterItemStyle } from '@/components/FilterStyle'
import { cn } from '@/lib/utils'

export default function useQueryParamsInput({
  key,
  label,
  placeholder,
}: {
  key: string
  label?: string
  placeholder?: string
}): [string, (className?: string) => JSX.Element] {
  const [query, setQuery] = useQueryState(key, { defaultValue: '' })
  const [value, setValue] = useState<string>(query)

  useEffect(() => {
    setValue(query)
  }, [query])

  useEffect(() => {
    setQuery(value.trim())
  }, [value, setQuery])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const renderQueryParamsInput = (className?: string) => (
    <FilterItemStyle>
      {key && (
        <>
          {label && (
            <Label className="font-regular" htmlFor={key}>
              {label}
            </Label>
          )}
          <Input
            placeholder={placeholder || '전체'}
            value={value}
            onChange={handleChange}
            className={cn(className)}
            type="search"
          />
        </>
      )}
    </FilterItemStyle>
  )

  return [query, renderQueryParamsInput]
}
