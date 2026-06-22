import { Routes, Route, useLocation } from "react-router-dom";
import Rduser from "./Rduser";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Login from "./Login";
import History from "./History";
import ApplyLoan from "./ApplyLoan";
import LoanStatus from "./LoanStatus";
import ApprovedLoans from "./ApprovedLoans";
import LoanHistory from "./LoanHistory";
import EMICalculator from "./EMICalculator";
import Reports from "./Reports";
import Logout from "./Logout";
import Register from "./Register";
import "./App.css";
import { EmojiAngry } from "react-bootstrap-icons";
import { ImOpt } from "react-icons/im";

export default function App() {
  const location = useLocation();

  // Login page without sidebar
  // if (location.pathname === "/") {
  //   return (
  //     <Routes>
  //       <Route path="/" element={<Login />} />
  //     </Routes>
  //   );
  // }

  if (
  location.pathname === "/" ||
  location.pathname === "/register"
) {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}




  return (
    <div className="d-flex">
      
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Rduser />} />
          <Route path="/rd" element={<Rduser />} />
          <Route path="/history" element={<History />} />
           <Route path="/Applyloan" element={<ApplyLoan />} />
           <Route path="/loanstatus" element={<LoanStatus />} />
            <Route path="/approvedloans" element={<ApprovedLoans />} />
            <Route path="/loanhistory" element={<LoanHistory />} />
            <Route path="/emicalculator" element={<EMICalculator />} />
             <Route path="/reports" element={<Reports />} />
              {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </div>
  );
}