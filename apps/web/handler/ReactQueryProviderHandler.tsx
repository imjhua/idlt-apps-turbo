'use client';

import { isAxiosError } from '@repo/request/http';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'sonner';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60 * 1000 * 30,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          window.location.reload();
        }

        const { message } = error.response.data;
        toast.error(message);
        return;
      }
      toast.error('알 수 없는 에러가 발생하였습니다. 다시 시도해 주세요.');
    },
  }),
});

export default function ReactQueryProviderHandler({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
