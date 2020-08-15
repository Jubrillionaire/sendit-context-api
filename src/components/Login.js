import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { loginAction } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    loginAction(loginData);
  };

  const { email, password } = loginData;
  return (
    <Form className="inputLogin" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          valuue={email}
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required={true}
        />
      </FormGroup>

      <Button>Submit</Button>
    </Form>
  );
};

export default Login;
