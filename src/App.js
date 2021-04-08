import Reservations from "./components/Reservations/Reservations";

import './App.scss';
import { useEffect, useState } from "react";

function fetchDevices() {
  return fetch('/mocks/devices_all.json', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => response.json());
}

function App() {
  const [devices, setDevices] = useState(null);

  useEffect(() => {
    fetchDevices()
      .then(devices => setDevices(devices))
      .catch(error => console.error(error));
  }, []);

  const handleReservation = (reservation) => {
    console.log(reservation);
  }

  return (
    <main>
      {devices && <Reservations devices={devices} onReservationAdded={handleReservation}/>}
    </main>
  );
}

export default App;
