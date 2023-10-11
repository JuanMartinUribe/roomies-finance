import { useState } from "react";

function Roomies({ roomies }) {
  return (
    <>
      <ul>
        {roomies.map((roomie, i) => {
          return (
            <Roomie
              name={roomie.name}
              debt={roomie.debt}
              owed={roomie.owed}
              key={i}
            />
          );
        })}
      </ul>
    </>
  );
}

function Roomie({ name, debt, owed }) {
  console.log(debt, owed);
  return (
    <>
      <li>
        name: {name}
        <br />
        debt : {debt}
        <br />
        owed: {owed}
        <br />
        total balance: {owed - debt}
      </li>
    </>
  );
}

export default Roomies;
