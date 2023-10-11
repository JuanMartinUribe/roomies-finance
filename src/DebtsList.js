import { useState } from "react";
import Debt from "./Debt";

function DebtsList({ debts, onUpdateDebt, onDeleteDebt }) {
  const [selectedId, setSelectedId] = useState("");
  function handleSelect(id) {
    setSelectedId((curId) => {
      return id === curId ? "" : id;
    });
  }
  return (
    <>
      <ul>
        {debts.map((debt, i) => {
          return (
            <Debt
              debt={debt}
              key={debt.id}
              onSelect={handleSelect}
              selectedId={selectedId}
              onUpdateDebt={onUpdateDebt}
              onDeleteDebt={onDeleteDebt}
            />
          );
        })}
      </ul>
    </>
  );
}

export default DebtsList;
