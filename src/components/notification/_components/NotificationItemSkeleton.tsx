export function NotificationItemSkeleton() {
  return (
    <li className="border-line-200 flex flex-col gap-[2px] border-b p-3">
      {/* 메시지 스켈레톤 - 여러 줄 효과 */}
      <div className="space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-3/4 animate-pulse rounded bg-gray-100" />
      </div>

      {/* 시간 스켈레톤 */}
      <div className="mt-1 h-2 w-20 animate-pulse rounded bg-gray-100" />
    </li>
  );
}
