
import PropTypes from 'prop-types';

import './DevicesSchedule.scss';
import * as scheduleUtils from './scheduleUtils';

const timeStampSlots = scheduleUtils.getTimestamps();

const extractReservations = devices => {
  return devices.reduce((accum, device) => ({
    ...accum,
    [device.id]: device.reservations
  }), {});
};

function DevicesSchedule({ devices, readonly = false, onTimeSlotClicked }) {
  const reservationsDictionary = extractReservations(devices);

  const handleSlotClick = (event, deviceId, timestamp) => {
    if (readonly || event.target.classList.contains('devices-schedule__event')) {
      return;
    }

    onTimeSlotClicked({ deviceId, ...timestamp });
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

  const getSlot = (deviceId, deviceReservations, timestamp) => {
    return (
      <div className="devices-schedule__time-slot" id={getSlotId(deviceId, timestamp)} key={`timeslot-${deviceId}-${timestamp.from}`} onClick={(event) => handleSlotClick(event, deviceId, timestamp)}>
        { getReservation(deviceReservations, timestamp) }
      </div>
    )
  };

  const getSlotId = (deviceId, { from, to }) => readonly ? '' : `device-timeslot-${deviceId}-${from}-${to}`;

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
            {scheduleUtils.hoursPerDay.map(hour => getHeading(hour))}
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
