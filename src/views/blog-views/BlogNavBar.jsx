import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function BlogNavBar() {
    return ( 
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">LFE</Navbar.Brand>
                <Nav className="me-auto">
                    <Link to="/" className="nav-link">Home</Link>
                </Nav>
                <Nav className="ms-auto">
                    <Link to="/login" className="nav-link me-auto">Login</Link>
                    <Link to="/create-user" className="nav-link me-auto">Sign up</Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default BlogNavBar;