import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation ,useNavigate} from "react-router-dom";
import { FaEdit, FaTrash ,FaBook} from "react-icons/fa";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Card,
  Table
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const Rduser = () => {

  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [pShow, setPShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const openModalOnly = location.state?.openModal === true;

const [pid, setPId] = useState('');       // User ID ke liye
const [rdate, setPDate] = useState('');   // RD Date ke liye
const [ramt, setPAmount] = useState(''); 
const [lday, setLdt] = useState(0);        // Let Days (Manual Input)
const [famt, setFAmt] = useState(0);

const loggedUser = JSON.parse(
  localStorage.getItem("user")
);

useEffect(() => {

  if(loggedUser){

    setForm(prev => ({
      ...prev,
      name: loggedUser.name,
      phone: loggedUser.phone
    }));

  }

}, []);

const handlePassbookShow = (user) => {
    setPId(user.rid);              
    setPDate(user.rddate);         
    setPAmount(user.rdamt);        
    setLdt(0);
    setFAmt(0);
    setPShow(true);
};

const onPassbookSave = () => {
   const passbookData = {
    rid: pid,
    rdate: rdate,
    ramt: ramt,
    lday: lday,
    famt: famt,
    flag: 0
};
    
   axios.post("http://localhost:8080/psave", passbookData)
  .then(() => {
    alert("Saved ✅");

    setData(prev =>
      prev.map(item =>
        item.rid === pid
          ? { ...item, rdamt: ramt, rddate: rdate }
          : item
      )
    );
    setPShow(false);
  })
  .catch(err => {
    console.error("Error saving entry:", err);
    alert("Save Failed ❌");
  });
};

  const initialForm = {
    acno: "",
    addr: "",
    adharno: "",
    agree: false,
    dob: "",
    gender: "",
    name: "",
    phone:"",
    nomineaddr: "",
    nomineadhar: "",
    nominenm: "",
    nominepanno: "",
    occupation: "",
    panno: "",
    rdamt: "",
    rddate: "",
    rid: 0
  };

  const [form, setForm] = useState(initialForm);

  const loadData = async () => {
    const res = await axios.get("http://localhost:8080/rduserdata");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);


  useEffect(() => {
  if (openModalOnly) {
    setShow(true);
    setEditMode(false);
    setForm(initialForm);
  } else {
    setShow(false);
  }
}, [openModalOnly]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };


  // 👉 VALIDATION FUNCTION
  const validateForm = () => {

  // 👉 CREATE MODE → strict validation
  if (!editMode) {
    if (
      !form.name || !form.dob || !form.gender ||
      !form.occupation || !form.addr ||
      !form.acno || !form.adharno || !form.panno ||
      !form.rdamt || !form.rddate ||
      !form.nominenm || !form.nomineaddr ||
      !form.nomineadhar || !form.nominepanno
    ) {
      alert("Please fill all required fields ❌");
      return false;
    }

    if (form.adharno.length !== 12) {
      alert("Aadhaar must be 12 digits ❌");
      return false;
    }

    if (!form.agree) {
      alert("Please accept Terms & Conditions ❌");
      return false;
    }
  }

  // 👉 UPDATE MODE → relaxed validation
  if (editMode) {
    if (!form.name) {
      alert("Name cannot be empty ❌");
      return false;
    }
  }

  return true;
};

  const handleSave = async () => {
    await axios.post("http://localhost:8080/rdsave", form);
    alert("Saved Successfully ✅");
  };

  const handleUpdate = async () => {
    await axios.put("http://localhost:8080/rdupdt", form);
    alert("Updated Successfully ✅");
  };

  const calculateFine = (rddate) => {
  const today = new Date();
  const dueDate = new Date(rddate);

  const diffDays = Math.floor(
    (today - dueDate) / (1000 * 60 * 60 * 24)
     );
  return diffDays > 0 ? diffDays * 50 : 0;
};

const checkLoanEligibility = (rddate, rdamt) => {
  const start = new Date(rddate);
  const today = new Date();

  const months =
    (today.getFullYear() - start.getFullYear()) * 12 +
    (today.getMonth() - start.getMonth());
  // Condition 1: Minimum 6 months
    if (months < 6) {
      return {
        eligible: false,
        reason: "Loan allowed only after 6 months"
      };
    }
  // Condition 2: Loan amount based on RD amount
    let loanAmount = 0;
    if (rdamt >= 1000 && rdamt < 2000) {
      loanAmount = 10000;
    } else if (rdamt >= 2000 && rdamt < 3000) {
      loanAmount = 20000;
    } else if (rdamt >= 3000) {
      loanAmount = 50000;
    }
    return {
      eligible: true,
      loanAmount: loanAmount
    };
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
  const loan = checkLoanEligibility(form.rddate, form.rdamt);
  console.log(loan);

  const fine = calculateFine(form.rddate);

  const updatedForm = {
    ...form,
    famt: fine
  };

  console.log("Fine:", fine);
  if (!validateForm()) return;

  if (editMode) {
    await handleUpdate(updatedForm);
  } else {
    await handleSave(updatedForm);
  }
 setShow(false);
setEditMode(false);
setForm(initialForm);
loadData();
if (openModalOnly) {
  navigate("/home", { replace: true });
}
};
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/rddel/${id}`);
    alert("Deleted Successfully");
    loadData();
  };

  const handleEdit = (item) => {

    console.log(item);
    setForm(item);
    setEditMode(true);
    setShow(true);
  };

  const req = <span style={{ color: "red" }}>*</span>;
      return (
        <>
          {!openModalOnly && (
          <h2 className="text-center mb-4 fw-bold text-primary">
        📘 RD System
      </h2>
      )}
      {/* MODAL */} 
            <Modal
            show={show}
          onHide={() => {
        setShow(false);
        if (openModalOnly) {
          navigate("/home", { replace: true });
        }
      }}
    size="lg">
        <div className="card shadow-sm p-3 mb-3">

  <Modal.Header closeButton>
    <Modal.Title>{editMode ? "Update RD" : " 🏦 Create New RD Account"}</Modal.Title>
        </Modal.Header>
        <Card className="shadow-sm border-0 mb-4"
            style={{
              background: "linear-gradient(135deg,#667eea,#764ba2)",
              color: "white",
              borderRadius: "15px"
            }}>
  <Card.Body>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h4 className="mb-2">
          👤 Account Information
        </h4>
          {/* {loggedUser?.name} */}
          {/* <h5>{form.name}</h5> */}
       <h5>  {editMode ? form.name : loggedUser?.name} </h5>  
        

        {/* <p className="mb-0"> */}
           {/* {loggedUser?.phone} */}
          {/* 📱 {loggedUser?.phone}
        </p> */}

         <p className="mb-0">
  📱 {editMode ? form.contact : loggedUser?.phone}
</p>
      </div>

      <div>
         <span
          className="badge bg-light text-dark p-2"
          style={{ fontSize: "14px" }} >
          Active User </span>
            </div>
          </div>
        </Card.Body>
      </Card>


   </div>
        {/* <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Update RD" : "Create RD"}</Modal.Title>
        </Modal.Header> */}

        <Modal.Body>
          <Form onSubmit={handleSubmit}>

          <Card className="shadow-sm border-0 mb-3">
             <h5 className="text-primary mb-3">Personal Details</h5>

              <Row>
                <Col>
                <label>Name {req}</label>
              <Form.Control
                 name="name"  value={form.name || ""}
               onChange={handleChange}
               
                // value={loggedUser?.name}  readOnly
                style={{
                  backgroundColor: "#f1f5f9",
                  fontWeight: "600"
                }} />
                </Col>

                <Col> 
                   <label>DOB {req}</label>
                  <Form.Control type="date" name="dob" value={form.dob} onChange={handleChange} />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <label>Gender {req}</label>
                  <Form.Select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Select>
                </Col>

                <Col>
                  <label>Occupation {req}</label>
                  <Form.Control name="occupation" value={form.occupation} onChange={handleChange} />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <label>Contact Number {req}</label>
              <Form.Control value={loggedUser?.phone} readOnly
                style={{
                  backgroundColor: "#f1f5f9",
                  fontWeight: "600"
                }} />
                </Col>

                <Col>
                  <label>Address {req}</label>
                  <Form.Control name="addr" value={form.addr} onChange={handleChange} />
                </Col>
              </Row>
            </Card>

            {/* RD DETAILS  */}
             <Card className="p-3 mb-3">
            <h5 className="text-primary mb-3">RD Details </h5>

              <Row>
                <Col>
                  <label>RD Amount {req}</label>
                  <Form.Control type="number" name="rdamt" value={form.rdamt} onChange={handleChange} />
                </Col>

                <Col>
                  <label>RD Date {req}</label>
                  <Form.Control type="date" name="rddate" value={form.rddate} onChange={handleChange} />
                </Col>
              </Row> 

               <Row className="mt-2">
                <Col>
                  <label>Account No {req}</label>
                  <Form.Control type='number' name="acno" value={form.acno} onChange={handleChange} />
                </Col>

                <Col>
                  <label>Aadhaar {req}</label>
                  <Form.Control type='number' name="adharno"  placeholder="xxx-xxxx-xxxx"  value={form.adharno} onChange={handleChange} />
                </Col>
              </Row> 

              <Row className="mt-2">
                <Col>
                  <label>PAN {req}</label>
                  <Form.Control name="panno" value={form.panno} onChange={handleChange} />
                </Col>
              </Row>
            </Card> 

            {/* NOMINEE */}
             <Card className="p-3 mb-3">
             <h5 className="text-primary mb-3"> Nominee Details </h5>
              <Row>
                <Col>
                  <label>Name {req}</label>
                  <Form.Control name="nominenm" value={form.nominenm} onChange={handleChange} />
                </Col>

                <Col>
                  <label>Address {req}</label>
                  <Form.Control name="nomineaddr" value={form.nomineaddr} onChange={handleChange} />
                </Col>
              </Row>

              <Row className="mt-2">
                <Col>
                  <label>Aadhaar {req}</label> 
                   <Form.Control type='number' name="nomineadhar" placeholder='xxxx-xxxx-xxxx' value={form.nomineadhar} onChange={handleChange} />
                </Col>

                <Col>
                  <label>PAN {req}</label>
                  <Form.Control name="nominepanno" value={form.nominepanno} onChange={handleChange} />
                </Col>
              </Row>
            </Card>
            <div className="card p-3 mt-3 shadow-sm">

          <h6 className="fw-bold text-primary">📜 Terms & Conditions</h6>

              <ul style={{ fontSize: "14px" }}>
                <li>RD must be continued for minimum 12 months</li>
                <li>Monthly payment must be done on fixed date</li>
                <li>Late payment → ₹50 per day fine</li>
                <li>Account cannot be closed before maturity</li>
                <li>Loan available after 6 months</li>
              </ul>
      </div>
            {/* TERMS */}
            <Card className="p-3 mb-3">
              <Form.Check
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                label={<>I agree to Terms & Conditions {req}</>}
              />
            </Card> 
            
            {/* 🔽 LOAN ELIGIBILITY UI */}
            {form.rddate && form.rdamt && (() => {
              const loan = checkLoanEligibility(form.rddate, form.rdamt);
              return (
                <div className={`alert mt-2 ${loan.eligible ? 'alert-success' : 'alert-danger'}`}>
                  {loan.eligible
                    ? `✔ Eligible for Loan: ₹${loan.loanAmount}`
                    : `❌ ${loan.reason}`}
                </div>
              );
            })()}

            <div className="text-center">
              <Button type="submit" disabled={!form.agree}>
                {editMode ? "Update" : "Submit"}
              </Button>
            </div>  

           </Form>
        </Modal.Body>
      </Modal>  

<Modal show={pShow} onHide={() => setPShow(false)}>
    <Modal.Header closeButton>
        <Modal.Title>RD Passbook Entry</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group className="mb-2">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="text" value={pid} readOnly />
            </Form.Group>
            
            <Form.Group className="mb-2">
                <Form.Label>RD Date</Form.Label>
                <Form.Control type="date" value={rdate} onChange={(e) => setPDate(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>RD Amount</Form.Label>
                <Form.Control type="number" value={ramt} onChange={(e) => setPAmount(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Let Days</Form.Label>
                <Form.Control 
                    type="number" 
                    value={lday} 
                    onChange={(e) => setLdt(e.target.value)} 
                    placeholder="Enter Late Days"
                />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Fine Amount</Form.Label>
                <Form.Control 
                    type="number" 
                    value={famt} 
                    onChange={(e) => setFAmt(e.target.value)} 
                    placeholder="Enter Fine Amount"
                />
            </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setPShow(false)}>Close</Button>
        <Button variant="success" onClick={onPassbookSave}>Save Entry</Button>
    </Modal.Footer>
</Modal>

      {/* TABLE */}
        {!openModalOnly && (
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Gender</th><th>DOB</th>
            <th>Occupation</th><th>Acno</th><th>Aadhaar</th>
            <th>PAN</th><th>Address</th><th>Amount</th>
            <th>Date</th><th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.rid}>
              <td>{item.rid}</td>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.dob}</td>
              <td>{item.occupation}</td>
              <td>{item.acno}</td>
              <td>{item.adharno}</td>
              <td>{item.panno}</td>
              <td>{item.addr}</td>
              <td>{item.rdamt}</td>
              <td>{item.rddate}</td>
              <td>
                <Button variant="success"title='update' onClick={() => handleEdit(item)}> <FaEdit /></Button>
             < Button variant="danger" title='delete' onClick={() => handleDelete(item.rid)} className="ms-2"> <FaTrash /></Button>
             <FaBook
                style={{ cursor: "pointer", color: "blue", marginLeft: "10px" }}
                title="Passbook Entry"
                 onClick={() => handlePassbookShow(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
        )}
    </>
  );
};
export default Rduser;