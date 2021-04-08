import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)
dayjs.extend(isBetween);

export const getHoursPerDay = () => [...Array(24).keys()].map(hour => dayjs.utc().hour(hour).minute(0).second(0));

export const convertToHoursMinutes = isoTime => dayjs(isoTime).format('HH:mm');

export const getTimestamps = (hoursPerDay) => {
  return hoursPerDay.map((isoTime) => ({
    from: isoTime.format(),
    to: isoTime.add(1, 'h').format(),
  }))
}

export const isReservationInTimestamp = (reservation, { from, to }) => dayjs(reservation.from).isBetween(from, to, 'minute', '[)');
export const getReservationPosition = (reservation, slot) => {
  const startDiff = dayjs(reservation.from).diff(slot.from, 'minutes');

  return `${100 / (60 / startDiff)}%`;
};
export const getReservationWidth = ({ from, to }) => {
  const durationDiff = dayjs(to).diff(from, 'minutes');

  return `${100 / (60 / durationDiff)}%`;
}
