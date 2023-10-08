import { useState } from "react";

const roomiesData = [
  { name: "Josue", debt: 0, image: "https://i.pravatar.cc/48?u=933372" },
  { name: "Daniela", debt: 0, image: "https://i.pravatar.cc/48?u=118836" },
];

function App() {
  const [roomies, setRoomies] = useState(roomiesData);

  return (
    <>
      <ul>
        {roomies.map((roomie, i) => {
          return <Roomie name={roomie.name} debt={roomie.debt} key={i} />;
        })}
      </ul>
    </>
  );
}

function Roomie({ name, debt }) {
  return (
    <>
      <li>
        {name}
        {debt}
      </li>
    </>
  );
}

export default App;
