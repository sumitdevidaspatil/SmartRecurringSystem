import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";

function ApprovedLoans() {
  const [loans, setLoans] = useState([]);
  useEffect(() => {
    loadApprovedLoans();
  }, []);

  const loadApprovedLoans = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8080/loan/approved"
      );

      setLoans(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-4">

      <h2 className="mb-4 text-success">
        ✅ Approved Loans
      </h2>

      {loans.length === 0 ? (
        <Card className="p-4 text-center shadow">
          <h4>No Approved Loans Found</h4>
        </Card>
      ) : (

        loans.map((loan) => (
          <Card
            key={loan.id}
            className="shadow-sm mb-3 border-0"
          >

            <Card.Body>

              <Row className="align-items-center">

                <Col md={3}>
                  <h5>{loan.name}</h5>

                  <small>
                    RD Account : RD{loan.rid}
                  </small>
                </Col>

                <Col md={2}>
                  <strong>
                    ₹ {loan.loanAmount}
                  </strong>
                </Col>

                <Col md={3}>
                  {loan.applydate}
                </Col>

                <Col md={2}>
                  <Badge bg="success">
                    APPROVED
                  </Badge>
                </Col>

                <Col md={2}>
                  <span className="text-success fw-bold">
                    Loan Sanctioned
                  </span>
                </Col>
              </Row>
            </Card.Body>
          </Card>

        ))

      )}
    </Container>
  );
}
export default ApprovedLoans;