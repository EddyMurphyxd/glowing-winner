import { useState } from "react";
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import DevicesSchedule from "../DevicesSchedule/DevicesSchedule";
import ReservedSlot from "../DevicesSchedule/ReservedSlot";
import { TextField } from "@material-ui/core";

import { convertToHoursMinutes } from '../DevicesSchedule/scheduleUtils';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

function AddReservation({ devices, reservations, onReservationAdded, onClose }) {
  const [reservation, setReservation] = useState(null);

  const handleSlotClick = (reservation) => {
    setReservation(reservation);
  }

  const handleAddClick = () => {
    onReservationAdded(reservation);
  }

  const handleFromDateChange = (from) => {
    const convertedFrom = dayjs.utc().hour(from.split(':')[0]).minute(from.split(':')[1]).second(0).format('YYYY-MM-DDTHH:mm:ss');
    const to = dayjs(convertedFrom).isSameOrAfter(reservation.to) ? dayjs(convertedFrom).add(1, 'h') : reservation.to;
    setReservation({
      ...reservation,
      from: convertedFrom,
      to,
    })
  }

  const handleToDateChange = (to) => {
    const convertedTo = dayjs.utc().hour(to.split(':')[0]).minute(to.split(':')[1]).second(0).format('YYYY-MM-DDTHH:mm:ss');
    const from = dayjs(convertedTo).isSameOrBefore(reservation.from) ? dayjs(convertedTo).subtract(1, 'h') : reservation.from;
    setReservation({
      ...reservation,
      to: convertedTo,
      from,
    })
  }

  return (
    <div className="add-reservation" style={{
      backgroundColor: '#fff',
      padding: '25px',
      top: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      left: '50%',
    }}>
      <h2>Click on a time slot to select the wanted reservation</h2>

      <DevicesSchedule devices={devices} reservations={reservations} onTimeSlotClicked={(slot) => handleSlotClick(slot)} />

      {reservation && <div className="add-reservation__select-time">
        <ReservedSlot reservation={reservation} />
        
        <div style={{ padding: '20px 0' }}>
          <TextField
            label="From"
            type="time"
            value={convertToHoursMinutes(reservation.from)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1800, // 30 min
            }}
            onChange={(event) => handleFromDateChange(event.target.value)}
            style={{ marginRight: '15px' }}
          />
          <TextField
            label="To"
            type="time"
            value={convertToHoursMinutes(reservation.to)}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1800, // 30 min
            }}
            onChange={(event) => handleToDateChange(event.target.value)}
          />
        </div>
      </div>}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={onClose}>Close</button>
        <button disabled={!reservation} onClick={() => handleAddClick()}>Add</button>
      </div>
    </div>
  )
}

export default AddReservation;