import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faAlignLeft, faUserAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, Nav, Dropdown, Container, NavDropdown, Form, FormControl } from "react-bootstrap";
import { Link, Route, Router } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super();

  }


  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="shadow-sm mb-2 bg-white rounded">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Button variant="outline-info" onClick={this.props.toggle}>
                <FontAwesomeIcon icon={faAlignLeft} />
              </Button>
              <Nav.Link href="/">Inicio</Nav.Link>
              <Nav.Link href="/contacto">Contactenos</Nav.Link>
              <div id="drop-user-menu">
              <NavDropdown alignRight title={<img src="https://www.tutorialrepublic.com/examples/images/avatar/3.jpg" width="40" height="40" className="rounded-circle"/>} >
                <NavDropdown.Item href="/usuario/perfil"><FontAwesomeIcon icon={faUserAlt} className="mr-2" />Perfil</NavDropdown.Item>
                <NavDropdown.Item href="/usuario/cuenta"><FontAwesomeIcon icon={faUserCircle} className="mr-2" />Cuenta</NavDropdown.Item> 
                <NavDropdown.Divider />
                <NavDropdown.Item href="/salir"><FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />Salir</NavDropdown.Item>
              </NavDropdown>
              </div>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
