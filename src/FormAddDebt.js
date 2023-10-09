import { useState } from "react";

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
            <SelectOption options={roomies} setFormData={setFormData} />
            <label> Enter the amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                handleFormChange("amount", +e.target.value);
              }}
            ></input>
            <br />
            <label> Enter the description</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => {
                handleFormChange("description", e.target.value);
              }}
            ></textarea>
          </form>

          <button onClick={handleFormSubmit}>Submit Debt</button>
        </>
      )}
    </>
  );
}
function SelectOption({ options, setFormData }) {
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
