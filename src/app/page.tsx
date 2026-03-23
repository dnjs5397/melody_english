import Link from 'next/link';
import VideoPlayer from '@/components/VideoPlayer';
import ProfileImage from '@/components/ProfileImage';
import ScrollReveal from '@/components/ScrollReveal';
import profileData from '@/data/profile.json';

export const dynamic = 'force-static';

export default function HomePage() {
  const { name, title, bio, stats, career, previewVideoId, previewVideoTitle, contact, schedule } =
    profileData;

  return (
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          히어로 섹션: 비대칭 레이아웃
          사진(좌) + 텍스트(우) + 플로팅 뱃지
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative bg-cream overflow-hidden">
        <div className="max-w-container mx-auto">
          <div className="flex flex-col lg:flex-row items-end min-h-[82vh]">

            {/* ── 좌측: 프로필 사진 ── */}
            <div className="relative flex-shrink-0 w-full h-[500px] lg:w-[44%] lg:h-auto lg:self-stretch photo-fade-in">
              <div className="absolute inset-0">
                <ProfileImage name={name} />
              </div>

              {/* 데스크톱: 우측 크림 그라데이션 (사진↔텍스트 경계 블렌딩) */}
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream to-transparent hidden lg:block z-10" />
              {/* 모바일: 하단 크림 그라데이션 */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent lg:hidden" />
            </div>

            {/* ── 우측: 텍스트 ── */}
            <div className="flex-1 pb-20 lg:pb-32 px-8 sm:px-10 lg:pl-14 xl:pl-20 lg:pr-10 pt-4 lg:pt-0 flex flex-col justify-center">

              {/* 직함 뱃지 */}
              <span className="inline-block text-xs font-semibold tracking-[0.15em] text-[#D4875A] uppercase border border-apricot rounded-[50px] px-4 py-1.5 mb-8 w-fit">
                {title}
              </span>

              {/* 이름 */}
              <h1 className="font-black text-6xl sm:text-7xl lg:text-8xl text-charcoal leading-[1.05] mb-6 tracking-tight">
                {name}
              </h1>

              {/* 슬로건: 하이라이트 효과 */}
              <p className="text-lg sm:text-xl text-charcoal/80 leading-[1.9] mb-10">
                <span className="text-highlight font-medium">개념부터 적용까지,</span>
                <br />
                수능·내신 영어의 모든 것
              </p>

              {/* 브랜드 구분선 */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-px bg-apricot" />
                <span className="text-xs text-charcoal/35 tracking-[0.2em] uppercase font-semibold">
                  Melody English
                </span>
                <div className="w-10 h-px bg-apricot" />
              </div>

              {/* 지표 */}
              <div className="flex gap-10">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-black text-charcoal tabular-nums">
                      {stat.value}
                    </div>
                    <div className="text-[15px] text-charcoal/45 mt-0.5 tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 배경 장식 orb */}
        <div
          className="hero-orb-1 absolute -top-10 right-[8%] w-[520px] h-[520px] rounded-full bg-mint blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="hero-orb-2 absolute top-[35%] right-[-4%] w-80 h-80 rounded-full bg-lavender blur-2xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="hero-orb-3 absolute bottom-0 right-[25%] w-72 h-72 rounded-full bg-apricot blur-2xl pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          강사 소개 섹션
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="about" className="py-32 bg-cream border-t border-sand">
        <div className="max-w-container mx-auto px-8 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* 좌측: 소개 텍스트 (2열 중 1열만 사용 → 가독성) */}
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#D4875A]/80 uppercase mb-5">
                About
              </p>
              <h2 className="font-bold text-4xl sm:text-5xl text-charcoal leading-snug mb-8">
                강사 소개
              </h2>
              <p className="text-charcoal/80 leading-[2.2] text-base sm:text-lg">
                {bio.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < bio.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </ScrollReveal>

            {/* 우측: 약력 카드 + 공지 */}
            <ScrollReveal delay={200} className="lg:pt-14">
              <div className="space-y-3 mb-8">
                {[
                  { item: career[3], extra: '현재', bg: 'bg-mint/25',     border: 'border-mint/35',     badge: 'text-[#4A8F78] bg-mint/45' },
                  { item: career[2], extra: '',     bg: 'bg-lavender/30', border: 'border-lavender/40', badge: 'text-[#7A5AB8] bg-lavender/45' },
                  { item: career[1], extra: '',     bg: 'bg-sand/45',     border: 'border-sand',         badge: 'text-charcoal/50 bg-charcoal/10' },
                  { item: career[0], extra: '',     bg: 'bg-apricot/18',  border: 'border-apricot/28',   badge: 'text-[#C47840] bg-apricot/30' },
                ].map(({ item, extra, bg, border, badge }) => (
                  <div key={item.year} className={`bento-card ${bg} ${border} border rounded-xl px-5 py-4 flex items-center gap-4`}>
                    <span className={`flex-shrink-0 text-xs font-semibold ${badge} rounded-full px-3 py-1 tabular-nums`}>
                      {item.year}{extra && ` · ${extra}`}
                    </span>
                    <span className="font-medium text-base text-charcoal leading-snug">
                      {item.title.split('\n').map((line, i) => (
                        <span key={i}>{i > 0 && <br />}{line}</span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>

            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          맛보기 강의
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-32 bg-cream border-t border-sand">
        <div className="max-w-container mx-auto px-8 sm:px-10 lg:px-16">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#D4875A]/80 uppercase mb-4">
              Preview
            </p>
            <h2 className="font-bold text-4xl sm:text-5xl text-charcoal mb-4">맛보기 강의</h2>
            <p className="text-charcoal/70">강의 스타일을 미리 경험해보세요.</p>
          </ScrollReveal>

          <ScrollReveal delay={150} className="max-w-3xl mx-auto">
            <VideoPlayer videoId={previewVideoId} title={previewVideoTitle} />
          </ScrollReveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          수업 일정
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="schedule" className="py-32 bg-cream border-t border-sand">
        <div className="max-w-container mx-auto px-8 sm:px-10 lg:px-16">
          <ScrollReveal className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#D4875A]/80 uppercase mb-4">
              Schedule
            </p>
            <h2 className="font-bold text-4xl sm:text-5xl text-charcoal mb-4">수업 일정</h2>
            <p className="text-charcoal/70">매주 정기 수업 시간표입니다.</p>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            {/* 범례 */}
            <div className="flex items-center justify-center gap-6 mb-8">
              <span className="flex items-center gap-2 text-sm text-charcoal/80">
                <span className="w-3 h-3 rounded-sm bg-apricot/70 inline-block" />
                중계
              </span>
              <span className="flex items-center gap-2 text-sm text-charcoal/80">
                <span className="w-3 h-3 rounded-sm bg-lavender/70 inline-block" />
                성북
              </span>
            </div>

            {/* 타임테이블 */}
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="grid grid-cols-7 gap-2 sm:gap-3 min-w-[480px]">
              {schedule.map((day) => {
                const isActive = day.slots.length > 0;
                return (
                  <div key={day.day} className="flex flex-col gap-2">
                    {/* 요일 헤더 */}
                    <div className={`text-center text-sm lg:text-base font-bold py-2 lg:py-3 rounded-lg ${
                      isActive ? 'text-charcoal bg-sand/50' : 'text-charcoal/30 bg-sand/20'
                    }`}>
                      {day.day}
                    </div>

                    {/* 수업 슬롯 */}
                    {isActive ? (
                      day.slots.map((slot, i) => {
                        const colorClass = slot.place === '중계'
                          ? 'bg-apricot/20 border-apricot/30 text-[#C47840]'
                          : 'bg-lavender/20 border-lavender/30 text-[#7A5AB8]';
                        const inner = (
                          <>
                            <div className="text-xs lg:text-sm font-semibold leading-tight text-center">
                              {slot.place}
                            </div>
                            {'school' in slot && (
                              <div className="text-[11px] lg:text-sm font-semibold leading-tight text-center opacity-90">
                                {(slot as { school: string }).school}
                              </div>
                            )}
                            <div className="text-[11px] lg:text-sm font-medium tabular-nums leading-snug whitespace-nowrap text-center">
                              {slot.time}
                            </div>
                            {'link' in slot && (
                              <div className="text-[10px] lg:text-xs font-semibold mt-0.5 underline underline-offset-2 opacity-80">
                                {slot.place === '성북' ? '학원 문의 →' : '수강 신청 →'}
                              </div>
                            )}
                          </>
                        );
                        return 'link' in slot ? (
                          <a
                            key={i}
                            href={(slot as { link: string }).link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-xl py-3 lg:py-5 border flex flex-col items-center justify-center gap-1 lg:gap-2 transition-opacity hover:opacity-75 ${colorClass}`}
                          >
                            {inner}
                          </a>
                        ) : (
                          <div
                            key={i}
                            className={`rounded-xl py-3 lg:py-5 border flex flex-col items-center justify-center gap-1 lg:gap-2 ${colorClass}`}
                          >
                            {inner}
                          </div>
                        );
                      })
                    ) : null}
                  </div>
                );
              })}
            </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          보강 영상 CTA
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 bg-[#F7F4EF]">
        <div className="max-w-container mx-auto px-8 sm:px-10 lg:px-16">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-apricot/50 to-[#F5A878]/35 rounded-3xl p-10 sm:p-14 text-center border border-apricot/30">
              <h2 className="font-bold text-3xl sm:text-4xl text-charcoal mb-4">
                보강 영상 확인하기
              </h2>
              <p className="text-charcoal/80 mb-10 text-base sm:text-lg leading-relaxed">
                강사로부터 받은 날짜와 인증코드로
                <br className="sm:hidden" /> 보강 영상을 바로 확인할 수 있습니다.
              </p>
              <Link
                href="/makeup"
                className="inline-block bg-charcoal text-cream font-semibold px-10 py-4 rounded-[50px] hover:bg-[#2A2825] transition-all duration-300 hover:scale-105 shadow-lg text-base"
              >
                보강 영상 보기 →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
