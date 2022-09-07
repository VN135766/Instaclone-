import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import User from "./pages/User";
import Login from "./pages/Login";
import PageNotFound from "./pages/404";
import Navigation from "./components/Navigation";
import Cookie from "js-cookie";
import Signup from "./pages/Signup";
import Signout from "./pages/Signout"
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreatePost from "./pages/CreatePost";

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

    var loggedIn = false;

    if (
      checkResult &&
      checkResult.email != null &&
      checkResult.email != undefined
    ) {
      //If the user alreacy has a valid token - show that they are already authorized
      console.log("checkResult.email: " + checkResult.email);
      setAuthUser(checkResult);
      loggedIn = true;
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
        <Navigation authUser={authUser} />
        <Routes>
          <Route
            path="/"
            element={
              authUser ? <Home /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="/signout"
            element={
              authUser ? <Signout
                setAuthUser={setAuthUser}
              /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="/users"
            element={
              authUser ? <Users /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="/create"
            element={
              authUser ? <CreatePost /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            path="/user/:id"
            element={<User />}
          />

          <Route path="/login" element={<Login authUser={authUser} setAuthUser={setAuthUser} />} />
          <Route path="/signup" element={<Signup setAuthUser={setAuthUser} />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>

      {/* <Router>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Home authUser={authUser} />} 
          render={() => (
            authUser.email ? (
              <Navigate to="/"/>
            ) : (
              <Login/>
            )
          )}/>

          <Route path="/login" element={<Login authUser={authUser} />} />
          <Route path="/signup" element={<Signup />} />
          { <Route path="/login" render={()=> <Login authUser={authUser} />} /> }
          <Route path="/users" element={<Users />} />

          <Route path="/Post" element={<Post />} />

          <Route path="/user">
            <Route path=":id" element={<User />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
