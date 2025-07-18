import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="p-3 mb-4">
                <Navbar.Brand href="/">brand?</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/" activeclassname="active">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/products" activeclassname="active">
                            Products
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;