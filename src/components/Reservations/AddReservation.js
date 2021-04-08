import { useState } from "react";
import dayjs from "dayjs";

import DevicesSchedule from "../DevicesSchedule/DevicesSchedule";
import ReservedSlot from "../DevicesSchedule/ReservedSlot";
import { TextField } from "@material-ui/core";

import { convertToHoursMinutes } from '../DevicesSchedule/scheduleUtils';

function AddReservation({ devices = [], onReservationAdded, onClose }) {
  const [reservation, setReservation] = useState(null);

  const handleSlotClick = (reservation) => {
    setReservation(reservation);
  }

  const handleAddClick = () => {
    onReservationAdded(reservation);
  }

  const handleFromDateChange = (from) => {
    setReservation({
      ...reservation,
      from: dayjs.utc().hour(from.split(':')[0]).minute(from.split(':')[1]).second(0).format('YYYY-MM-DDTHH:mm:ss')
    })
  }

  const handleToDateChange = (to) => {
    setReservation({
      ...reservation,
      to: dayjs.utc().hour(to.split(':')[0]).minute(to.split(':')[1]).second(0).format('YYYY-MM-DDTHH:mm:ss')
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

      <DevicesSchedule devices={devices} onTimeSlotClicked={(slot) => handleSlotClick(slot)} />

      {reservation && <div className="add-reservation__select-time">
        <ReservedSlot reservation={reservation} />
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
        <p>deviceId: {reservation.deviceId}</p>
      </div>}

      <button onClick={onClose}>Close</button>
      <button disabled={!reservation} onClick={() => handleAddClick()}>Add</button>
    </div>
  )
}

export default AddReservation;