import { TimePicker } from "@material-ui/pickers";
import { useState } from "react"
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';

import DevicesSchedule from "../DevicesSchedule/DevicesSchedule"

function AddReservation({ devices = [], onReservationAdded, onClose }) {
  const [reservation, setReservation] = useState(null);
  const [selectedFromDate, handleFromDateChange] = useState(new Date());
  const [selectedToDate, handleToDateChange] = useState(new Date());

  const handleSlotClick = (slot) => {
    setReservation({
      deviceId: '1',
    });
  }

  const handleAddClick = () => {
    onReservationAdded(reservation);
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
        <p>from: {reservation.from}</p>
        <MuiPickersUtilsProvider utils={DayJsUtils}>
          <TimePicker value={selectedFromDate} onChange={handleFromDateChange} />
          <p>to: {reservation.to}</p> 
          <TimePicker value={selectedToDate} onChange={handleToDateChange} />
        </MuiPickersUtilsProvider>
        <p>deviceId: {reservation.deviceId}</p>
      </div>}

      <button onClick={onClose}>Close</button>
      <button disabled={!reservation} onClick={() => handleAddClick()}>Add</button>
    </div>
  )
}

export default AddReservation;