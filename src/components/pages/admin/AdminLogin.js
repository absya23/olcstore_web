import React, { useState, useEffect } from "react";
import "./AdminLogin.scss";
import { Container, Button, Table, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const checkLogin = () => {
    if (username === "admin" && pass === "admin") {
      alert("Đăng nhập thành công");
      navigate(`/admin/manage-catalog/`);
    } else {
      alert("Đăng nhập thất bại");
      setUsername("");
      setPass("");
    }
  };
  return (
    <div id="main-container" className="d-grid">
      <Form id="sign-in-form" className="text-center p-3 w-100">
        <h1 className="mb-3 fs-3 fw-normal">Đăng nhập admin</h1>
        <Form.Group className="mb-2" controlId="sign-in-email-address">
          <Form.Control
            type="email"
            size="lg"
            value={username}
            placeholder="Tên đăng nhập"
            autoComplete="username"
            className="position-relative"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sign-in-password">
          <Form.Control
            type="password"
            size="lg"
            value={pass}
            placeholder="Mật khẩu"
            autoComplete="current-password"
            className="position-relative"
            onChange={(e) => setPass(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid">
          <Button variant="primary" size="lg" onClick={checkLogin}>
            Sign in
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminLogin;
