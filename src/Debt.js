import { useState } from "react";
import { Button } from "@mui/material";
function Debt({ debt, selectedId, onSelect, onUpdateDebt, onDeleteDebt }) {
  const { creditor, debtor, amount, description, id } = debt;

  return (
    <>
      <li>
        <h2>debtor: {debtor}</h2>
        <h3>creditor: {creditor}</h3>
        {selectedId !== id ? (
          <>
            <h3>{description}</h3>
            <h1>{amount} $</h1>
            <Button variant="contained" onClick={() => onSelect(id)}>
              {" "}
              EDIT{" "}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                onDeleteDebt(id);
              }}
            >
              DELETE
            </Button>
          </>
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
      <Button
        variant="contained"
        onClick={() => {
          onEdit(editFormData);
        }}
      >
        CONFIRM CHANGES
      </Button>
    </>
  );
}
export default Debt;
