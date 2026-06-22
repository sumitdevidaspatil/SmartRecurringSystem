import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import {
  HouseFill,
  PersonPlusFill,
  PeopleFill,
  BookFill,
  CashStack,
  FileTextFill,
  CheckCircleFill,
  ClockHistory,
  CalculatorFill,
  GraphUp,
  GearFill,
  BoxArrowRight,
} from "react-bootstrap-icons";

function Sidebar() {
  return (

    <Nav
      className="flex-column sidebar"

      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <Nav.Link
      as={NavLink}
      to="/dashboard"
    >
      <HouseFill className="me-2" />
      Dashboard
    </Nav.Link>

      <hr className="text-secondary" />
      <small className="text-secondary">RD MANAGEMENT</small>

     <Nav.Link
      as={NavLink} to="/rd"  state={{ openModal: true }}
      className="text-white">
      <PersonPlusFill className="me-2" />
      Add RD User
    </Nav.Link>

    <Nav.Link
      as={NavLink} to="/home" className="text-white">
      <PeopleFill className="me-2" />
      RD Users
    </Nav.Link>

      <Nav.Link
      as={NavLink} to="/history" className="text-white">
      <PeopleFill className="me-2" />
      Passbook
    </Nav.Link>

      <hr className="text-secondary" />

      <small className="text-secondary">LOAN MANAGEMENT</small>
      <Nav.Link 
      as={NavLink} to="/Applyloan"
      className="text-white">
      <CashStack className="me-2" />
        Apply Loan
      </Nav.Link>

      <Nav.Link 
      as={NavLink} to="/loanstatus"
      className="text-white">
        <FileTextFill className="me-2" />
        Loan Status
      </Nav.Link>

      <Nav.Link 
      as={NavLink} to="/approvedloans"
      className="text-white">
        <CheckCircleFill className="me-2" />
        Approved Loans
      </Nav.Link>

      <Nav.Link 
      as={NavLink} to="/loanhistory"
      className="text-white">
        <ClockHistory className="me-2" />
        Loan History
      </Nav.Link>

      <Nav.Link
      as={NavLink} to="/emicalculator"
      className="text-white">
        <CalculatorFill className="me-2" />
        EMI Calculator
      </Nav.Link>

      <hr className="text-secondary" />

      <small className="text-secondary">REPORTS</small>

      <Nav.Link 
      as={NavLink} to="/reports"
      className="text-white">
        <GraphUp className="me-2" />
        Reports
      </Nav.Link>
     
       <Nav.Link
  as={NavLink}
  to="/logout"
  className="logout-btn"
>
  <BoxArrowRight className="me-2" />
  Logout
</Nav.Link>
    </Nav>
  );
}
export default Sidebar;