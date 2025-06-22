import { Label } from '@repo/ui/label'
import { addDays, format, parse, subDays } from 'date-fns'
import { useQueryState } from 'nuqs'
import { DateRange } from 'react-day-picker'

import { DatePickerWithRange } from '@/components/DatePicker/DateRangePicker'
import { FilterItemStyle } from '@/components/FilterStyle'
import { DATE_FORMAT } from '@/lib/utils'

type UseQueryParamsRangePickerProps = {
  defaultFrom?: Date
  defaultTo?: Date
}

export default function useQueryParamsDateRangePicker(): [
  { fromDate: Date; toDate: Date },
  () => JSX.Element,
]
export default function useQueryParamsDateRangePicker(
  props: UseQueryParamsRangePickerProps,
): [{ fromDate: Date; toDate: Date }, () => JSX.Element]

export default function useQueryParamsDateRangePicker(
  props?: UseQueryParamsRangePickerProps,
): [{ fromDate: Date; toDate: Date }, () => JSX.Element] {
  const { defaultFrom = subDays(new Date(), 7), defaultTo = addDays(new Date(), 0) } = props ?? {}

  const [queryFrom, setQueryFrom] = useQueryState('fromDate', {
    defaultValue: format(defaultFrom, DATE_FORMAT),
  })
  const [queryTo, setQueryTo] = useQueryState('toDate', {
    defaultValue: format(defaultTo, DATE_FORMAT),
  })

  const handleDateSelect = (date: DateRange | undefined) => {
    if (!date) {
      setQueryFrom(queryFrom)
      setQueryTo(queryFrom)
      return
    }

    const { from, to } = date
    if (from) {
      setQueryFrom(format(from, DATE_FORMAT))
    }
    if (to) {
      setQueryTo(format(to, DATE_FORMAT))
    }
  }

  const renderQueryParamsRangePicker = () => (
    <FilterItemStyle>
      <Label className="font-regular">기간</Label>
      <DatePickerWithRange
        date={{
          from: parse(queryFrom, DATE_FORMAT, new Date()),
          to: parse(queryTo, DATE_FORMAT, new Date()),
        }}
        onSelectDate={handleDateSelect}
      />
    </FilterItemStyle>
  )

  return [
    {
      fromDate: parse(queryFrom, DATE_FORMAT, new Date()),
      toDate: parse(queryTo, DATE_FORMAT, new Date()),
    },
    renderQueryParamsRangePicker,
  ]
}
