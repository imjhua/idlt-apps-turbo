import { normalizePathForRoute } from './utils'

describe('normalizePathForRoute 함수', () => {
  const testCases: [string, string][] = [
    ['/users/3566', '/users/[param]'],
    ['/users/books/134633', '/users/books/[param]'],
    ['/users/2023/book', '/users/[param]/book'],
    ['/users7467/books', '/users7467/books'],
    ['/books/1234/profile/5678', '/books/[param]/profile/[param]'],
    ['/users/789a', '/users/789a'],
    ['/1234', '/[param]'],
  ]

  test.each(testCases)('경로 "%s" => "%s" 로 치환되어야 한다', (input, expected) => {
    expect(normalizePathForRoute(input)).toBe(expected)
  })
})
