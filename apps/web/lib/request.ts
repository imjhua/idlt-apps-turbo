import { AxiosRequestConfig, createClient, isAxiosError, Methods, sleep } from '@repo/request/http';

const client = createClient({
  baseURL: process.env['NEXT_PUBLIC_SERVER_ENDPOINT'],
  response: {
    async onSuccess(response) {
      if (
        response.config.url &&
        (response.config.url !== '/api/menus' || !REST_API_URLS.includes(response.config.url || ''))
      ) {
        response.config.url = `${response.config.url.replace(/\/(\d+)/g, '/[id]')}`;

        /* TODO: 테스트를 위한 지연 */
        await sleep(1000);
      }

      return response.data;
    },
  },
});

export const request = <T>(options: AxiosRequestConfig): Promise<T> => {
  if (options.url && options.url !== '/api/menus') {
    options.url = `${options.url.replace(/\/(\d+)/g, '/[id]')}`;
  }

  return client.request(options);
};

export { isAxiosError, Methods };

/* FIXME: 전체 API 연동 전까지만 활용 */
const REST_API_URLS = [
  '/v1/users/me',
  '/v1/partners',
  '/v1/partners/transport',
  '/v1/users/search',
  '/v1/users/[id]',
  '/v1/users/groups',
  '/v1/odd-regions',
  '/v1/odd-regions/[id]',
  '/v1/vehicles/[id]',
  '/v1/organizations',
  '/v1/organizations/[id]',
  '/v1/vehicle-models',
  // '/v1/driving-logs/taxi-calls',
  // '/v1/driving-logs/taxi-call-statistics',
];
