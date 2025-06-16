module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'merge', // 릴리즈 PR 병합
        'feat', // 새로운 기능 추가
        'bug', // 버그 발견
        'fix', // 버그 수정
        'docs', // 문서 수정
        'style', // 코드 포맷팅 등
        'refactor', // 리팩토링
        'cicd', // 배포 관련
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'web',
        'demo',
        'ui',
        'eslint',
        'request',
        '', // scope 없이도 허용
      ],
    ],
    'subject-case': [0], // subject-case 체크 비활성화
  },
};
