import React, { useState } from "react";
import "./style.css";
import Home from "../Home/index";

export default function Login(props) {
  const [username, setusername] = useState();
  const [pass, setpass] = useState();
  const data = { username: "admin", password: "password" };
  console.log(username);
  console.log(pass);
  console.log(data.username);
  console.log(data.password);
  const handlesumbit = () => {
    if (username == data.username && pass == data.password) {
      props.check(true);
    } else {
      alert("Not Match");
      props.check(false);
      setusername("");
      setpass("");
    }
  };
  return (
    <div id="constainer">
      <div id="loginform">
        <FormHeader title="Login" />
        <Form
          username={username}
          setusername={setusername}
          pass={pass}
          setpass={setpass}
        />
        <div id="button" class="row">
          <button onClick={handlesumbit}>Log in</button>
        </div>
      </div>
    </div>
  );
}

const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const Form = (props) => (
  <div>
    <FormInput
      description="Username"
      placeholder="Enter your username"
      type="text"
      name="username"
      onChange={(e) => props.setusername(e.target.value)}
      value={props.username}
    />
    <FormInput
      description="Password"
      placeholder="Enter your password"
      type="password"
      onChange={(e) => props.setpass(e.target.value)}
      value={props.pass}
    />
  </div>
);

const FormInput = ({
  onChange,
  name,
  description,
  placeholder,
  type,
  value,
}) => (
  <div class="row">
    <label>{description}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        let body = {};

        body = {
          target: {
            name: e.target.name,
            value: e.target.value,
          },
        };

        onChange(body);
      }}
      name={name}
    />
  </div>
);
