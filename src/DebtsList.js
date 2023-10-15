import { useState } from "react";
import Debt from "./Debt";
import Card from "@mui/material/Card";
import "./app.css";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function DebtsList({ debts, onUpdateDebt, onDeleteDebt }) {
  const [selectedId, setSelectedId] = useState("");
  function handleSelect(id) {
    setSelectedId((curId) => {
      return id === curId ? "" : id;
    });
  }
  return (
    <>
      <ul className="debts-list">
        {debts.map((debt, i) => {
          return (
            <>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "80px",
                  maxHeight: "300px",
                  backgroundColor:debt.paid ? "#dcf2de" : "#fc6a6a",
                }}
              >
                <CardContent sx={{ flexGrow: 1, minWidth: 400 }}>
                  <Typography>
                    <Debt
                      debt={debt}
                      key={debt.id}
                      onSelect={handleSelect}
                      selectedId={selectedId}
                      onUpdateDebt={onUpdateDebt}
                      onDeleteDebt={onDeleteDebt}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default DebtsList;
