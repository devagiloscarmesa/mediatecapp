import React, { Component } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import faker from 'faker'
import sha1 from 'js-sha1'
import { API_MEDIATEC_APP } from '../constantes'
import Dialog from 'react-bootstrap-dialog'
import Loader from './Loader'


export default class RecoverPassword extends Component {

    constructor() {
        super()
        this.state = {
            cargando: false
        }
    }

    cambioEntradaCampo = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });        
    }

    componentDidMount(){
        document.title = this.props.title
    }

    obtenerCredenciales = async(e) => {
        e.preventDefault()
        try{
            this.setState({ cargando: true })
            let respuesta_us = await fetch(`${API_MEDIATEC_APP}actores?correo=${this.state.correo}`)
            let usuario = await respuesta_us.json()

            

            this.setState({ cargando: false })
            if(usuario.length > 0){    
                usuario = usuario[0]
                let contrasena = faker.internet.password()
                let request = new Request(`${API_MEDIATEC_APP}actores/${usuario.id}`,{
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify ({contrasena : sha1(contrasena)})
                })
                let respuesta_us_p = await fetch(request)
                let usuario_moficado = await respuesta_us_p.json()

                console.log(usuario_moficado)
                this.dialog.show({
                title: 'Credenciales',
                body: <>
                    <b>Cuenta: </b> {usuario.correo}<br />
                    <b>Nombre: </b> {usuario.nombres}<br />
                    <b>Apellido: </b> {usuario.apellidos}<br />
                    <b>Documento: </b> {usuario.documento}<br />
                    <b>Nueva contraseña: </b> {contrasena}
                </>,
                actions: [
                    Dialog.OKAction((dialog) => {
                        dialog.hide()
                        this.props.history.push('/iniciar-sesion')
                    })
                ],
                bsSize: 'small',
                onHide: (dialog) => {
                    dialog.hide()
                }
            })
            }else{
                NotificationManager.error('Este correo no se encuentra asociado a ningún usuario.', 'Error', 3000);
            }
        }catch(e){
            console.log(e)
            NotificationManager.error('Se presento un error durante la validación.', 'Error', 2000);
        }
    }


    render() {
        return (
            <Container className="padding-bottom-3x mb-2 mt-5">
                <Row className="justify-content-center">
                    <Col lg={8} md={10}>
                        <div className="forgot">
                            <h2>¿Olvidaste tu contraseña?</h2>
                            <p>Cambie su contraseña en tres sencillos pasos. ¡Esto le ayudará a proteger su contraseña!</p>
                            <ol className="list-unstyled">
                                <li><span className="text-primary text-medium">1. </span>Ingrese su dirección de correo electrónico a continuación.</li>
                                <li><span className="text-primary text-medium">2. </span>El sistema genera una contraseña aleatoría.</li>
                            </ol>
                        </div>
                        <Form onSubmit={this.obtenerCredenciales}>
                            <Card className="mt-4">
                                <Card.Body>
                                    <Form.Group controlId="correo">
                                        <Form.Label>Ingrese su dirección de correo electrónico</Form.Label>
                                        <Form.Control type="email" name="correo" onChange={this.cambioEntradaCampo} required/>
                                        <Form.Text className="text-muted" />
                                        <small className="form-text text-muted">Ingrese la dirección de correo electrónico que utilizó durante el registro en Media Técnica App. Luego, enviaremos un enlace a esta dirección por correo electrónico.</small>
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer>
                                    <Button type="submit" variant="success" className="mr-2">Obtener nueva contraseña</Button>
                                    <Button variant="danger" onClick={() => { this.props.history.push('/iniciar-sesion'); }}>Atrás para iniciar sesión</Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                    </Col>
                </Row>
                <Dialog ref={(component) => { this.dialog = component }} />
                <Loader visible={this.state.cargando} />
                <NotificationContainer/>
            </Container>


        )
    }
}
