import React, { Component } from 'react';
import {API_MEDIATEC_APP} from '../constantes'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import sha1 from 'js-sha1'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications'
import {Link} from 'react-router-dom'
import logo from '../images/logoMTApp.png'
import Loader from './Loader';

export default class Login extends Component {
    constructor(){
        super()
        this.state = {
            cargando : false,
            recordar : false,
            correo : null,
            contrasena : null
        }
    }
 
    async componentDidMount(){
        document.title = this.props.title
        if(localStorage.getItem("usuario") != null){
            let usuario = JSON.parse(localStorage.getItem("usuario"))
            let respuesta = await fetch(`${API_MEDIATEC_APP}actores?correo=${usuario.correo}`)
            let us = await respuesta.json()
            if(us.length > 0){
                this.props.history.push('/inicio')
            }
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

    rand=()=>Math.random(0).toString(36).substr(2)


    iniciarSesion = (e) =>  {
        e.preventDefault()

        this.setState({ cargando: true })
        
        fetch(`${API_MEDIATEC_APP}actores?correo=${this.state.correo}&contrasena=${sha1(this.state.contrasena)}`)
            .then(respuesta => respuesta.json())
            .then(usuario => {
                if(usuario.length > 0){
                    usuario = usuario[0]
                    const token=(length)=>(this.rand()+this.rand()+this.rand()+this.rand()).substr(0,length);
                    localStorage.setItem("usuario", JSON.stringify({
                            idUsuario : usuario.id,
                            nombreUsuario : usuario.correo,
                            nombre : usuario.nombres,
                            correo : usuario.correo,
                            apellido : usuario.apellidos,
                            token : token,
                            data : usuario
                        })
                    )
                    this.props.history.push('/inicio')
                }else{
                    NotificationManager.error('Error en el inicio de sesión', 'Error', 2000);
                }
                this.setState({ cargando: false })
            })

    }

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
                        <Form onSubmit={this.iniciarSesion}>
                            <Form.Group controlId="correo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese el correo" name="correo" onChange={this.cambioEntradaCampo} required/>
                                <Form.Text className="text-muted">Ingrese su correo institucional</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="contrasena">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña" name="contrasena" onChange={this.cambioEntradaCampo} required/>
                                <Link to="/recuperar-contrasena" className="btn btn-link">¿Has olvidado tu contraseña?</Link>
                            </Form.Group>
                            <Form.Group controlId="recordar">
                                <Form.Check type="checkbox" label="Recordar" name="recordar" onChange={this.cambioEntradaCampo}/>
                            </Form.Group>
                            <Row>
                                <Col className="align-items-center flex-column">
                                    <Button variant="primary" type="submit">Iniciar</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>
                <NotificationContainer/>
                <Loader visible={this.state.cargando} />
            </Container>
        );
    }
}