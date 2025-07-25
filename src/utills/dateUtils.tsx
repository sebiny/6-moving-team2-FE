import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 로케일 파일 불러옴
/*동적으로 불러와야함
// import { useLocale } from "next-intl";

// const locale = useLocale(); // 현재 언어코드 ('ko', 'en', etc.)
// const time = await formatTimeFromNow(new Date(), locale);
*/
// RelativeTime 플러그인 활성화
dayjs.extend(relativeTime);

// 기본 로케일을 한국어로 설정
dayjs.locale("ko");

export interface CalendarDate {
  date: Date;
  isOtherMonth: boolean;
}

export const generateCalendarDates = (target: dayjs.Dayjs): CalendarDate[] => {
  const startOfMonth = target.startOf("month");
  const endOfMonth = target.endOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = endOfMonth.date();

  // 이전 달 날짜
  const prevMonth = target.subtract(1, "month");
  const prevMonthDays = prevMonth.daysInMonth();

  const prevDates = Array.from({ length: startDay }, (_, i) => ({
    date: prevMonth.date(prevMonthDays - startDay + i + 1).toDate(),
    isOtherMonth: true
  }));

  // 이번 달 날짜
  const thisDates = Array.from({ length: daysInMonth }, (_, i) => ({
    date: target.date(i + 1).toDate(),
    isOtherMonth: false
  }));

  // 다음 달 날짜
  const total = prevDates.length + thisDates.length;
  const nextNeeded = total <= 35 ? 35 - total : 42 - total;

  const nextDates = Array.from({ length: nextNeeded }, (_, i) => ({
    date: target
      .add(1, "month")
      .date(i + 1)
      .toDate(),
    isOtherMonth: true
  }));

  return [...prevDates, ...thisDates, ...nextDates];
};

/**
 * 날짜/시간 값을 'n시간 전', 'm분 전' 등의 상대 시간으로 변환합니다.
 * @param dateInput - ISO 8601 형식의 문자열 또는 Date 객체
 * @returns 포맷팅된 상대 시간 문자열 (예: "2시간 전")
 */

// notification에서 사용
export function formatTimeFromNow(dateInput: string | Date): string {
  // dayjs 객체를 생성하고 .fromNow() 메서드를 호출합니다.
  return dayjs(dateInput).fromNow();
}

// 참고: .fromNow(true)를 사용하면 'n시간' 처럼 '전'이라는 접미사가 제거됩니다.
// 예: dayjs('2023-01-01').fromNow() -> "2년 전"
//

// 견적 상세 페이지에서 사용할 날짜 포맷팅 함수
export function formatDate(dateString: string): string {
  return dayjs(dateString).format("YY.MM.DD");
}

// 견적 상세 페이지에서 사용할 날짜+시간 포맷팅 함수
export function formatDateTime(dateString: string): string {
  return dayjs(dateString).format("YYYY. MM. DD(ddd) A h:mm");
}
