import "./app.css";
import Button from "@mui/material/Button";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";

function Roomies({ roomies, onPayAllDebts }) {
  return (
    <div className="roomies">
      <Navbar className="roomies-navbar"/>
      <ul className="roomies-list">
        {roomies.map((roomie, i) => {
          return (
            <>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "80px",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    pt: "56.25%",
                  }}
                  image={roomie.image}
                />
                <CardContent sx={{ flexGrow: 1, minWidth: 400 }}>
                  <h1>{roomie.name}</h1>

                  <Typography>
                    <Roomie
                      name={roomie.name}
                      debt={roomie.debt}
                      owed={roomie.owed}
                      key={i}
                    />
                  </Typography>
                </CardContent>
              </Card>
            </>
          );
        })}
      </ul>
      <Button variant="contained" onClick={onPayAllDebts}>
        PAY ALL DEBTS
      </Button>
    </div>
  );
}

function Roomie({ debt, owed }) {
  const balance = owed - debt;
  console.log(debt, owed);
  return (
    <>
      <li className="roomie">
        debt : {debt}
        <h2>total balance</h2>
        <h1 className={balance < 0 ? "balance-red" : "balance"}>
          {owed - debt} $
        </h1>
      </li>
    </>
  );
}

export default Roomies;
