import React, { Component } from 'react'
import { Accordion, Card, Col, Row } from 'react-bootstrap'

export default class Module extends Component {
    render() {
        return (
            <>
                <Row>
                    <Col lg={6} className="mb-5">
                        <Accordion defaultActiveKey="0">
                            <Card bg="primary">
                                <Accordion.Toggle as={Card.Header} eventKey="0" role="button" aria-expanded="true" className="btn btn-primary py-2 shadow-sm with-chevron">
                                    <p className="d-flex align-items-center justify-content-between mb-0 px-3 py-2"><strong className="text-uppercase">Construcción de Elementos de Software 1</strong><i className="fa fa-angle-down"></i></p>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0" className="shadow-sm">
                                    <Card.Body>
                                        <p className="font-italic mb-0 text-white">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>

                    <Col lg={6} className="mb-5">
                        <Accordion defaultActiveKey="0">
                            <Card bg="danger">
                                <Accordion.Toggle as={Card.Header} eventKey="0" role="button" aria-expanded="true" className="btn btn-danger py-2 shadow-sm with-chevron">
                                    <p className="d-flex align-items-center justify-content-between mb-0 px-3 py-2"><strong className="text-uppercase">Taller de Base de Datos</strong><i className="fa fa-angle-down"></i></p>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0" className="shadow-sm">
                                    <Card.Body>
                                        <p className="font-italic mb-0 text-white">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className="mb-5">
                        <Accordion defaultActiveKey="0">
                            <Card bg="warning">
                                <Accordion.Toggle as={Card.Header} eventKey="0" role="button" aria-expanded="true" className="btn btn-warning py-2 shadow-sm with-chevron">
                                    <p className="d-flex align-items-center justify-content-between mb-0 px-3 py-2"><strong className="text-uppercase">Interpretación de Requisitos</strong><i className="fa fa-angle-down"></i></p>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0" className="shadow-sm">
                                    <Card.Body>
                                        <p className="font-italic mb-0 text-white">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>

                    <Col lg={6} className="mb-5">
                        <Accordion defaultActiveKey="0">
                            <Card bg="info">
                                <Accordion.Toggle as={Card.Header} eventKey="0" role="button" aria-expanded="true" className="btn btn-info py-2 shadow-sm with-chevron">
                                    <p className="d-flex align-items-center justify-content-between mb-0 px-3 py-2"><strong className="text-uppercase">Construcción de Elementos de Software Web 1</strong><i className="fa fa-angle-down"></i></p>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0" className="shadow-sm">
                                    <Card.Body>
                                        <p className="font-italic mb-0 text-white">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</p>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Col>

                </Row>

            </>
        )
    }
}
