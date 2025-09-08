# Fillo Admin System

Fillo 스포츠 팬덤 모임 플랫폼의 관리자 시스템입니다.

## 인증 시스템

### 로그인 API

- **Endpoint**: `POST http://localhost:8094/api/v1/admin/login`
- **Request Body**:
  ```json
  {
    "loginId": "관리자 아이디",
    "password": "비밀번호"
  }
  ```
- **Response**:
  ```json
  {
    "statusMessage": "정상 수행",
    "statusCode": "FO-200",
    "data": {}
  }
  ```
- **Response Headers**: `Authorization`, `RefreshToken` (JWT 토큰)

### 자동 토큰 관리

- 로그인 성공 시 JWT 토큰을 자동으로 저장
- 이후 모든 API 요청에 자동으로 토큰 헤더 추가
- 토큰은 localStorage와 메모리에 동시 저장

### 에러 처리

- 로그인 실패 시 에러 페이지로 자동 리다이렉트
- `statusCode`가 `FO-200`이 아닌 경우 에러 처리
- 토큰이 없는 경우 에러 처리

## Getting Started

백엔드 서버가 `http://localhost:8094`에서 실행 중이어야 합니다.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
