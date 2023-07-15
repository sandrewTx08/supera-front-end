import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export default function Component() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container className="gap-4">
        <Navbar.Brand>
          <img
            width="200"
            height="100%"
            src="/nova-logo-supera-branca.svg"
            alt=""
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <NavDropdown title="Repositorio" id="basic-nav-dropdown">
              <NavDropdown.Item href="https://github.com/sandrewTx08/PS-Java-React">
                Repositorio do Backend
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Repositorio do Frontend
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Repositorio dos quato desafios
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
