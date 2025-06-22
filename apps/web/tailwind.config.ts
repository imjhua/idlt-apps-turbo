import config from '@repo/ui/tailwind.config'

const tailwindConfig = {
  ...config,
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './handler/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
    '../../packages/ui/components/**/*.{ts,tsx}',
  ],
  safelist: [],
}

export default tailwindConfig
