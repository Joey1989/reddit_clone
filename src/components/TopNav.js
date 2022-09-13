import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { POPULAR_COMMUNITIES } from '../constants/';

function TopNav() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Reddit Clone</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Popular Communities" id="basic-nav-dropdown">
              {Object.keys(POPULAR_COMMUNITIES).map(key =>
                <NavDropdown.Item key={key} href={POPULAR_COMMUNITIES[key]}>{POPULAR_COMMUNITIES[key]}</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;
