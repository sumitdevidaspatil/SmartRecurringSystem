import React, { useEffect } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Logout() {

  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem("login");

    setTimeout(() => {
      navigate("/");
    }, 2000);

  }, []);

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card className="shadow p-5 text-center">

        <h2 className="text-success mb-3">
          ✅ Logout Successfully
        </h2>

        <p>Redirecting to Login Page...</p>

        <Spinner animation="border" variant="primary" />

      </Card>
    </Container>
  );
}

export default Logout;