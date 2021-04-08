
import PropTypes from 'prop-types';

import './DevicesSchedule.scss';
import * as scheduleUtils from './scheduleUtils';

const extractReservations = (devices) => {
  return devices.reduce((accum, device) => ({
    ...accum,
    [device.id]: device.reservations
  }), {});
};

const hoursPerDay = scheduleUtils.getHoursPerDay();
const timeStampSlots = scheduleUtils.getTimestamps(hoursPerDay);

function DevicesSchedule({ devices, readonly = false, onTimeSlotClicked }) {
  const reservationsDictionary = extractReservations(devices);

  const handleSlotClick = (event, slot) => {
    if (readonly || event.target.classList.contains('devices-schedule__event')) {
      return;
    }

    onTimeSlotClicked(slot);
  }

  const getSlotsByDevice = (deviceId, deviceReservations) => {
    return timeStampSlots.map(timestamp => getSlot(deviceId, deviceReservations, timestamp));
  }

  const getHeading = (isoTime) => {
    const hoursMinutes = scheduleUtils.convertToHoursMinutes(isoTime);
    return (
      <div className="devices-schedule__time-heading-item" key={`heading-${hoursMinutes}`}>
        <span className="devices-schedule__time-heading-label">{hoursMinutes}</span>
      </div>
    )
  };

  const getSlot = (deviceId, deviceReservations, { from, to }) => (
    <div className="devices-schedule__time-slot" key={`timeslot-${deviceId}-${from}-${to}`} onClick={(event) => handleSlotClick(event, from)}>
      { getReservation(deviceReservations, { from, to }) }
    </div>
  )

  const getReservation = (deviceReservations, timestamp) => {
    const appropriateReservation = deviceReservations.find((reservation) => scheduleUtils.isReservationInTimestamp(reservation, timestamp));
    if (!appropriateReservation) {
      return null;
    }

    const slotPosition = scheduleUtils.getReservationPosition(appropriateReservation, timestamp);
    const slotWidth = scheduleUtils.getReservationWidth(appropriateReservation);

    return <div className="devices-schedule__event" style={{ left: slotPosition, width: slotWidth }}></div>
  }
  
  return (
    <div className="devices-schedule">
      <div className="devices-schedule__devices-column">
        <div className="devices-schedule__heading devices-schedule__device-heading">Device / Time</div>

        {
          devices.map((device, index) => (
            <div className="devices-schedule__device-row" key={`${device.name}-${index}`}>
              <strong>{device.name}</strong>
              <p>{device.firmware}</p>
            </div>
          ))
        }
      </div>

      <div className="devices-schedule__time-column">
        <div className="devices-schedule__scrollable">
          <div className="devices-schedule__heading devices-schedule__time-heading">
            {hoursPerDay.map(hour => getHeading(hour))}
          </div>

          {
            devices.map(device => (
              <div className="devices-schedule__timeline" key={`timeline-${device.id}`}>
                {getSlotsByDevice(device.id, reservationsDictionary[device.id])}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

DevicesSchedule.propTypes = {
  devices: PropTypes.array.isRequired,
  readonly: PropTypes.bool,
};

export default DevicesSchedule;
