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
