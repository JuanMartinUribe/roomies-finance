import { useState } from "react";

function Debt({ debt, selectedId, onSelect, onUpdateDebt, onDeleteDebt }) {
  const { creditor, debtor, amount, description, status, id } = debt;

  return (
    <>
      <li>
        {Object.keys(debt).map((key) => {
          return (
            <>
              <strong>
                {key} : {key !== "paid" && debt[key]}
                {key === "paid" && (debt[key] ? <>PAID</> : <>NOT PAID</>)}
              </strong>
              <br />
            </>
          );
        })}
        {selectedId !== id ? (
          <button onClick={() => onSelect(id)}> EDIT </button>
        ) : (
          <>
            <FormEditDebt
              debt={debt}
              onEdit={(formData) => {
                onUpdateDebt(formData);
                onSelect(id);
              }}
            />
          </>
        )}
        <button
          onClick={() => {
            onDeleteDebt(id);
          }}
        >
          DELETE
        </button>
      </li>
    </>
  );
}

function FormEditDebt({ debt, onEdit }) {
  const [editFormData, setEditFormData] = useState({ ...debt });
  const { amount, description, paid } = editFormData;
  function handlePaidStatusChange(e) {
    const paid = e.target.value === "yes";
    setEditFormData((curData) => {
      return { ...curData, paid };
    });
  }
  return (
    <>
      <form>
        <label>Edit the amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => {
            setEditFormData((curData) => {
              return { ...curData, amount: +e.target.value };
            });
          }}
        ></input>
        <br />
        <label>Edit the description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => {
            setEditFormData((curData) => {
              return { ...curData, description: e.target.value };
            });
          }}
        ></input>
        <br />
        <label>is it paid?</label>
        <select value={paid ? "yes" : "no"} onChange={handlePaidStatusChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </form>
      <button
        onClick={() => {
          onEdit(editFormData);
        }}
      >
        CONFIRM CHANGES
      </button>
    </>
  );
}
export default Debt;
