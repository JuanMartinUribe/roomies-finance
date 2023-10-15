import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function FormAddDebt({ roomies, onAddDebt }) {
  const initialFormData = {
    showForm: false,
    amount: "",
    description: "",
    debtor: "",
    creditor: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const { debtor, creditor, amount, showForm, description } = formData;

  function handleFormChange(field, value) {
    if (field === "amount" && isNaN(value)) return;
    setFormData((formData) => {
      return { ...formData, [field]: value };
    });
  }

  function handleFormSubmit() {
    if (!debtor || !creditor || !amount || creditor === debtor) {
      return;
    }

    onAddDebt(formData);
    setFormData(initialFormData);
  }
  return (
    <>
      {!showForm ? (
        <button onClick={() => handleFormChange("showForm", !showForm)}>
          Add new debt
        </button>
      ) : (
        <>
          <h1>Showing FORM</h1>
          <form>

              <SelectOptions options={roomies} setFormData={setFormData} />
              <TextField
                id="outlined-basic"
                label="amount"
                value={amount}
                required={true}
                onChange={(e) => {
                  handleFormChange("amount", +e.target.value);
                }}
              ></TextField>
              <TextField
                id="outlined-basic"
                value={description}
                label="description"
                onChange={(e) => {
                  handleFormChange("description", e.target.value);
                }}
              ></TextField>
          </form>

          <button onClick={handleFormSubmit}>Submit Debt</button>
        </>
      )}
    </>
  );
}
function SelectOptions({ options, setFormData }) {
  function handleSelectChange(e) {
    const { name, value } = e.target;
    name === "creditor"
      ? setFormData((formData) => {
          return { ...formData, creditor: value };
        })
      : setFormData((formData) => {
          return { ...formData, debtor: value };
        });
  }
  return (
    <>
      <label> select the creditor</label>
      <select name="creditor" onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
      <br />
      <label> select the debtor</label>
      <select name="debtor" onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>
      <br />
    </>
  );
}

export default FormAddDebt;
