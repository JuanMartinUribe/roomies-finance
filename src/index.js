import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Roomies from "./Roomies";
import DebtsList from "./DebtsList";
import FormAddDebt from "./FormAddDebt";
import ReactDOM from "react-dom/client";
import Album from "./album";
import image1 from "./download.jpeg";
import image2 from "./download (1).jpeg";
import Navbar from "./Navbar";
import './app.css'
import { ClassNames } from "@emotion/react";
const roomiesData = [
  {
    name: "Josue",
    debt: 0,
    owed: 0,
    image: image1,
  },
  {
    name: "Daniela",
    debt: 0,
    owed: 0,
    image: image2,
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
        if (debt.debtor === roomie.name && !debt.paid) {
          roomieDebt += debt.amount;
        } else if (debt.creditor === roomie.name && !debt.paid) {
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
    setDebts((curDebts) => {
      const { showForm, ...filteredForm } = formData;
      return [
        ...curDebts,
        {
          ...filteredForm,
          paid: false,
          id: curDebts.length ? curDebts[curDebts.length - 1].id + 1 : 1,
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
  function handlePayAllDebts() {
    setDebts((debts) => {
      return debts.map((curDebt) => {
        return { ...curDebt, paid: true };
      });
    });
  }
  return (
    <>
      <Router>
        <Switch>
          <Route path="/roomies">
            <Roomies roomies={roomies} onPayAllDebts={handlePayAllDebts} />
          </Route>
          <Route path="/debts">
            <FormAddDebt roomies={roomies} onAddDebt={handleAddDebt} />
            <DebtsList
              roomies={roomies}
              debts={debts}
              onUpdateDebt={handleUpdateDebt}
              onDeleteDebt={handleDeleteDebt}
            />
          </Route>
          <Route path="/album">
            <Album />
          </Route>
        </Switch>
      </Router>
      <Navbar/>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
