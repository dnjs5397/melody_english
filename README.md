# 인터넷 강사 프로필 & 보강 안내 웹사이트

수능 강사를 위한 개인 프로필 및 보강 영상 인증 서비스입니다.
Next.js(App Router) + Vercel + GitHub 기반의 **월 유지비 $0 Jamstack 구성**입니다.

---

## 목차

1. [로컬 실행](#1-로컬-실행)
2. [프로젝트 구조](#2-프로젝트-구조)
3. [콘텐츠 수정 가이드](#3-콘텐츠-수정-가이드)
   - [강사 정보 수정](#31-강사-정보-수정-srcdataprofilejson)
   - [보강 영상 추가/수정](#32-보강-영상-추가수정-srcdatalecturesjson)
   - [프로필 사진 교체](#33-프로필-사진-교체)
4. [Vercel 배포](#4-vercel-배포)
5. [운영 워크플로우](#5-운영-워크플로우-보강-영상-업로드)
6. [보안 구조](#6-보안-구조)
7. [자주 묻는 질문](#7-자주-묻는-질문)

---

## 1. 로컬 실행

### 사전 요구사항

- **Node.js v20 이상** (v18.15 이하는 빌드 불가)
- nvm 사용 시 아래 명령으로 버전 전환 가능

```bash
# nvm으로 Node.js 20 설치 및 전환
nvm install 20
nvm use 20
```

### 설치 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행 (http://localhost:3000)
npm run dev

# 3. 프로덕션 빌드 테스트 (선택)
npm run build
npm run start
```

---

## 2. 프로젝트 구조

```
profile_web/
├── public/
│   └── images/
│       └── profile.jpg          # 강사 프로필 사진 (직접 추가)
├── src/
│   ├── app/
│   │   ├── layout.tsx           # 전체 레이아웃 (네비게이션, 푸터)
│   │   ├── page.tsx             # 메인 페이지 - 강사 소개 (SSG)
│   │   ├── makeup/
│   │   │   └── page.tsx         # 보강 영상 인증 페이지
│   │   └── api/verify/
│   │       └── route.ts         # 인증코드 검증 API (Edge Function)
│   ├── components/
│   │   ├── ProfileImage.tsx     # 프로필 이미지 (이미지 없을 시 이니셜 표시)
│   │   ├── Timeline.tsx         # 약력 타임라인
│   │   └── VideoPlayer.tsx      # YouTube 지연 로딩 플레이어
│   └── data/
│       ├── profile.json         # ★ 강사 정보 (직접 수정)
│       └── lectures.json        # ★ 보강 영상 목록 (직접 수정)
├── .nvmrc                       # Node.js 버전 고정 (20)
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

**★ 표시 파일이 일상적인 운영에서 수정하는 파일입니다.**

---

## 3. 콘텐츠 수정 가이드

### 3.1 강사 정보 수정 (`src/data/profile.json`)

```json
{
  "name": "홍길동",                          // 강사 이름
  "subject": "수능 국어",                    // 과목명
  "title": "수능 국어 전문 강사",             // 직함 (히어로 섹션 상단 표시)
  "tagline": "개념부터 실전까지, ...",        // 한 줄 소개 문구
  "bio": "15년간 ...",                       // 강사 소개 본문 (여러 문장 가능)

  "stats": [
    { "label": "강의 경력", "value": "15년" },
    { "label": "누적 수강생", "value": "5,000+" },
    { "label": "1등급 배출", "value": "매년" }
  ],

  "previewVideoId": "유튜브_영상_ID",        // 맛보기 강의 YouTube 영상 ID
  "previewVideoTitle": "맛보기 강의 제목",

  "career": [
    {
      "year": "2010",
      "title": "강의 시작",
      "description": "부가 설명 (선택)"      // description은 생략 가능
    }
  ],

  "contact": {
    "kakao": "카카오톡_아이디",
    "notice": "공지 문구 (히어로 하단 노란 박스에 표시)"
  }
}
```

> **수정 후 적용:** 로컬에서는 저장 즉시 반영. Vercel 배포 환경에서는 GitHub에 커밋하면 자동 재배포됩니다.

---

### 3.2 보강 영상 추가/수정 (`src/data/lectures.json`)

```json
{
  "YYYY-MM-DD": {
    "title": "보강 제목",
    "code": "인증코드",
    "videoId": "YouTube_영상_ID"
  }
}
```

**예시:**

```json
{
  "2026-04-10": {
    "title": "수능특강 7강 보강",
    "code": "D4W55",
    "videoId": "abcXYZ123"
  },
  "2026-04-17": {
    "title": "화법과 작문 심화",
    "code": "E9Q82",
    "videoId": "defUVW456"
  }
}
```

**규칙:**
- **날짜 형식:** 반드시 `YYYY-MM-DD` (예: `2026-04-10`)
- **인증코드:** 영문 대소문자 + 숫자 조합 권장 (학생 입력 시 자동으로 대문자 변환됨)
- **YouTube 영상 ID:** YouTube URL에서 `v=` 뒤의 값
  ```
  https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                  ^^^^^^^^^^^^ 이 부분
  ```

---

### 3.3 프로필 사진 교체

1. 사진 파일명을 `profile.jpg`로 변경
2. `public/images/` 폴더에 복사
3. 권장 사이즈: **400×400px 이상, 정사각형 비율**

> 사진이 없을 경우 이름의 첫 글자가 파란 원형 배경으로 자동 표시됩니다.

---

## 4. Vercel 배포

### 최초 배포 (1회만)

1. [github.com](https://github.com)에서 새 Repository 생성
2. 프로젝트 폴더를 해당 Repository에 push

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

3. [vercel.com](https://vercel.com) 접속 → **Add New Project**
4. GitHub Repository 선택 → **Deploy** 클릭 (별도 설정 불필요)

### 이후 업데이트

GitHub에 커밋하기만 하면 **약 1분 내 자동 재배포**됩니다.

```bash
git add src/data/lectures.json
git commit -m "보강 영상 추가: 2026-04-10"
git push
```

---

## 5. 운영 워크플로우 (보강 영상 업로드)

보강 수업 후 영상을 등록하는 전체 과정입니다.

```
① YouTube에 영상 업로드
   - 공개 범위: "일부 공개(Unlisted)" 선택
   - 영상 ID 복사 (URL의 v= 뒤 값)

② 인증코드 결정
   - 예: "F2K47" (학생들에게 카카오톡 등으로 별도 공지)

③ GitHub에서 lectures.json 수정
   - Repository → src/data/lectures.json → 연필 아이콘(Edit)
   - 새 날짜/코드/영상ID 항목 추가 후 Commit

④ Vercel 자동 재배포 (약 1분 소요)
   - 학생들은 /makeup 페이지에서 날짜 + 코드 입력 후 시청
```

---

## 6. 보안 구조

학생이 브라우저 개발자 도구로 영상 ID를 직접 추출하는 것을 방지합니다.

```
학생 브라우저
    │
    │  POST /api/verify
    │  { date: "2026-04-10", code: "D4W55" }
    ▼
Edge Function (서버)
    │  lectures.json 내에서 코드 검증
    │  성공 시 videoId만 응답 반환
    │  실패 시 401 Unauthorized
    ▼
학생 브라우저
    │  받은 videoId로 YouTube iframe 렌더링
```

- `lectures.json` 원본 데이터는 서버에서만 접근 (클라이언트 노출 없음)
- 코드 불일치 시 401 응답만 반환, videoId는 절대 노출되지 않음
- 인증코드는 응답에 포함하지 않음

---

## 7. 자주 묻는 질문

**Q. 보강 영상이 조회되지 않아요.**
→ `lectures.json`의 날짜 형식이 `YYYY-MM-DD`인지 확인하세요. (예: `2026-04-10`)

**Q. 인증코드를 입력해도 "코드가 올바르지 않다"고 나와요.**
→ 입력값은 자동으로 대문자 변환되므로, `lectures.json`의 코드와 대소문자 무관하게 일치하면 됩니다. 날짜가 정확히 맞는지도 확인하세요.

**Q. 프로필 사진이 표시되지 않아요.**
→ `public/images/profile.jpg` 경로와 파일명을 확인하세요. 사진이 없으면 이니셜이 표시되므로 기능상 문제는 없습니다.

**Q. Vercel 재배포 없이 데이터를 바꿀 수 있나요?**
→ 이 프로젝트는 Jamstack 구조로, 데이터 변경 시 빌드가 필요합니다. GitHub 커밋 → 자동 재배포(~1분)가 가장 빠른 방법입니다.

**Q. Node.js 버전 오류가 나요.**
→ Node.js v20 이상이 필요합니다. `nvm install 20 && nvm use 20` 후 재시도하세요.
