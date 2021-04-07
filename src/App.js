import Reservations from "./components/Reservations/Reservations";

import './App.scss';

function App() {
  const handleReservation = (reservation) => {
    console.log(reservation);
  }

  return (
    <main>
      <Reservations devices={[]} onReservationAdded={handleReservation}/>
    </main>
  );
}

export default App;
