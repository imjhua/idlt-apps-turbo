import { Button } from '@repo/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@repo/ui/dropdown-menu'
import { Inbox } from 'lucide-react'

const items = [
  {
    date: new Date().toLocaleString(),
    content: '알림',
  },
  {
    date: new Date().toLocaleString(),
    content: '알림',
  },
  {
    date: new Date().toLocaleString(),
    content: '알림',
  },
  {
    date: new Date().toLocaleString(),
    content: '알림',
  },
]
export function Notification() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost" className="relative p-2">
          <Inbox />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-sm max-w-sm" align="end" forceMount>
        <div className="flex flex-col gap-2 p-2">
          {items?.map(({ date, content }, index) => {
            return (
              <button
                key={index}
                className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">noti-{index}</div>
                      <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">{date}</div>
                  </div>
                  <div className="text-xs font-medium">
                    제목: {content}-{index}
                  </div>
                </div>
                <div className="line-clamp-2 text-xs text-muted-foreground">
                  I have a question about the budget for the upcoming project. It seems like a
                  discrepancy in the allocation of resources. reviewed the budget report and
                  identified a few areas where we might be able to optimize our spending without
                  compromising the quality. attached a de
                </div>
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                    work
                  </div>
                  <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    budget
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
