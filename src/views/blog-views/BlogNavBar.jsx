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
                <div className="me-auto">
                    <Link to="/login" className="nav-link me-auto">Login</Link>
                    <Link to="/create-user" className="nav-link btn btn-outline-primary me-auto">Create user</Link>
                </div>
            </Container>
        </Navbar>
    );
}

export default BlogNavBar;