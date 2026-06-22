import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaRupeeSign, FaMoneyBillWave, FaExclamationTriangle } from "react-icons/fa";
import { Card, Table } from "react-bootstrap";

const Dashboard = () => {
  
  const checkLoanEligibility = (rddate, rdamt) => {
  const start = new Date(rddate);
  const today = new Date();
  const months =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());

  if (months < 6) {
    return { eligible: false };
  }
  let loanAmount = 0;
  if (rdamt >= 1000 && rdamt < 2000) loanAmount = 10000;
  else if (rdamt >= 2000 && rdamt < 3000) loanAmount = 20000;
  else if (rdamt >= 3000) loanAmount = 50000;
  return { eligible: true, loanAmount };
};
    const getMonthlyCollection = () => {
    const currentMonth = new Date().getMonth();
     return history
    .filter(h => new Date(h.rdate).getMonth() === currentMonth)
    .reduce((sum, h) => sum + Number(h.ramt || 0), 0);
    };


  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const activeUsers = users.filter(u => u.rdamt > 0).length;
  const inactiveUsers = users.length - activeUsers;

  useEffect(() => {
    loadDashboard();
    loadUsers();
    loadHistory();
  }, []);

  const loadDashboard = async () => {
    const res = await axios.get("http://localhost:8080/dashboard");
    setData(res.data);
  };

  const loadUsers = async () => {
    const res = await axios.get("http://localhost:8080/rduserdata");
    setUsers(res.data);
  };

  const loadHistory = async () => {
    const res = await axios.get("http://localhost:8080/phistory");
    setHistory(res.data);
  };

  return (
   <div className="container dashboard-container">
    <h2 className="text-center mb-4 fw-bold text-primary">
        📊 Dashboard
        </h2>

      {/* TOP CARDS */}
    <div className="row g-4 mb-4">

  {/* CARD 1 */}
  <div className="col-md-4">
    <div className="dashboard-card gradient-blue">
      <FaUsers className="icon" />
      <h6>Total Users</h6>
      <h2>{data.totalUsers}</h2>
    </div>
  </div>

  {/* MONTHLY */}
  <div className="col-md-4">
    <div className="dashboard-card gradient-cyan">
      <FaMoneyBillWave className="icon" />
      <h6>Monthly Collection</h6>
      <h2>₹{getMonthlyCollection()}</h2>
    </div>
  </div>

  {/* BALANCE */}
  <div className="col-md-4">
    <div className="dashboard-card gradient-green">
      <FaRupeeSign className="icon" />
      <h6>Total Balance</h6>
      <h2>₹{data.totalBalance}</h2>
    </div>
  </div>

  {/* LATE FEES */}
  <div className="col-md-4">
    <div className="dashboard-card gradient-red">
      <FaExclamationTriangle className="icon" />
      <h6>Total Late Fees</h6>
      <h2>₹{data.totalLateFees}</h2>
    </div>
  </div>

  {/* ACTIVE */}
  <div className="col-md-4">
    <div className="dashboard-card gradient-dark">
      <FaUsers className="icon" />
      <h6>Active Users</h6>
      <h2>{activeUsers}</h2>
    </div>
  </div>

  {/* INACTIVE */}
  <div className="col-md-4">
    <div className="dashboard-card gradient-gray">
      <FaUsers className="icon" />
      <h6>Inactive Users</h6>
      <h2>{inactiveUsers}</h2>
    </div>
  </div>
</div>

      {/* USER STATUS */}
     {/* <!--  <div className="card shadow-sm mb-4 border-0"> -->
        <div className="card-header bg-light fw-bold">
        👤 User Status
        </div> */}

        {/* <div className="card-body">
        <table className="table table-hover table-striped">
         <thead className="table-dark"> */}
            {/* <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Loan Status</th>
            </tr>
          </thead> */}

          {/* <tbody>
            {users.map(u => (
              <tr key={u.rid}>
                <td>{u.rid}</td>
                <td>{u.name}</td>
                <td>{u.rdamt}</td>
               <td>
                {u.rdamt > 0 ? (
                <span className="badge bg-success">Active</span>
                 ) : (
                <span className="badge bg-secondary">Inactive</span>
                     )}
                </td>
                <td>
                {(() => {
                  const loan = checkLoanEligibility(u.rddate, u.rdamt);
                  return loan.eligible ? (
                   <span className="badge bg-success px-3 py-2">
                  Eligible ₹{loan.loanAmount}
                  </span>
                  ) : (
                    <span className="badge bg-danger">
                      Not Eligible
                    </span>
                  );
                })()}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
         </div> 
        </div> */}

      {/* RECENT TRANSACTIONS */}
      <Card className="p-3">
        <h5>Recent Transactions</h5>

        <Table bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {history.slice(0, 5).map((h, i) => (
              <tr key={i}>
                <td>{h.rid}</td>
                <td>{h.rid}</td>
                <td>{h.ramt}</td>
                <td>{h.rdate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;