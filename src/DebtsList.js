import { useState } from "react";

function DebtsList({ roomies, debts }) {
  return (
    <>
      <ul>
        {debts.map((debt, i) => {
          return <Debt debt={debt} key={i} />;
        })}
      </ul>
    </>
  );
}

function Debt({ debt }) {
  const { creditor, debtor, amount, description, status } = debt;
  return (
    <>
      <li>
        {Object.keys(debt).map((key) => {
          return (
            <>
              <strong key={key}>
                {key} : {debt[key]}
              </strong>
              <br />
            </>
          );
        })}
      </li>
    </>
  );
}

export default DebtsList;
