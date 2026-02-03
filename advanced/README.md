# Solid.js Advanced 블로그 플랫폼

Solid.js로 만든 프로덕션급 블로그 플랫폼입니다.

## 주요 기능

- 📝 포스트 관리 (CRUD, 드래프트/발행)
- 🔍 검색 및 필터링 (제목, 태그, 카테고리)
- 💬 댓글 시스템 (중첩 댓글 지원)
- 🎨 다크모드 지원
- 📱 반응형 디자인 (모바일, 태블릿, 데스크톱)
- ⚡ 최적화 (코드 스플리팅, 캐싱)

## 빠른 시작

### 1. 설치
```bash
cd advanced
pnpm install
```

### 2. 환경설정
```bash
cp .env.example .env
# VITE_API_URL=http://localhost:3001 로 수정
```

### 3. 개발 시작
```bash
pnpm run dev
# http://localhost:3000 에서 확인
```

## 폴더 구조

```
src/
├── components/     # UI 컴포넌트 (PostCard, CommentItem 등)
├── pages/         # 페이지 (Home, PostDetail, PostCreate 등)
├── api/           # API 클라이언트 (posts, comments)
├── hooks/         # 커스텀 훅 (usePostsResource, usePostDetail)
├── stores/        # 전역 상태 (posts store)
├── utils/         # 유틸리티 (formatting, validation)
├── constants/     # 상수 (routes, theme, api)
└── styles/        # CSS 모듈
```

## 구현된 페이지

| 경로 | 설명 |
|------|------|
| `/` | 포스트 목록 (검색, 페이지네이션) |
| `/posts/:id` | 포스트 상세 (댓글) |
| `/posts/new` | 포스트 작성 |
| `/posts/:id/edit` | 포스트 수정 |

## Solid.js 패턴

```typescript
// createResource - 자동 캐싱
const [posts] = createResource(page, fetcher);

// Suspense - 비동기 처리
<Suspense fallback={<Loading />}>
  <Show when={posts()}>{(data) => ...}</Show>
</Suspense>

// createMemo - 계산값 캐싱
const filtered = createMemo(() => posts().filter(...));

// Show/For - 효율적인 렌더링
<For each={items()}>{(item) => <Item item={item} />}</For>
```

## API 통합

백엔드는 다음 엔드포인트를 제공해야 합니다:

```
GET    /api/posts              # 목록 (페이지네이션)
GET    /api/posts/:id          # 상세
POST   /api/posts              # 작성
PUT    /api/posts/:id          # 수정
DELETE /api/posts/:id          # 삭제
GET    /api/posts/:id/comments # 댓글 목록
POST   /api/posts/:id/comments # 댓글 작성
```

## 배포

### 프론트엔드 (Vercel)
```bash
pnpm run build
# GitHub에 push → Vercel 자동 배포
```

환경 변수 설정:
```
VITE_API_URL=https://your-api.vercel.app
```

### 백엔드 (별도 리포지토리)
- CORS 설정 필수
- 위 8개 엔드포인트 구현

## 기술 스택

- **Solid.js** - 반응형 프레임워크
- **SolidJS Router** - 라우팅
- **TypeScript** - 타입 안전
- **Vite** - 빌드 도구
- **CSS Modules** - 스타일 관리

## 주요 특징

✅ 완전한 타입 안전성
✅ 자동 데이터 캐싱
✅ 최소한의 리렌더링
✅ 모바일 최적화
✅ 에러 처리
✅ 폼 검증

## 시작하기

```bash
# 1. 서버 시작
pnpm run dev

# 2. API 백엔드 연동 (별도)
# - /api/posts 등의 엔드포인트 구현
# - CORS 설정

# 3. 테스트
# - 포스트 목록 확인
# - 포스트 작성/수정/삭제
# - 댓글 작성
```

## 라이선스

MIT
