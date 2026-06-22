import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Badge, Card } from "react-bootstrap";

function LoanHistory() {

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8080/loan/all"
      );

      setLoans(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-4">

      <h2 className="mb-4 text-primary">
        📜 Loan History
      </h2>

      <Card className="shadow-sm p-3">

        <Table striped bordered hover responsive>

          <thead>
            <tr>
              <th>Loan ID</th>
              <th>RD ID</th>
              <th>Amount</th>
              <th>Apply Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {loans.map((loan) => (

              <tr key={loan.id}>

                <td>{loan.id}</td>

                <td>RD{loan.rid}</td>

                <td>₹ {loan.loanAmount}</td>

                <td>{loan.applydate}</td>

                <td>

                  {loan.status === "APPROVED" && (
                    <Badge bg="success">
                      APPROVED
                    </Badge>
                  )}

                  {loan.status === "PENDING" && (
                    <Badge bg="warning">
                      PENDING
                    </Badge>
                  )}

                  {loan.status === "REJECTED" && (
                    <Badge bg="danger">
                      REJECTED
                    </Badge>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </Table>

      </Card>

    </Container>
  );
}

export default LoanHistory;