# Solid.js 학습 프로젝트 - 인터랙티브 기초 학습

Solid.js 기초를 배우기 위한 종합적인 인터랙티브 학습 자료입니다. 깔끔한 현대식 UI와 실용적인 예제를 제공합니다.

## 🚀 주요 기능

- **인터랙티브 예제**: 실시간으로 동작하는 코드를 보며 배우자자
- **현대식 디자인**: 깔끔하고 접근성 좋은 UI, 라이트/다크 모드 지원
- **반응형 레이아웃**: 데스크톱, 태블릿, 모바일에서 완벽하게 작동
- **체계적 구조**: 각 개념별로 페이지 기반 라우팅
- **코드 예제**: 모든 개념에 대한 실행 가능한 코드 스니펫
- **단계적 학습**: 기초부터 시작해 고급 패턴까지 학습

## 📚 학습 주제

1. **Signals (신호)** - `createSignal()`로 반응형 상태 관리
   - 기본 카운터
   - 입력 필드 동기화
   - 여러 신호 조합

2. **Memo (메모이제이션)** - `createMemo()`로 계산된 값 관리
   - 메모이제이션된 계산
   - 비싼 연산 캐싱
   - 파생 상태

3. **Effects (이펙트)** - `createEffect()`로 부수 효과 처리
   - 콘솔 로깅
   - LocalStorage 동기화
   - 비동기 작업

4. **Control Flow (제어 흐름)** - 조건부 렌더링
   - `<Show>` 컴포넌트
   - `<For>` 컴포넌트
   - `<Switch>/<Match>` 컴포넌트

5. **Events (이벤트)** - 이벤트 처리
   - 클릭 이벤트
   - 폼 제출
   - 키보드 입력

6. **Props (프롭스)** - 컴포넌트 간 통신
   - 컴포넌트 조합
   - 프롭스 전달
   - Children 활용

7. **Stores (스토어)** - `createStore()`로 복잡한 상태 관리
   - 간단한 객체 스토어
   - Todo 리스트 (CRUD)
   - 중첩된 스토어

8. **Styling (스타일링)** - 동적 스타일링 기법
   - 조건부 클래스
   - 인라인 스타일
   - CSS 변수
   - 계산된 스타일

## 🎨 디자인 시스템

### 색상

#### 라이트 모드
- 배경: `#FAFAFA`
- 카드: `#FFFFFF`
- 텍스트: `#0F172A`
- 테두리: `#E2E8F0`

#### 다크 모드
- 배경: `#0F172A`
- 카드: `#1E293B`
- 텍스트: `#F1F5F9`
- 테두리: `#334155`

#### 강조 색상
- 주 색상: `#3B82F6` (파란색)
- 보조 색상: `#8B5CF6` (보라색)
- 성공: `#10B981` (초록색)
- 경고: `#F59E0B` (황색)
- 오류: `#EF4444` (빨간색)

### 타이포그래피

- **UI 폰트**: Inter (Google Fonts)
- **코드 폰트**: JetBrains Mono (Google Fonts)
- **굵기**: 400, 500, 600, 700

## 🏗️ 프로젝트 구조

```
base/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
└── src/
    ├── App.tsx                    # 메인 앱 컴포넌트 & 라우팅
    ├── index.tsx                  # 진입점
    ├── index.css                  # 전역 스타일 & CSS 변수
    │
    ├── components/                # 재사용 가능한 컴포넌트
    │   ├── Layout.tsx            # 페이지 레이아웃 래퍼
    │   ├── Nav.tsx               # 네비게이션 컴포넌트
    │   ├── ExampleCard.tsx       # 예제 컨테이너
    │   ├── CodeBlock.tsx         # 코드 표시 (복사 기능)
    │   └── ThemeToggle.tsx       # 다크모드 토글
    │
    ├── constants/                 # 설정값
    │   ├── theme.ts              # 디자인 토큰
    │   └── routes.ts             # 라우트 정의
    │
    ├── pages/                     # 페이지 컴포넌트
    │   ├── Home.tsx              # 메인/개요 페이지
    │   ├── Signals.tsx           # Signals 학습
    │   ├── Memo.tsx              # Memo 학습
    │   ├── Effects.tsx           # Effects 학습
    │   ├── ControlFlow.tsx       # 제어 흐름 학습
    │   ├── Events.tsx            # 이벤트 학습
    │   ├── Props.tsx             # Props 학습
    │   ├── Stores.tsx            # Stores 학습
    │   └── Styling.tsx           # 스타일링 학습
    │
    └── styles/                    # CSS 모듈
        ├── Layout.module.css
        ├── Nav.module.css
        ├── Home.module.css
        ├── ExampleCard.module.css
        ├── CodeBlock.module.css
        └── ThemeToggle.module.css
```

