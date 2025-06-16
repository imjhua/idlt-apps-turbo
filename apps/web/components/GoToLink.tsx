'use client';

import { Button } from '@repo/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useMemo } from 'react';

import { isInternalAdmin } from '@/lib/utils';

type InternalOnlyLinkProps = {
  children: ReactNode;
  url: string;
};

export default function GoToLink({ children, url }: InternalOnlyLinkProps) {
  return (
    <Button variant="link" className="p-0 h-full justify-between min-w-[20px] gap-1" asChild>
      <Link href={url} target="_blank" rel="noreferrer">
        {children}
        <ChevronRight />
      </Link>
    </Button>
  );
}
