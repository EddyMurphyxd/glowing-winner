import PropTypes from 'prop-types';

import DevicesSchedule from '../DevicesSchedule/DevicesSchedule';

import './Reservations.scss';

function Reservations({ devices }) {
  return (
    <section className="reservations-section">
      <h1 className="reservations-section-title">Reservations</h1>

      <div className="reservations-section__layout">
        <div className="reservations-section__layout-header">
          <p>  Dec 21, 2020</p>

          <button className="reservations-section__button"><span className="reservations-section__add-icon">+</span>Add Reservation</button>
        </div>
    
        <DevicesSchedule devices={devices} readonly />
      </div>
    </section>
  )
}

Reservations.propTypes = {
  devices: PropTypes.array.isRequired
}

Reservations.defaultProps = {
  devices: []
}

export default Reservations;