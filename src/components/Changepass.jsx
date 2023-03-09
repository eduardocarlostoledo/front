import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "../styles/ChangePass.css";
import { Link } from "react-router-dom";

export default function ChangePass() {
  const [fall, setFall] = useState();
  const [input, setInput] = useState({
    codeUser: 1,
    codeAxios: 1,
    email: "",
    hola: "",
    password1: "",
    password2: "",
  });
  const [alerta, setAlerta] = useState("");
  const [render, setRender] = useState(1);

  let vaciar = () => {
    document.getElementsByTagName("input")[0].value = "";
  };

  const envioMail = () => {
    axios
      .post("http://localhost:3001/users/changePass", {
        email: input.email,
      })
      .then((res) => {
        setInput({ ...input, codeAxios: res.data.pass });
      });
  };

  const handleSubmit = () => {
    axios.get("http://localhost:3001/users").then(async (res) => {
      let eso = res.data.data;
      let encuentra = await eso.find((e) => e.email === input.email);
      setFall(encuentra?.id);

      if (encuentra == undefined) {
        setAlerta(
          "this user has not been registered, try again or create an account"
        );
      } else {
        setAlerta(
          "A email has being send with a verify code to change your password. Please put to continue:"
        );
        envioMail();
        setRender(2);
      }
    });

    vaciar();
  };

  const compareCode = () => {
    if (input.codeUser == input.codeAxios) {
      setRender(3);
      setAlerta("");
      vaciar();
    } else {
      setAlerta(
        "the code entered does not match the one that was sent to you, try again"
      );
    }
  };

  const changePassword = () => {
    if (input.password1.length >= 8 && input.password1 === input.password2) {
      axios
        .put(`http://localhost:3001/users/${fall}`, {
          password: input.password1,
        })
        .then((res) => {
          setRender(4);
        });
    } else {
      setAlerta("passwords do not match or do not meet security requirements");
    }
  };

  if (render === 1) {
    return (
      <div
        className="DivIngresaEmail"
        style={{
          width: "600px",
          height: "400px",
          backgroundColor: "white",
          zIndex: "99999999",
          position: "fixed",
          marginTop: "100px",
          marginLeft: "400px",
        }}
      >
        {" "}
        <p className="PingresaEmail">
          Please, put the email account to recover your password, and follow
          instructions to verify your identity.
        </p>
        <input
          className="inputEmail"
          type="email"
          placeholder="email"
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
        <br />
        <p className="PingresaAlert" style={{ color: "red", fontSize: "2vh" }}>
          {alerta}
        </p>
        <button className="botonsIngresaEmail" onClick={() => handleSubmit()}>
          send
        </button>
      </div>
    );
  } else if (render === 2) {
    return (
      <div
        className="DivIngresaEmail"
        style={{
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          zIndex: "99999999",
          position: "fixed",
          marginTop: "100px",
          marginLeft: "400px",
        }}
      >
        <p className="PingresaEmail" style={{ color: "red" }}>
          {alerta}
        </p>
        <input
          className="inputEmail"
          defaultValue=""
          placeholder="codigo"
          type="text"
          onChange={(e) => setInput({ ...input, codeUser: e.target.value })}
        />
        <button className="botonsIngresaEmail" onClick={() => compareCode()}>
          send
        </button>
      </div>
    );
  } else if (render === 3) {
    return (
      <div
        className="DivIngresaEmail"
        style={{
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          zIndex: "99999999",
          position: "fixed",
          marginTop: "100px",
          marginLeft: "400px",
        }}
      >
        {" "}
        <p className="PingresaEmail">
          enter the new password below, remember that it must have at least 1
          uppercase, 1 lowercase and at least 8 characters.
        </p>
        <input
          className="inputEmail"
          type="password"
          placeholder="nueva contraseña"
          onChange={(e) => setInput({ ...input, password1: e.target.value })}
        />{" "}
        <br />
        reenter it <br />
        <input
          className="inputEmail"
          type="password"
          placeholder="nueva contraseña"
          onChange={(e) => setInput({ ...input, password2: e.target.value })}
        />{" "}
        <br />
        <button className="botonsIngresaEmail" onClick={() => changePassword()}>
          send
        </button>
        <p style={{ color: "red", fontSize: "2vh" }}>{alerta}</p>
      </div>
    );
  } else if (render === 4) {
    return (
      <div
        className="DivIngresaEmail"
        style={{
          fontSize: "4vh",
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          zIndex: "99999999",
          position: "fixed",
          marginTop: "100px",
          marginLeft: "400px",
        }}
      >
        {" "}
        <p className="PSuccessfully">
          Your Password has being change Successfully.
        </p>
        <Link className="LinkBack" to="/Login">
          Back to Login
        </Link>
      </div>
    );
  } else {
    return (
      <div
        className="inputEmail"
        style={{
          width: "500px",
          height: "400px",
          backgroundColor: "white",
          zIndex: "99999999",
          position: "fixed",
          marginTop: "100px",
          marginLeft: "400px",
        }}
      >
        <p style={{ color: "red", fontSize: "2vh" }}>
          there has been an error try again later!
        </p>
      </div>
    );
  }
}
