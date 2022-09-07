import { Link, Navigate } from "react-router-dom";
import "../App.css"


const Navigation = ({ authUser }) => {
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
      <div className="nav-wrapper white">
        <a href="/" className="brand-logo m-2">Instaclone</a>
        {
          authUser && (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/">Home</Link></li>
              {/*<li><Link to="/users">Following</Link></li>*/}
              {/*<li><Link to="/viewPost">View post test button</Link></li>*/}
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
              <li><Link to="/create">Post</Link></li>
            </ul>
          )
        }
      </div>
    </nav>
  )
}

export default Navigation