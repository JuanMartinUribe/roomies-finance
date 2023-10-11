function Roomies({ roomies,onPayAllDebts }) {
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
      <button onClick={onPayAllDebts}>PAY ALL DEBTS</button>
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
