import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import Cookie from "js-cookie";
const Signup = ({ setAuthUser }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [formMessage, setFormMessage] = useState({ type: "", msg: "" });

  const handleSignup = async (e) => {
    // e.preventDefault();
    setFormMessage({ type: "", msg: "" });
    const signUp = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: name,
        email: email,
        password: password,
      }),
    });
    const signUpResult = await signUp.json();
    console.log("signUp: " + JSON.stringify(signUpResult));

    //If the login was good, save the returned token as a cookie
    if (signUpResult.user_name === name) {
      const authCheck = await fetch("/api/user/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const authResult = await authCheck.json();

      console.log("authResult: " + JSON.stringify(authResult));
      console.log("authResult token: " + authResult.token);

      if (authResult.result === "success") {
        console.log("authResult token: " + authResult.token);
        Cookie.set("auth-token", authResult.token);
        setFormMessage({
          type: "success",
          msg: "Your login was successful. Proceed!",
        });

        setAuthUser(true)
      } else {
        setFormMessage({
          type: "danger",
          msg: "We could not log you in with the credentials provided.",
        });
      }
    } else {
      setFormMessage({
        type: "danger",
        msg: "We could not sign you up with the credentials provided.",
      });
    }
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setFormMessage({ type: "", msg: "" });
  //   const authCheck = await fetch("/api/user/auth", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(loginCreds),
  //   });
  //   const authResult = await authCheck.json();
  //   console.log("authResult: " + JSON.stringify(authResult));

  // If the login was good, save the returned token as a cookie
  //   if (authResult.result === "success") {
  //     Cookie.set("auth-token", authResult.token);
  //     setFormMessage({
  //       type: "success",
  //       msg: "Your login was successful. Proceed!",
  //     });
  //     window.location.href = "/";
  //   } else {
  //     setFormMessage({
  //       type: "danger",
  //       msg: "We could not log you in with the credentials provided.",
  //     });
  //   }
  //   setLoginCreds({ email: "", password: "" });
  // };

  return (
    <div className="mycard">
      <div className="card auth-card .input-field ">
        <h2>Instaclone</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="btn waves-effect waves-light"
          onClick={() => handleSignup()}
        >
          Signup
        </Button>
        {formMessage.msg.length > 0 && (
          <Alert variant={formMessage.type} style={{ marginTop: "2em" }}>
            {formMessage.msg}
          </Alert>
        )}
        <h5>
          <Link to="/login"> Already have an account ?</Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
