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
  title: 'Melody English',
  description: '메가스터디 러셀 영어 강사 오연주입니다.',
  openGraph: {
    title: 'Melody English',
    description: '메가스터디 러셀 영어 강사 오연주입니다.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <body className="font-sans bg-cream text-charcoal min-h-screen flex flex-col">
        {/* 상단 네비게이션 */}
        <nav className="nav-glass sticky top-0 z-50">
          <div className="max-w-container mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-black text-lg text-charcoal hover:text-[#D4875A] transition-colors duration-300 tracking-tight"
            >
              Melody English
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="/#about"
                className="px-4 py-2 text-sm font-medium text-charcoal/60 hover:text-charcoal transition-colors duration-300"
              >
                강사 소개
              </Link>
              <Link
                href="/#schedule"
                className="px-4 py-2 text-sm font-medium text-charcoal/60 hover:text-charcoal transition-colors duration-300"
              >
                수업 일정
              </Link>
              <Link
                href="/makeup"
                className="px-5 py-2.5 text-sm font-semibold bg-apricot text-charcoal rounded-[50px] hover:bg-[#F5A878] transition-all duration-300 hover:scale-105 shadow-sm"
              >
                보강 영상
              </Link>
            </div>
          </div>
        </nav>

        {/* 페이지 본문 */}
        <main className="flex-1">{children}</main>

        {/* 하단 푸터 */}
        <footer className="bg-[#2D2B28] text-[#9E9590] py-10">
          <div className="max-w-container mx-auto px-6 sm:px-8 text-center">
            <p className="font-black text-[#C8BFB5] text-base mb-2 tracking-tight">Melody English</p>
            <p className="text-sm">© 2026 수능 영어 강사. All rights reserved.</p>
            <p className="mt-1 text-xs text-[#6E6861]">
              본 사이트의 모든 강의 콘텐츠는 저작권법에 의해 보호됩니다.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
