/** Small line icons drawn for this site. */
const paths: Record<string, React.ReactNode> = {
  meal: <><path d="M7 3v8a2 2 0 0 0 2 2v8" /><path d="M5 3v5M9 3v5" /><path d="M17 21V3c-2 0-3 2-3 6v4h3" /></>,
  workout: <><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11" /></>,
  chat: <><path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12Z" /></>,
  cart: <><path d="M3 4h2l2.4 11h10.2L20 7H6.2" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></>,
  bell: <><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z" /><path d="M10 20.5a2 2 0 0 0 4 0" /></>,
  home: <><path d="M4 11 12 4l8 7v9h-5v-6H9v6H4Z" /></>,
  user: <><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>,
  spark: <><path d="M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7Z" /></>,
  check: <><path d="m5 12.5 4.5 4.5L19 7.5" /></>,
  chevron: <><path d="m6 9 6 6 6-6" /></>,
  arrowUp: <><path d="M12 19V5M6 11l6-6 6 6" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  share: <><path d="M12 15V3M7.5 7.5 12 3l4.5 4.5" /><path d="M5 12v7h14v-7" /></>,
  flame: <><path d="M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-3 6-1-1-1.5-2-1.5-3C7 10 6 12.5 6 15a6 6 0 0 0 6 6Z" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  swap: <><path d="M4 8h13l-3-3M20 16H7l3 3" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  calculator: <><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" /></>,
};

export function Icon({ name, size = 20, stroke = 1.8, className }: { name: keyof typeof paths | string; size?: number; stroke?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
