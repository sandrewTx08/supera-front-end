import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="md"
      bg="dark"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container className="gap-4">
        <Nav.Link onClick={() => navigate("/")}>
          <Navbar.Brand>
            <img
              width="200"
              height="100%"
              src="/nova-logo-supera-branca.svg"
              alt="Supara"
            />
          </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-3">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <NavDropdown title="Repositorio" id="basic-nav-dropdown">
              <NavDropdown.Item
                target="_blank"
                href="https://github.com/sandrewTx08/PS-Java-React"
              >
                Repositorio do Backend
              </NavDropdown.Item>
              <NavDropdown.Item
                target="_blank"
                href="https://github.com/sandrewTx08/supera-front-end"
              >
                Repositorio do Frontend
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                target="_blank"
                href="https://github.com/sandrewTx08/supera-4-desafio"
              >
                Repositorio dos quato desafios
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
