import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Roomies from "./Roomies";
import DebtsList from "./DebtsList";
import FormAddDebt from "./FormAddDebt";
import ReactDOM from "react-dom/client";

const roomiesData = [
  {
    name: "Josue",
    debt: 0,
    owed: 0,
    image: "https://i.pravatar.cc/48?u=933372",
  },
  {
    name: "Daniela",
    debt: 0,
    owed: 0,
    image: "https://i.pravatar.cc/48?u=118836",
  },
];
function App() {
  const [roomies, setRoomies] = useState(() => {
    const storedRoomies = localStorage.getItem("roomies");
    return storedRoomies ? JSON.parse(storedRoomies) : roomiesData;
  });
  const [debts, setDebts] = useState(() => {
    const storedDebts = localStorage.getItem("debts");
    return storedDebts ? JSON.parse(storedDebts) : [];
  });

  useEffect(() => {
    let changed = false;
    const newRoomies = roomies.map((roomie) => {
      let roomieDebt = 0;
      let roomieOwed = 0;
      debts.forEach((debt) => {
        if (debt.debtor === roomie.name) {
          roomieDebt += debt.amount;
        } else if (debt.creditor === roomie.name) {
          roomieOwed += debt.amount;
        }
      });
      if (roomieDebt !== roomie.debt || roomieOwed !== roomie.owed) {
        changed = true;
      }
      return { ...roomie, debt: roomieDebt, owed: roomieOwed };
    });
    if (changed) {
      setRoomies(newRoomies);
    }

    localStorage.setItem("debts", JSON.stringify(debts));
    localStorage.setItem("roomies", JSON.stringify(roomies));
  }, [debts, roomies]);

  function handleAddDebt(formData) {
    setDebts((debts) => {
      return [
        ...debts,
        {
          ...formData,
          paid: false,
          id: debts.length ? debts[debts.length - 1].id + 1 : 1,
        },
      ];
    });
  }
  function handleUpdateDebt(formData) {
    setDebts((debts) => {
      return debts.map((curDebt) => {
        return curDebt.id === formData.id
          ? { ...curDebt, ...formData }
          : curDebt;
      });
    });
  }
  function handleDeleteDebt(id) {
    setDebts((debts) => {
      return debts.filter((curDebt) => {
        return curDebt.id !== id;
      });
    });
  }
  return (
    <Router>
      <Switch>
        <Route path="/roomies">
          <Roomies roomies={roomies} />
        </Route>
        <Route path="/debts">
          <DebtsList
            roomies={roomies}
            debts={debts}
            onUpdateDebt={handleUpdateDebt}
            onDeleteDebt={handleDeleteDebt}
          />
          <FormAddDebt roomies={roomies} onAddDebt={handleAddDebt} />
        </Route>
      </Switch>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
