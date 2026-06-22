import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Badge } from "react-bootstrap";

function LoanStatus() {
  const [loan, setLoan] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get("http://localhost:8080/loan/all")
      .then((res) => {
        setLoan(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📊 Loan Status</h2>

      {loan.map((item) => (
        <Card className="shadow-sm mb-3 p-3" key={item.id}>
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h5>{item.name}</h5>
              <small>RD Account : RD{item.rid}</small>
            </div>

            <div>
              <strong>₹ {item.loanAmount}</strong>
            </div>

            <div>{item.applyDate}</div>

            <div>
              <Badge
                bg={
                  item.status === "APPROVED"
                    ? "success"
                    : item.status === "REJECTED"
                    ? "danger"
                    : "warning"
                }
              >
                {item.status}
              </Badge>
            </div>

          </div>
        </Card>
      ))}
    </Container>
  );
}

export default LoanStatus;