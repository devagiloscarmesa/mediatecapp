import React, { Component } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import logo from '../images/logoMTApp.png'

export default class InicioSesion extends Component {
    render() {
        return (
            <Container className="d-flex align-items-center flex-column">
                <Card bg="light" text="dark" className="col-12 col-lg-5 login-card mt-5 hv-center">
                    <Row className="align-items-center flex-column mt-4">
                        <Col xs={6} md={4}>
                            <Image src={logo} fluid />
                        </Col>
                    </Row>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="correo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese el correo" />
                                <Form.Text className="text-muted">
                                    Ingrese su correo institucional
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="contrasena">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña" />
                                <Link to="/recuperar-contrasena" className="btn btn-link">¿Has olvidado tu contraseña?</Link>
                            </Form.Group>
                            <Form.Group controlId="recordar">
                                <Form.Check type="checkbox" label="Recordar" />
                            </Form.Group>
                            <Row>
                                <Col className="align-items-center flex-column">
                                    <Button variant="primary" type="submit">Iniciar</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

            </Container>
        );
    }
}