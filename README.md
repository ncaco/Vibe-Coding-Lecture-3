# Vibe Coding Lecture 3

Next.js 프로젝트입니다.

## 시작하기

먼저 개발 서버를 실행하세요:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 프로젝트 구조

```
src/
├── app/           # App Router 디렉토리
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/    # 재사용 가능한 컴포넌트
└── lib/          # 유틸리티 함수들
```

## 사용된 기술

- [Next.js 14](https://nextjs.org/) - React 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 타입 안전성
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [ESLint](https://eslint.org/) - 코드 품질

## 배포

Vercel을 사용하여 쉽게 배포할 수 있습니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/hello-world)
