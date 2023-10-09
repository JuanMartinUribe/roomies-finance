import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Roomies from "./Roomies";
import DebtsList from "./DebtsList";
import FormAddDebt from "./FormAddDebt";
import ReactDOM from "react-dom/client";

const roomiesData = [
  { name: "Josue", debt: 0, image: "https://i.pravatar.cc/48?u=933372" },
  { name: "Daniela", debt: 0, image: "https://i.pravatar.cc/48?u=118836" },
];
function App() {
  const [roomies, setRoomies] = useState(roomiesData);
  const [debts, setDebts] = useState(() => {
    const storedDebts = localStorage.getItem("debts");
    return storedDebts ? JSON.parse(storedDebts) : [];
  });

  useEffect(() => {
    localStorage.setItem("debts", JSON.stringify(debts));
  }, [debts]);

  function handleAddDebt({ creditor, debtor, amount, description }) {
    setDebts((debts) => {
      return [
        ...debts,
        {
          creditor,
          debtor,
          amount,
          description,
          paid: false,
        },
      ];
    });
  }
  return (
    <Router>
      <Switch>
        <Route path="/roomies">
          <Roomies roomies={roomies} />
        </Route>
        <Route path="/debts">
          <DebtsList roomies={roomies} debts={debts} />
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
