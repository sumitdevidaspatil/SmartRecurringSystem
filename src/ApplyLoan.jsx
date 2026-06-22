import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

function ApplyLoan() {

const [users, setUsers] = useState([]);
const navigate = useNavigate();

  const applyLoan = async (user) => {

  const loan = {

    rid: user.rid,

    name: user.name,

    balance: user.rdamt,

    loanAmount: Math.floor(user.rdamt * 0.4),

    applydate: new Date().toISOString().split("T")[0],

    status: "PENDING"

  };

  try {

    await axios.post(
      "http://localhost:8080/loan/save",
      loan
    );

    alert(`${user.name}'s loan applied successfully! ✅`);

    navigate("/loanstatus");

  } 
  catch (err) {
  console.log("Error:", err);
  console.log("Response:", err.response);
  console.log("Data:", err.response?.data);
  alert("Loan Apply Failed");
}
};



  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/rduserdata");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Check eligibility
  const isEligible = (rddate) => {
  const startDate = new Date(rddate);
  const today = new Date();

  let months =
    (today.getFullYear() - startDate.getFullYear()) * 12 +
    (today.getMonth() - startDate.getMonth());

  // If current day is before opening day, subtract one month
  if (today.getDate() < startDate.getDate()) {
    months--;
  }

  return months >= 6;
};

  return (
    <Container className="mt-4">

      <h2 className="text-center text-primary mb-4">
        🏦 Loan Apply
      </h2>

      {/* Terms & Conditions */}

      <Alert variant="success" className="shadow-sm">

        <h4>ℹ️ Terms & Conditions</h4>

        <ul className="mb-0">
          <li>Loan is allowed only after sufficient RD balance.</li>
          <li>Minimum 6 months required loan.</li>
          <li>Maximum loan = <b>40% of RD Balance</b>.</li>
          <li>₹5000 → ₹2000 | ₹10000 → ₹4000</li>
          <li>Incorrect details may lead to rejection.</li>
        </ul>

      </Alert>

      <Row>

       {users.map((user) => {

  const eligible = isEligible(user.rddate);

  return (
            <Col md={6} lg={4} key={user.rid} className="mb-4">
          <Card className="shadow border-0 h-100">
            <Card.Body className="text-center">

          <h4>{user.name}</h4>
          <p className="text-muted">
            RD Account : RD{user.rid}
          </p>

          <p className="text-muted">
            Opening Date : {user.rddate}
          </p>
          <h3 className="text-success">
            Balance : ₹{user.rdamt}
          </h3>

          <h5>
            Maximum Loan :
            <span className="text-primary">
              ₹{Math.floor(user.rdamt * 0.4)}
            </span>
          </h5>
            {!eligible && (
              <small className="text-danger d-block mb-2">
                Loan available only after 6 months of account opening.
              </small>
            )}

            <Button
            className="w-100 mt-2"
            variant={eligible ? "primary" : "secondary"}
            disabled={!eligible}
            onClick={() => applyLoan(user)}
          >
            {eligible ? "Apply Loan" : "Not Eligible"}
          </Button>

          </Card.Body>
        </Card>
          </Col>
           );
        })}
      </Row>

      {/* No eligible users */}
      {users.filter((u) => isEligible(u.rddate)).length === 0 && (
        <Alert variant="warning" className="text-center mt-4">
          No users are currently eligible for a loan.
        </Alert>
      )}

    </Container>
  );
}

export default ApplyLoan;