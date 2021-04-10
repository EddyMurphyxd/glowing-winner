import { useEffect, useState } from "react";

import Reservations from "./components/Reservations/Reservations";

import './App.scss';

function fetchDevices() {
  return fetch('/mocks/devices_all.json', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => response.json());
}

function fetchReservations() {
  return fetch('/mocks/reservations_all.json', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => response.json());
}

function App() {
  const [devices, setDevices] = useState(null);
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    fetchDevices()
      .then(devices => setDevices(devices))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetchReservations()
      .then(reservations => setReservations(reservations))
      .catch(error => console.error(error));
  }, []);

  const handleReservation = (reservation) => {
    setReservations({
      ...reservations,
      [reservation.deviceId]: [...reservations[reservation.deviceId], reservation]
    })
  }

  return (
    <main>
      {devices && reservations && <Reservations devices={devices} reservations={reservations} onReservationAdded={handleReservation}/>}
    </main>
  );
}

export default App;
