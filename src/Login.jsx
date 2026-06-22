import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button,Toast } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Login() {
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [toastType, setToastType] = useState("success"); 
  const [user, setUser] = useState({ phone: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/login", user);
      console.log(res.data);
if (res.data) {

  localStorage.setItem(
    "user",
    JSON.stringify(res.data)
  );

  setToastMsg("Login Success ✅");
  setToastType("success");
  setShowToast(true);

  setTimeout(() => {
    navigate("/dashboard");
  }, 1500);

} else {

  setToastMsg("Invalid Credentials ❌");
  setToastType("danger");
  setShowToast(true);
}

    } catch (err) {
      console.log(err);
      toast.error("Server Error ❌");  
    }
  };

  return (
        <>
   <div
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
      <Toast
        bg={toastType}
        show={showToast}
        onClose={() => setShowToast(false)}
        autohide
      >
      <Toast.Header>
        <strong className="me-auto">
          {toastType === "success" ? "Success" : "Error"}
        </strong>
      </Toast.Header>
      <Toast.Body className="text-white">
        {toastMsg}
      </Toast.Body>
    </Toast>
  </div> 

    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
      }}
    >
      `<Row>
        <Col>            
        <Card
        className="border-0"
        style={{
          width: "420px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
        }}
      >
            <Card.Body className="p-4">
              
            <h1
            className="text-center mb-2 text-white"
            style={{ fontWeight: "700" }}
           >
            🏦 RD System
          </h1>
        <p
          className="text-center mb-4"
          style={{ color: "#e2e8f0" }}
        >
          Secure Login Portal
        </p>
             <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone Number "
                  size="lg"
                  value={user.phone}
                  onChange={handleChange}
                  style={{height: "55px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                }} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  size="lg"
                  value={user.password}
                  onChange={handleChange}

                     style={{
                     height: "55px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.2)",
                      color: "white",
                      border: "1px solid rgba(255,255,255,0.2)",
                    }}
                />
              </Form.Group>

                  <Button
                  type="submit"
                  className="w-100"
                  style={{
                    height: "55px",
                    border: "none",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(90deg,#2563eb,#7c3aed)",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                Login To Dashboard
              </Button>
            <div className="text-center mt-3">
            <span style={{ color: "#e2e8f0" }}>
              Don't have an account?
            </span>
            <br />

        <Button
          variant="link"
          onClick={() => navigate("/register")}
          style={{
            color: "#ffd700",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Register Here
        </Button>
      </div>
            </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}