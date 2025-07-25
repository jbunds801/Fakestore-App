import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

function NavBar() {

    return (
        <>
            <Navbar expand="sm" data-bs-theme="dark" className="nav-style p-3 mb-4">
                <Navbar.Brand className='fs-3 fw-lighter' href="/">FakeStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/" activeclassname="active">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/products" activeclassname="active">
                            Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="/addproduct" activeclassname="active">
                            Add Products
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;