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
  safelist: [
    'bg-blue-100', 'text-blue-800',
    'bg-green-100', 'text-green-800',
    'bg-gray-100', 'text-gray-800',
    'bg-yellow-100', 'text-yellow-800',
    'bg-purple-100', 'text-purple-800',
    'bg-pink-100', 'text-pink-800',
    'bg-orange-100', 'text-orange-800',
    'bg-red-100', 'text-red-800',
  ],
}

export default tailwindConfig
