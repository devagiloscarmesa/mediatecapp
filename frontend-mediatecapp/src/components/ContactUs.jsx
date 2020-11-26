import React, { Component } from 'react'
import { Col, Row, Form, Card, InputGroup, FormControl, Button } from 'react-bootstrap'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import faker from 'faker'
import moment from 'moment'
import Loader from './Loader'
import {API_MEDIATEC_APP} from './../constantes'

export default class ContactUs extends Component {
    constructor(props) {
        super()
        this.state = {
            cargando : false,
            nombres_apellidos: "",
            correo: "",
            mensaje: ""
        }
    }
    cambioEntradaCampoFormulario = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let state = Object.assign({}, this.state)
        state[name] = value
        this.setState({ ...state })
    }
    sendMessage = async e => {
        e.preventDefault()
        let mensaje = Object.assign({}, this.state)
        let request = null, respuesta = null
        this.setState({ cargando: true })
        mensaje.id = faker.random.number()
        mensaje.fecha_creacion = moment().format('YYYY-MM-DD HH:mm:ss')

        request = new Request(`${API_MEDIATEC_APP}contactanos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id :  mensaje.id,
                nombres_apellidos :  mensaje.nombres_apellidos,
                correo : mensaje.correo,
                mensaje :  mensaje.mensaje,
                fecha_creacion :  mensaje.fecha_creacion 
            })
        });

        respuesta = await fetch(request)
        this.setState({ cargando: false })
        if (respuesta.status === 201) {
            NotificationManager.success('El mensaje fue enviado exitosamente.', 'Mensaje envíado', 5000);
            this.setState({ showNewModal: false, id :  "", nombres_apellidos :  "", correo : "", mensaje : "", fecha_creacion :  ""  })
        } else {
            NotificationManager.error('Se presento un error durante el envío de la información.', 'Error', 2000);
        }
    }
    render() {
        return (
            <>
                <Row className="justify-content-center">
                    <Col md={8} lg={10} className="col-12 pb-5 mt-3">
                        <Form onSubmit={this.sendMessage}>
                            <Card className="border-primary rounded-0">
                                <Card.Header className="p-0">
                                    <div className="bg-info text-white text-center py-2">
                                        <h3><i className="fa fa-envelope"></i> Contactanos</h3>
                                        <p className="m-0">Con gusto te ayudaremos</p>
                                    </div>
                                </Card.Header>
                                <Card.Body className="p-3">
                                    <Form.Group>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><i className="fa fa-user text-info"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl value={this.state.nombres_apellidos} placeholder="Nombre y Apellido" type="text" name="nombres_apellidos" id="nombres_apellidos" required onChange={this.cambioEntradaCampoFormulario} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><i className="fa fa-envelope text-info"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl value={this.state.correo} type="email" onChange={this.cambioEntradaCampoFormulario} placeholder="ejemplo@gmail.com" name="correo" id="correo" required />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><i className="fa fa-comment text-info"></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl value={this.state.mensaje} as="textarea" placeholder="Envianos tu Mensaje" name="mensaje" id="mensaje" required onChange={this.cambioEntradaCampoFormulario} />
                                        </InputGroup>
                                    </Form.Group>
                                    <Row>
                                        <Col className="align-items-center flex-column">
                                            <Button variant="primary" type="submit" className="btn btn-info btn-block rounded-0 py-2">Enviar</Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Form>
                    </Col>
                </Row>
                <Loader visible={this.state.cargando} />
                <NotificationContainer />
            </>
        )
    }
}
