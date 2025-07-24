# 텍스트 평가 도구 (Text Evaluator)

텍스트의 전문성, 신뢰성, 관련성을 분석하는 웹 애플리케이션입니다.

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS 4

## 설치 방법

1. 저장소를 클론합니다:
```bash
git clone <repository-url>
cd text-evaluator
```

2. 의존성을 설치합니다:
```bash
npm install
```

3. 개발 서버를 실행합니다:
```bash
npm run dev
```

4. 빌드하려면:
```bash
npm run build
```

## 주요 기능

- 텍스트 입력 및 평가
- 전문성, 신뢰성, 관련성 점수 제공
- 상세 분석 보고서
- 반응형 디자인

## 스타일 구성

이 프로젝트는 Tailwind CSS 4를 사용합니다. Tailwind CSS 4부터는 PostCSS 플러그인이 별도 패키지로 분리되어 있어 다음과 같이 설정되어 있습니다:

- `tailwind.config.js`: Tailwind CSS 구성
- `postcss.config.js`: PostCSS 구성 (`@tailwindcss/postcss` 플러그인 사용)

## 프로젝트 구조

```
text-evaluator/
├── src/
│   ├── components/     # UI 컴포넌트
│   ├── services/       # 비즈니스 로직
│   ├── types/          # TypeScript 타입 정의
│   ├── App.tsx         # 메인 App 컴포넌트
│   ├── App.css         # App별 스타일
│   ├── index.css       # 글로벌 스타일 (Tailwind 포함)
│   └── main.tsx        # 앱 진입점
├── public/             # 정적 파일
├── tailwind.config.js  # Tailwind 설정
├── postcss.config.js   # PostCSS 설정
├── vite.config.ts      # Vite 설정
└── package.json        # 프로젝트 의존성
```

## 라이센스

[라이센스 정보]