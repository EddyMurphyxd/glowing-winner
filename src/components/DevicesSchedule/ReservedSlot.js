import ReactDOM from "react-dom";
import * as scheduleUtils from "./scheduleUtils";

const timeStamps = scheduleUtils.getTimestamps();

function ReservedSlot({ reservation }) {
  const timestamp = timeStamps.find(timestamp => scheduleUtils.isReservationInTimestamp(reservation, timestamp));
  const slotEl = document.getElementById(`device-timeslot-${reservation.deviceId}-${timestamp.from}-${timestamp.to}`);
  const slotPosition = scheduleUtils.getReservationPosition(reservation, timestamp);
  const slotWidth = scheduleUtils.getReservationWidth(reservation);

  return ReactDOM.createPortal(
    <div className="devices-schedule__event" style={{ left: slotPosition, width: slotWidth }}></div>,
    slotEl,
  );
}

export default ReservedSlot;