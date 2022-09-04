import { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Post from "./pages/Post"
import Users from "./pages/Users"
import User from "./pages/User"
import Login from "./pages/Login"
import PageNotFound from "./pages/404"
import Navigation from "./components/Navigation"
import { Post } from './components/Post';

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [authUser, setAuthUser] = useState(null)

  const checkForValidUser = async () => {
    const authCheck = await fetch("/api/user/lookup")
    const checkResult = await authCheck.json()
    if (checkResult && checkResult.result === "success") {
      setAuthUser(checkResult.payload)
    }
  }

  useEffect(() => {
    checkForValidUser()
  }, [])

  return (
    <div>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home authUser={authUser} />} />
          <Route path="/login" element={<Login />} />
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
