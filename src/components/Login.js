import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { loginAction } from "../actions/authActions";
import { connect } from "react-redux";

const Login = props => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = e => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.loginAction(loginData);
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

export default connect(null, { loginAction })(Login);
