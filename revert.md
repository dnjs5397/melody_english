# 디자인 스냅샷 (복원용)

> 저장 시점: 2026-03-22
> 이 파일은 대규모 디자인 변경 전 현재 상태를 기록한 것입니다.

---

## src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* 프로필 사진 페이드인: opacity 0 → 0.7 */
@keyframes fadeInPhoto {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.photo-fade-in {
  opacity: 0;
  animation: fadeInPhoto 1.4s ease-out 0.2s forwards;
}
```

---

## src/app/layout.tsx

```tsx
import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '수능 영어 전문 강사 | 강의 안내',
  description:
    '수능 영어 전문 강사의 프로필 및 보강 영상 안내 페이지입니다. 강사 소개, 약력, 맛보기 강의를 확인하세요.',
  openGraph: {
    title: '수능 영어 전문 강사',
    description: '수능 영어 전문 강사의 프로필 및 보강 영상 안내 페이지입니다.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {/* 상단 네비게이션 */}
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-black text-xl text-blue-900 hover:text-blue-700 transition-colors tracking-tight"
            >
              Melody English
            </Link>

            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                강사 소개
              </Link>
              <Link
                href="/makeup"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                보강 영상
              </Link>
            </div>
          </div>
        </nav>

        {/* 페이지 본문 */}
        <main className="flex-1">{children}</main>

        {/* 하단 푸터 */}
        <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-sm">© 2026 수능 영어 강사. All rights reserved.</p>
            <p className="mt-1 text-xs text-slate-500">
              본 사이트의 모든 강의 콘텐츠는 저작권법에 의해 보호됩니다.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
```

---

## src/app/page.tsx

```tsx
import Link from 'next/link';
import Timeline from '@/components/Timeline';
import VideoPlayer from '@/components/VideoPlayer';
import ProfileImage from '@/components/ProfileImage';
import profileData from '@/data/profile.json';

export const dynamic = 'force-static';

export default function HomePage() {
  const { name, title, tagline, bio, stats, career, previewVideoId, previewVideoTitle, contact } =
    profileData;

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          상단 통합 섹션: 사진(1/3) + 강사 정보(2/3)
          맛보기 강의 바로 위까지의 전체 영역
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/*
        배경: 블러시 핑크 → 소프트 라벤더 → 퍼리윙클
        따뜻한~중간 퍼스널컬러(봄/여름)에 잘 어우러지는 파스텔 팔레트
      */}
      <section className="bg-gradient-to-br from-rose-100 via-purple-100 to-indigo-200">
        <div className="flex flex-col lg:flex-row">

          {/* ── 좌측: 프로필 사진 (전체 너비의 1/3, 섹션 전체 높이) ── */}
          <div className="relative flex-shrink-0 overflow-hidden w-full h-72 lg:w-1/3 lg:h-auto bg-gradient-to-br from-rose-100 via-fuchsia-100 to-purple-200">

            {/* 사진: fade-in 적용 (opacity 0 → 0.7) */}
            <div className="absolute inset-0 photo-fade-in">
              <ProfileImage name={name} />
            </div>

            {/* 우측 엣지 그라데이션 — 배경 중간값(fuchsia-100)으로 부드럽게 연결 (데스크톱) */}
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-fuchsia-100 to-transparent hidden lg:block" />

            {/* 하단 엣지 그라데이션 — 모바일 전환 */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-rose-100 to-transparent lg:hidden" />
          </div>

          {/* ── 우측: 강사 정보 (2/3) ── */}
          <div className="flex-1 flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-14 xl:px-20 lg:py-14 xl:py-20">

            {/* 직함 뱃지 */}
            <div className="mb-7">
              <span className="inline-block text-xs font-bold text-violet-700 bg-violet-200 border border-violet-300 px-3 py-1 rounded-full mb-3">
                {title}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight text-slate-900 mb-2">
                {name}
              </h1>
              <p className="text-slate-500 text-lg">{tagline}</p>
            </div>

            {/* 주요 지표 */}
            <div className="flex flex-wrap gap-6 sm:gap-10 mb-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-700 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 구분선 */}
            <div className="border-t border-slate-200/80 mb-8" />

            {/* 강사 소개 + 주요 약력 */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">

              {/* 강사 소개 */}
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  강사 소개
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{bio}</p>

                {contact.notice && (
                  <div className="mt-5 p-3.5 bg-white/80 border border-violet-200 rounded-xl">
                    <p className="text-slate-500 text-xs leading-relaxed">
                      📢 {contact.notice}
                    </p>
                  </div>
                )}
              </div>

              {/* 주요 약력 */}
              <div>
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  주요 약력
                </h2>
                <Timeline items={career} />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          맛보기 강의 섹션
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-900 mb-2">맛보기 강의</h2>
            <div className="w-10 h-1 bg-blue-600 rounded mx-auto mb-4" />
            <p className="text-slate-500">강의 스타일을 미리 경험해보세요.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <VideoPlayer videoId={previewVideoId} title={previewVideoTitle} />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          보강 영상 CTA 섹션
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">보강 영상 확인하기</h2>
          <p className="text-blue-100 mb-8 text-lg">
            강사로부터 받은 날짜와 인증코드로
            <br className="sm:hidden" /> 보강 영상을 바로 확인할 수 있습니다.
          </p>
          <Link
            href="/makeup"
            className="inline-block bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-lg"
          >
            보강 영상 보기 →
          </Link>
        </div>
      </section>
    </>
  );
}
```

---

## src/components/Timeline.tsx

```tsx
interface TimelineItem {
  year: string;
  title: string;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
  dark?: boolean;
}

export default function Timeline({ items, dark = false }: TimelineProps) {
  return (
    <div className="relative">
      {/* 수직 선 */}
      <div
        className={`absolute left-[22px] top-3 bottom-3 w-px ${
          dark ? 'bg-white/20' : 'bg-blue-200'
        }`}
      />

      <ol className="space-y-7">
        {items.map((item, index) => (
          <li key={index} className="relative flex gap-5">
            {/* 점 */}
            <div className="relative z-10 flex-shrink-0 w-11 flex justify-center pt-0.5">
              <div
                className={`w-4 h-4 rounded-full border-2 shadow ${
                  dark
                    ? 'bg-blue-400 border-navy-900 ring-2 ring-blue-400/30'
                    : 'bg-blue-600 border-white ring-2 ring-blue-200'
                }`}
              />
            </div>

            {/* 내용 */}
            <div className="pb-1">
              <span
                className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mb-1 ${
                  dark
                    ? 'text-blue-300 bg-white/10 border border-white/15'
                    : 'text-blue-600 bg-blue-50 border border-blue-100'
                }`}
              >
                {item.year}
              </span>
              <p
                className={`font-semibold leading-snug ${
                  dark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {item.title}
              </p>
              {item.description && (
                <p
                  className={`text-sm mt-0.5 leading-relaxed ${
                    dark ? 'text-blue-200/70' : 'text-slate-500'
                  }`}
                >
                  {item.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
```

---

## src/components/ProfileImage.tsx

```tsx
'use client';

import { useState } from 'react';

interface ProfileImageProps {
  name: string;
}

export default function ProfileImage({ name }: ProfileImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700 text-white font-black text-6xl select-none">
        {name.charAt(0)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/profile.png"
      alt={`${name} 강사 프로필 사진`}
      className="w-full h-full object-cover"
      onError={() => setHasError(true)}
    />
  );
}
```

---

## src/components/VideoPlayer.tsx

```tsx
'use client';

import { useState } from 'react';

interface VideoPlayerProps {
  videoId: string;
  title?: string;
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div
        className="relative w-full rounded-xl overflow-hidden shadow-xl"
        style={{ paddingBottom: '56.25%' }}
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title ?? '강의 영상'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden shadow-xl cursor-pointer group"
      style={{ paddingBottom: '56.25%' }}
      onClick={() => setIsPlaying(true)}
      role="button"
      tabIndex={0}
      aria-label={`${title ?? '강의 영상'} 재생하기`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsPlaying(true);
        }
      }}
    >
      {/* 썸네일 이미지 - maxresdefault 없으면 hqdefault로 폴백 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title ?? '영상 썸네일'}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }}
      />

      {/* 오버레이 + 재생 버튼 */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-200">
          <svg
            className="w-7 h-7 sm:w-9 sm:h-9 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
```

---

## src/app/makeup/page.tsx

```tsx
'use client';

import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';

interface VerifyResult {
  videoId: string;
  title: string;
}

export default function MakeupPage() {
  const [date, setDate] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<VerifyResult | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, code: code.trim().toUpperCase() }),
      });

      const data: VerifyResult & { error?: string } = await res.json();

      if (!res.ok) {
        setError(data.error ?? '인증에 실패했습니다.');
      } else {
        setResult(data);
      }
    } catch {
      setError('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setCode('');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* 페이지 제목 */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">보강 영상 확인</h1>
        <div className="w-10 h-1 bg-blue-600 rounded mb-4" />
        <p className="text-slate-500">
          강사로부터 안내받은 날짜와 인증코드를 입력하면 보강 영상을 확인할 수 있습니다.
        </p>
      </div>

      {/* 인증 안내 박스 */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-8 flex gap-3">
        <span className="text-blue-500 text-lg flex-shrink-0">ℹ️</span>
        <p className="text-blue-800 text-sm leading-relaxed">
          인증코드는 강의 공지사항을 통해 보강 날짜에 맞춰 개별 안내됩니다. 코드를 분실한 경우
          강사에게 문의해주세요.
        </p>
      </div>

      {/* 인증 폼 */}
      {!result && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="space-y-5">
            {/* 날짜 입력 */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                보강 날짜
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white transition-shadow"
              />
            </div>

            {/* 인증코드 입력 */}
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-semibold text-slate-700 mb-1.5"
              >
                인증코드
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="예: A7X92"
                maxLength={10}
                required
                autoComplete="off"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 bg-white font-mono tracking-widest uppercase placeholder:font-sans placeholder:tracking-normal placeholder:normal-case transition-shadow"
              />
            </div>

            {/* 오류 메시지 */}
            {error && (
              <div className="flex gap-2 p-3.5 bg-red-50 border border-red-200 rounded-xl">
                <span className="text-red-500 flex-shrink-0">⚠️</span>
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isLoading || !date || !code}
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-sm text-base"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  확인 중...
                </span>
              ) : (
                '영상 확인하기'
              )}
            </button>
          </div>
        </form>
      )}

      {/* 인증 성공 - 영상 표시 */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full mb-2">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                인증 완료
              </span>
              <h2 className="text-xl font-black text-slate-900">{result.title}</h2>
            </div>

            <button
              onClick={handleReset}
              className="flex-shrink-0 px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              다른 날짜 조회
            </button>
          </div>

          <VideoPlayer videoId={result.videoId} title={result.title} />
        </div>
      )}
    </div>
  );
}
```
