import PropTypes from 'prop-types';

import './DevicesSchedule.scss';

const extractReservations = (devices) => {
  return devices.reduce((accum, device) => ({
    ...accum,
    [device.id]: device.reservations
  }), {});
};

function DevicesSchedule({ devices, readonly = false, onTimeSlotClicked }) {
  const reservations = extractReservations(devices);

  const handleSlotClick = (event, slot) => {
    if (readonly || event.target.classList.contains('devices-schedule__event')) {
      return;
    }

    onTimeSlotClicked(slot);
  }

  const timelineHeadings = [...Array(24).keys()].map((el, index) => (
    <div className="devices-schedule__time-heading-item" key={`heading-${index}`}>
      <span className="devices-schedule__time-heading-label">{index < 10 ? `0${index}` : index}:00</span>
    </div>
  ));

  const timelineSlots = [...Array(24).keys()].map((el, index) => (
    <div className="devices-schedule__time-slot" key={`timeslot-${index}`} onClick={(event) => handleSlotClick(event, index)}>
      { index % 2 === 0 && <div className="devices-schedule__event"></div> }
    </div>
  ));
  
  return (
    <div className="devices-schedule">
      <div className="devices-schedule__devices-column">
        <div className="devices-schedule__heading devices-schedule__device-heading">Device / Time</div>

        <div className="devices-schedule__device-row">
          <strong>Htc One M8</strong>
          <p>HT59W</p>
        </div>

        <div className="devices-schedule__device-row">
          <strong>Motorola MOto X</strong>
          <p>HT59W</p>
        </div>
      </div>

      <div className="devices-schedule__time-column">
        <div className="devices-schedule__scrollable">
          <div className="devices-schedule__heading devices-schedule__time-heading">
            {timelineHeadings}
          </div>

          <div className="devices-schedule__timeline">
            {timelineSlots}
          </div>

          <div className="devices-schedule__timeline">
            {timelineSlots}
          </div>
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
