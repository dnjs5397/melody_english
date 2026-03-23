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
