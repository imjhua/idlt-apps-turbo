import { Button } from '@repo/ui/button';
import Link from 'next/link';

import Error from '@/components/Error';

export default function NotFound() {
  return (
    <Error
      stausCode={404}
      errorMessage="페이지를 찾을 수 없습니다."
      redirectElement={
        <Button variant="outline" className="py-4" asChild>
          <Link href="/">홈으로 이동</Link>
        </Button>
      }
    />
  );
}
