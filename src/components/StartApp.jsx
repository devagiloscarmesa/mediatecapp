import React, { Component } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import faker from 'faker'
import { API_MEDIATEC_APP } from '../constantes'

export default class StartApp extends Component {
    constructor(props) {
        super()
        this.state = {
            modulos: []
        }
    }

    componentDidMount() {
        fetch(`${API_MEDIATEC_APP}modulos`)
            .then(respuesta => respuesta.json())
            .then(modulos => this.setState({ modulos: modulos }))
    }

    render() {
        return (
            <>
                <div className="py-5">
                    <Row>
                        <Col lg={12} className="mb-4">
                            <Card>
                                <Card.Body className="p-5">
                                    <h4 className="mb-4">Media Técnica App</h4>
                                    <div className="custom-scrollbar-css p-2">
                                        <p className="font-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores, soluta, cupiditate. Ad ab, delectus impedit similique voluptate fuga nemo iure, nobis dolorem dolor, quia voluptas aperiam doloremque commodi id? In? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        {this.state.modulos.map(modulo => {
                            let r = faker.random.arrayElement(['primary', 'danger', 'warning', 'info'])
                            return <Col lg={6} className="mb-5">
                                <Accordion defaultActiveKey="0">
                                    <Card bg={r}>
                                        <Accordion.Toggle as={Card.Header} eventKey="0" role="button" aria-expanded="true" className={`btn btn-${r} py-2 shadow-sm with-chevron`}>
                                            <p className="d-flex align-items-center justify-content-between mb-0 px-3 py-2"><strong className="text-uppercase">{modulo.modulo}</strong><i className="fa fa-angle-down"></i></p>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0" className="shadow-sm">
                                            <Card.Body>
                                                <p className="font-italic mb-0 text-white">{faker.lorem.paragraph()}</p>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Col>
                        })}
                    </Row>
                </div>
            </>
        );
    }
}