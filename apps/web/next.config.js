/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: { dirs: ['*'] },
  experimental: {
    turbo: {
      rules: {
        '*.yaml': {
          loaders: ['yaml-loader'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    // remotePatterns: [new URL('https://*.kakaocdn.net')],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.kakaocdn.net',
      },
    ],
  },
  /* FIXME: 대시보드메뉴가 오픈되기 전까지 해당 설정 주석처리 */
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/dashboard',
  //       permanent: true,
  //     },
  //   ]
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })
    return config
  },
}

export default nextConfig
