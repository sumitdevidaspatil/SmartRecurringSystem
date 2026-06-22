import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Form, Row, Col, Button } from "react-bootstrap";
import { FaSync } from "react-icons/fa";

const History = () => {

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const res = await axios.get("http://localhost:8080/phistory");
    setHistory(res.data);
  };

  // 🔍 Filter logic
  const filtered = history.filter(h =>
    h.rid.toString().includes(search)
  );

  // 📊 Summary
  const totalDeposits = history.reduce(
  (sum, h) => sum + Number(h.ramt || 0),
  0
);
  return (
    <div className="container mt-4">

      {/* HEADER */}
      <Card className="p-3 mb-3 bg-primary text-white">
        <h4>📘 RD Transaction History</h4>
        <small>View all transactions and account details</small>
      </Card>

      {/* SEARCH + REFRESH */}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            placeholder="Search by User ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

        <Col md={6} className="text-end">
          <Button onClick={loadHistory}>
            <FaSync /> Refresh
          </Button>
        </Col>
      </Row>

      {/* TABLE */}
      <Card className="p-3 mb-3 shadow">
        <Table bordered hover>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Late Days</th>
              <th>Fine</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((h, i) => (
              <tr key={i}>
                <td>{h.rid}</td>
                <td className="text-success">₹{h.ramt}</td>
                <td>{h.rdate}</td>
                <td>{h.lday}</td>
                <td className="text-danger">₹{h.famt || 0}</td>
                <td>
                  {h.famt > 0 ? (
                    <span className="badge bg-danger">Late</span>
                  ) : (
                    <span className="badge bg-success">On Time</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* SUMMARY */}
      <Card className="p-3 text-center shadow">
        <Row>
          <Col>
            <h6>Total Transactions</h6>
            <h4>{history.length}</h4>
          </Col>

          <Col>
            <h6>Total Deposits</h6>
            <h4 className="text-primary">₹{totalDeposits}</h4>
          </Col>

          <Col>
            <h6>Total Late Fees</h6>
            <h4 className="text-danger">
              ₹{history.reduce((s, h) => s + (h.famt || 0), 0)}
            </h4>
          </Col>
        </Row>
      </Card>

    </div>
  );
};

export default History;