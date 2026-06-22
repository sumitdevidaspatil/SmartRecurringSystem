import React, { useState,useEffect} from "react";
import axios from "axios";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";

function EMICalculator() {

  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");

  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

         useEffect(() => {
        loadLoans();
        }, []);

        const loadLoans = async () => {
        try {

            const res = await axios.get(
            "http://localhost:8080/loan/approved"
            );

            setLoans(res.data);

        } catch (err) {
            console.log(err);
        }
        };

  const calculateEMI = () => {

    if (!amount || !rate || !months) {
      alert("Please fill all fields");
      return;
    }

    const P = parseFloat(amount);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseInt(months);

    const EMI =
      (P * R * Math.pow(1 + R, N)) /
      (Math.pow(1 + R, N) - 1);

    const total = EMI * N;
    const interest = total - P;

    setEmi(EMI.toFixed(2));
    setTotalPayment(total.toFixed(2));
    setTotalInterest(interest.toFixed(2));
  };

  return (
    <Container className="mt-4">

      <h2 className="text-center text-primary mb-4">
        🧮 EMI Calculator
      </h2>

      <Card className="shadow border-0">
        <Card.Body>
          <Row>
                <Form.Group className="mb-3">

  <Form.Label>
    Select Approved Loan
  </Form.Label>

  <Form.Select
    value={selectedLoan}
    onChange={(e) => {

      const loanId = e.target.value;

      setSelectedLoan(loanId);

      const loan = loans.find(
        (l) => l.id == loanId
      );

      if (loan) {

        setAmount(loan.loanAmount);
      }
    }}
  >

    <option value="">
      Select Loan
    </option>

    {loans.map((loan) => (

      <option
        key={loan.id}
        value={loan.id}
      >
        RD{loan.rid} - {loan.name} - ₹{loan.loanAmount}
      </option>

    ))}

  </Form.Select>

</Form.Group>

{selectedLoan && (

<Card className="mt-3 shadow-sm">

<Card.Body>

<h5>Loan Details</h5>

{(() => {

const loan = loans.find(
(l) => l.id == selectedLoan
);

return loan ? (

<>
<p>
<b>Name :</b> {loan.name}
</p>

<p>
<b>RD Account :</b> RD{loan.rid}
</p>

<p>
<b>Loan Amount :</b> ₹{loan.loanAmount}
</p>

<p>
<b>Apply Date :</b> {loan.applydate}
</p>

<p>
<b>Status :</b> {loan.status}
</p>
</>

) : null;

})()}

</Card.Body>

</Card>

)}

            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  Interest Rate (%)
                </Form.Label>
                <Form.Control
                  type="number"
                  value={rate}
                  onChange={(e) =>
                    setRate(e.target.value)
                  }
                  placeholder="Enter Interest Rate"
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>
                  Loan Tenure (Months)
                </Form.Label>
                <Form.Control
                  type="number"
                  value={months}
                  onChange={(e) =>
                    setMonths(e.target.value)
                  }
                  placeholder="Enter Months"
                />
              </Form.Group>
            </Col>

          </Row>

          <div className="text-center mt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={calculateEMI}
            >
              Calculate EMI
            </Button>
          </div>

        </Card.Body>
      </Card>
      {emi > 0 && (

        <Card className="shadow mt-4 border-0">

          <Card.Body>

            <h4 className="text-success mb-3">
              EMI Result
            </h4>

            <Row>

              <Col md={4}>
                <Card className="text-center p-3">
                  <h5>Monthly EMI</h5>
                  <h3 className="text-primary">
                    ₹ {emi}
                  </h3>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="text-center p-3">
                  <h5>Total Interest</h5>
                  <h3 className="text-danger">
                    ₹ {totalInterest}
                  </h3>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="text-center p-3">
                  <h5>Total Payment</h5>
                  <h3 className="text-success">
                    ₹ {totalPayment}
                  </h3>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}

export default EMICalculator;