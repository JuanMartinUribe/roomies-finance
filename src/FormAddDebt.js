import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

function FormAddDebt({ roomies, onAddDebt }) {
  const initialFormData = {
    showForm: false,
    amount: "",
    description: "",
    debtor: "",
    creditor: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [showErrors, setShowErrors] = useState(false);
  const { debtor, creditor, amount, showForm, description } = formData;

  function handleFormChange(field, value) {
    if (field === "amount" && isNaN(value)) return;
    setFormData((formData) => {
      return { ...formData, [field]: value };
    });
  }

  function handleFormSubmit() {
    if (!debtor || !creditor || !amount || creditor === debtor) {
      setShowErrors(true);
      return;
    }

    onAddDebt(formData);
    setFormData(initialFormData);
  }
  function handleAgentChange(e) {
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
      {!showForm ? (
        <Button
          variant="contained"
          onClick={() => {
            handleFormChange("showForm", true);
          }}
        >
          ADD DEBT
        </Button>
      ) : (
        <>
          <h1>Add new debt</h1>
          <Box
            sx={{
              minWidth: 120,
              display: "flex",
              flexDirection: "column",
              height: "350px",
              justifyContent: "space-around",
            }}
            component="form"
          >
            <SelectOption
              options={roomies}
              onAgentChange={handleAgentChange}
              formData={formData}
              agent="creditor"
              showErrors={showErrors}
            />
            <SelectOption
              options={roomies}
              onAgentChange={handleAgentChange}
              formData={formData}
              agent="debtor"
              showErrors={showErrors}
            />
            <TextField
              error={showErrors && !amount}
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
          </Box>
          <Button variant="contained" onClick={handleFormSubmit}>
            Submit new Debt
          </Button>
          <Button
            sx={{ margin: "20px" }}
            variant="outlined"
            onClick={() => {
              handleFormChange("showForm", false);
            }}
          >
            Hide form
          </Button>
        </>
      )}
    </>
  );
}
function SelectOption({ options, onAgentChange, formData, agent, showErrors }) {
  const { creditor, debtor } = formData;
  const showError =
    showErrors &&
    ((agent === "creditor" && !creditor) ||
      (agent === "debtor" && !debtor) ||
      creditor === debtor);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{agent}</InputLabel>
        <Select
          error={showError}
          labelId="demo-simple-select-label"
          name={agent}
          label={agent}
          onChange={onAgentChange}
          value={agent === "creditor" ? creditor : debtor}
          required={true}
        >
          {options.map((option, index) => {
            return (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default FormAddDebt;
