import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import "../App.css"


const Navigation = (props) => {
  return (
    // <Navbar className="nav-wrapper white">
    //   <Container>
    //     <Navbar.Brand as={Link} to="#home" className="brand-logo left" >Instaclone-</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto right hide-on-med-and-down">
    //         <Nav.Link as={Link} to="/">Home</Nav.Link>
    //         <Nav.Link as={Link} to="/users">Following</Nav.Link>
    //         <Nav.Link as={Link} to="/viewPost">View post test button</Nav.Link>
    //         <Nav.Link as={Link} to="/login">Login</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    <nav>
    <div class="nav-wrapper white">
      <a href="/" class="brand-logo">Instaclone</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><Link to ="/">Home</Link></li>
        <li><Link to ="/users">Following</Link></li>
        <li><Link to ="/viewPost">View post test button</Link></li>
        <li><Link to ="/login">Login</Link></li>
      </ul>
    </div>
  </nav>
  )
}

export default Navigation