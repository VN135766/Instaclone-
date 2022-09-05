import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Users from "./pages/Users";
import User from "./pages/User";
import Login from "./pages/Login";
import PageNotFound from "./pages/404";
import Navigation from "./components/Navigation";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
// import { Post } from './components/Post';
// import { Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [authUser, setAuthUser] = useState(null);

  const checkForValidUser = async () => {
    console.log("token: " + Cookie.get("auth-token"));
    //Check that the Backend validates a user's token
    const authCheck = await fetch("/api/user/lookup", {
      method: "GET",
      headers: { token: Cookie.get("auth-token") },
    });
    const checkResult = await authCheck.json();
    console.log("checkResult: " + JSON.stringify(checkResult));

    if (
      checkResult &&
      checkResult.email != null &&
      checkResult.email != undefined
    ) {
      //If the user alreacy has a valid token - show that they are already authorized
      console.log("checkResult.email: " + checkResult.email);
      setAuthUser(checkResult);
    } else {
      // Redirect to Login Page
      // window.location.href = "/login";
    }
  };

  useEffect(() => {
    console.log("right before checkForValidUser");
    checkForValidUser();
  }, []);

  return (
    <div>

      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home authUser={authUser} />} />

          <Route path="/login" element={<Login authUser={authUser} />} />
          {/* <Route path="/login" render={()=> <Login authUser={authUser} />} /> */}
          <Route path="/users" element={<Users />} />

          <Route path="/Post" element={<Post />} />

          <Route path="/user">
            <Route path=":id" element={<User />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
