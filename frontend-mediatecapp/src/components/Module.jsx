import React, { Component } from 'react'
import { Accordion, Card, Col, Row } from 'react-bootstrap'
import faker from 'faker'
import {API_MEDIATEC_APP} from './../constantes'

export default class Module extends Component {
    constructor(params) {
        super()
        this.state = {
            modulos: []
        }
    }
    async componentDidMount() {
        let respuesta = await fetch(`${API_MEDIATEC_APP}modulos`)
        let modulos = await respuesta.json()
        this.setState({ modulos: modulos })
    }

    render() {
        return (
            <>
                <Row>
                    {this.state.modulos.map((modulo, i) => {
                        let r = faker.random.arrayElement(['primary', 'danger', 'warning', 'info'])
                        return <Col key={i} lg={6} className="mb-5">
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

            </>
        )
    }
}
