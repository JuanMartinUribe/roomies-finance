import { useState } from "react";

const roomiesData = [
  { name: "Josue", debt: 0, image: "https://i.pravatar.cc/48?u=933372" },
  { name: "Daniela", debt: 0, image: "https://i.pravatar.cc/48?u=118836" },
];

function Roomies({roomies}) {

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
        {name}<br/>
        {debt}
      </li>
    </>
  );
}

export default Roomies;