## ⚡ 빠른 시작

### 설치

```bash
cd base
pnpm install  # npm install 또는 yarn install 사용 가능
```

### 개발 서버 실행

```bash
pnpm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어주세요.

### 프로덕션 빌드

```bash
pnpm run build
```

프로덕션 빌드는 `dist/` 디렉터리에 생성됩니다.

### 프로덕션 빌드 미리보기

```bash
pnpm run serve
```

## 🎓 학습 방법

### 초급자 학습 경로
1. **Home**부터 시작해 모든 개념 이해하기
2. **Signals** 배우기 - 반응형의 기초
3. **Control Flow** 탐색하기 - 리스트와 조건부 렌더링
4. **Events** 연습하기 - 사용자 상호작용 처리

### 중급자 학습 경로
1. **Effects** 마스터하기 - 부수 효과 관리
2. **Memo** 배우기 - 성능 최적화
3. **Props** 이해하기 - 컴포넌트 조합

### 고급자 학습 경로
1. **Stores** 공부하기 - 복잡한 상태 관리
2. **Styling** 탐색하기 - 동적 UI
3. 모든 개념을 자신의 프로젝트에 적용하기

## 🔧 사용 기술

- **프레임워크**: Solid.js 1.9.5
- **라우터**: @solidjs/router 0.15.3
- **빌드 도구**: Vite 6.0.0
- **언어**: TypeScript 5.7.2
- **스타일링**: CSS 3 with Variables and Modules

## 💡 핵심 패턴

### 반응형 상태
- 간단한 반응형 값에는 `createSignal()` 사용
- 계산/캐시된 값에는 `createMemo()` 사용
- 부수 효과에는 `createEffect()` 사용

### 컴포넌트
- Props를 사용한 함수형 컴포넌트
- 제어 흐름 컴포넌트 (Show, For, Switch)
- 범위가 지정된 CSS 모듈

### 스타일링
- 테마 지정을 위한 CSS 변수
- 컴포넌트 스타일링을 위한 CSS 모듈
- classList를 이용한 조건부 클래스

## 🌙 다크 모드

앱은 자동 테마 감지를 포함합니다:
- 시스템 `prefers-color-scheme` 선호도 존중
- localStorage에 사용자 선택 저장
- 테마 전환 시 부드러운 애니메이션

네비게이션의 토글 버튼으로 테마를 전환할 수 있습니다.

## 📱 반응형 디자인

- **모바일** (< 480px): 단일 열 레이아웃, 전체 너비
- **태블릿** (< 768px): 2열 그리드, 간소화된 네비게이션
- **데스크톱** (≥ 768px): 3열 그리드, 사이드바 네비게이션

## 🚦 코드 스타일 가이드

- 간단한 상태에는 `createSignal()` 사용
- 불필요한 재계산을 피하려면 `createMemo()` 사용
- 컴포넌트는 작고 집중하도록 유지
- 타입 안전성을 위해 TypeScript 사용
- 테마 지정에는 CSS 변수 선호

## 📖 참고 자료

- [Solid.js 공식 문서](https://docs.solidjs.com/)
- [Solid.js 튜토리얼](https://www.solidjs.com/tutorial)
- [Solid Router 문서](https://github.com/solidjs/solid-router)
- [Solid Store 패턴](https://docs.solidjs.com/guides/how-to-guides/stores)

## ✨ 기능 & 상호작용

각 페이지는 다음을 포함합니다:
- 명확한 개념 설명
- 2-3개의 실행 가능한 예제
- 클립보드에 복사 가능한 코드 스니펫
- 인터랙티브 데모
- 단계적 복잡도 증가

## 🤝 기여하기

이것은 학습 자료입니다. 개선하려면:
1. 모든 예제를 철저히 테스트하기
2. 초급자 친화적인 명확한 예제 만들기
3. 코드가 자명하지 않은 곳에 주석 추가하기
4. 디자인 일관성 유지하기

## 📄 라이선스

MIT - 이 프로젝트를 자유롭게 학습에 사용할 수 있습니다!

---

**즐거운 학습 되세요! 🚀**

Home 페이지부터 시작해 자신의 속도로 각 개념을 탐색하세요.
