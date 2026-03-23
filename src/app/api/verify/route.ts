import { NextRequest, NextResponse } from 'next/server';
import lecturesData from '@/data/lectures.json';

// Edge Function으로 실행 - 클라이언트에 원본 데이터 노출 없이 서버 단에서 검증
export const runtime = 'edge';

interface Lecture {
  title: string;
  code: string;
  videoId: string;
}

type LecturesMap = Record<string, Lecture>;

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== 'object' ||
      body === null ||
      !('date' in body) ||
      !('code' in body)
    ) {
      return NextResponse.json(
        { error: '날짜와 인증코드를 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const { date, code } = body as { date: unknown; code: unknown };

    if (typeof date !== 'string' || !date.trim()) {
      return NextResponse.json({ error: '올바른 날짜를 입력해주세요.' }, { status: 400 });
    }

    if (typeof code !== 'string' || !code.trim()) {
      return NextResponse.json({ error: '인증코드를 입력해주세요.' }, { status: 400 });
    }

    const lectures = lecturesData as LecturesMap;
    const lecture = lectures[date.trim()];

    if (!lecture) {
      return NextResponse.json(
        { error: '해당 날짜의 보강 영상이 없습니다.' },
        { status: 404 }
      );
    }

    // 대소문자 구분 없이 비교
    if (lecture.code.toUpperCase() !== code.trim().toUpperCase()) {
      return NextResponse.json(
        { error: '인증코드가 올바르지 않습니다. 다시 확인해주세요.' },
        { status: 401 }
      );
    }

    // 검증 성공: videoId와 title만 반환 (코드는 절대 반환하지 않음)
    return NextResponse.json({
      videoId: lecture.videoId,
      title: lecture.title,
    });
  } catch {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
