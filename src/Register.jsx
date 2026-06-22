import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button
} from "react-bootstrap";
function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
  name: "",
  phone: "",
  password: ""
});
    const [errors, setErrors] = useState({});
    const validateForm = () => {

  let newErrors = {};

  if (!user.name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!user.phone.trim()) {
    newErrors.phone = "Phone Number is required";
  } else if (!/^[0-9]{10}$/.test(user.phone)) {
    newErrors.phone = "Phone Number must be 10 digits";
  }

  if (!user.password.trim()) {
    newErrors.password = "Password is required";
  } else if (user.password.length < 4) {
    newErrors.password = "Password must be at least 4 characters";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};



 
  const handleChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value
  });
};


 const handleRegister = async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }

  try {
    await axios.post( "http://localhost:8080/register", user);
    alert("Registration Successful ✅");
    navigate("/");
  } catch (err) {
    alert("Registration Failed ❌");
  }
};



  return (

    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)"
      }}
    >

      <Card
        className="border-0"
       style={{
         width: "500px",
          borderRadius: "25px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(15px)"
        }}
      >

        <Card.Body className="p-4">

          <h1
            className="text-center text-white mb-3"
          >
            📝 Register
          </h1>
          <p className="text-center text-light mb-4">
  Create Your RD System Account
</p>

          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                name="name"
                 size="lg"
                placeholder="Full Name"
                value={user.name}
                onChange={handleChange}/>
            {errors.name && (
                <small className="text-danger">
                {errors.name}
                </small>
            )}
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Control
                type="text"
                name="phone"
                size="lg"
                placeholder="Phone Number"
                value={user.phone}
                onChange={handleChange}/>
            {errors.phone && (
                <small className="text-danger">
                {errors.phone}
                </small>
            )}
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Control
                type="password"
                name="password"
                size="lg"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}/>
            {errors.password && (
                <small className="text-danger">
                {errors.password}
                </small>
            )}
            </Form.Group>

           <Button
            type="submit"   size="lg"
            className="w-100"> Register</Button>

            <div className="text-center mt-3">
            <span className="text-light">
            Already have an account?
                </span>
                <br />
                <Button
                    variant="link"
                    className="text-warning text-decoration-none"
                    onClick={() => navigate("/")}
                >
                Login Here
                </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;