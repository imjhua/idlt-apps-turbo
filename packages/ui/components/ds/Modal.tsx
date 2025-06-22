import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ReactNode } from 'react'
import { ScrollArea } from '../ui/scroll-area'

const MODAL_SIZE_CLASS_MAP = {
  sm: 'max-w-[360px]',
  md: 'max-w-[560px]',
  lg: 'max-w-[960px]',
}

type ModalProps = {
  trigger?: ReactNode // ModalTrigger 컴포넌트로 감싸서 전달
  title: string
  desc?: string
  children: ReactNode
  onClose?: () => void
  size?: 'sm' | 'md' | 'lg'
  scroll?: boolean
}

export function Modal({
  trigger,
  title,
  desc,
  children,
  onClose,
  size = 'sm',
  scroll,
}: ModalProps) {
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen && onClose) {
          onClose()
        }
      }}
    >
      {trigger}
      <DialogContent className={cn('w-full', MODAL_SIZE_CLASS_MAP[size])}>
        <DialogHeader>
          <DialogTitle className="mb-4">{title}</DialogTitle>
          {desc && <DialogDescription>{desc}</DialogDescription>}
        </DialogHeader>
        {scroll ? (
          <ScrollArea className="h-[80vh]">
            <div className="p-1">{children}</div>
          </ScrollArea>
        ) : (
          <div className="p-1">{children}</div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export const ModalTrigger = DialogTrigger
export const ModalClose = DialogClose
