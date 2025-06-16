import {
  useQuery,
  UseQueryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

type UseRequestProps<TData, TSelectData = TData> = UseQueryOptions<TData, unknown, TSelectData>;

export function useRequest<TData, TSelectData = TData>(
  options: UseRequestProps<TData, TSelectData>,
) {
  return useQuery<TData, unknown, TSelectData>(options);
}

type UseSuspenseRequestProps<ResponseType> = UseSuspenseQueryOptions<
  ResponseType,
  unknown,
  ResponseType
>;
export function useSuspenseRequest<ResponseType>(options: UseSuspenseRequestProps<ResponseType>) {
  return useSuspenseQuery<ResponseType, unknown>(options);
}
