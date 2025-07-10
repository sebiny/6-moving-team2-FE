import dayjs from "dayjs";

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
