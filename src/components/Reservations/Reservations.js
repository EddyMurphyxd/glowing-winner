import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import DevicesSchedule from '../DevicesSchedule/DevicesSchedule';
import AddReservation from './AddReservation';

import './Reservations.scss';

function Reservations({ devices, reservations, onReservationAdded }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddReservation = (reservation) => {
    onReservationAdded(reservation);
    setIsModalOpen(false);
  }

  return (
    <section className="reservations-section">
      <h1 className="reservations-section-title">Reservations</h1>

      <div className="reservations-section__layout">
        <div className="reservations-section__layout-header">
          <p>  Dec 21, 2020</p>

          <button className="reservations-section__button" onClick={() => setIsModalOpen(true)}><span className="reservations-section__add-icon">+</span>Add Reservation</button>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={isModalOpen}>
              <AddReservation devices={devices} reservations={reservations} onReservationAdded={handleAddReservation} onClose={() => setIsModalOpen(false)}/>
            </Fade>
          </Modal>
        </div>
    
        <DevicesSchedule devices={devices} reservations={reservations} readonly />
      </div>
    </section>
  )
}

Reservations.propTypes = {
  devices: PropTypes.array.isRequired,
  reservations: PropTypes.object.isRequired,
}

export default Reservations;