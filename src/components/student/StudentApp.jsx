import React, { Component } from 'react'
import { Button, Col, Form, Modal, Table } from 'react-bootstrap'
import DatePicker from 'DatePicker'
import faker from 'faker'
import moment from 'moment'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { es } from 'date-fns/locale'
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from 'react-bootstrap-dialog'
import { API_MEDIATEC_APP } from './../../constantes'
import Loader from './../Loader'

export default class StudentApp extends Component {
    constructor(props) {
        super()
        this.state = {
            showModal: false,
            cargando: false,
            titleModal : "",
            estudiantes: [],
            instituciones_educativas: [],
            tipo_documento: [],
            estudiante: {}
        }
        faker.locale = "es_MX"
    }

    cambioEntradaCampoEstudiante = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let estudiante = this.state.estudiante
        estudiante[name] = value
        this.setState({
            estudiante: estudiante
        });
    }

    cambioFechaNacimiento = fecha => {
        let estudiante = this.state.estudiante
        estudiante['fecha_nacimiento'] = fecha
        this.setState({ estudiante: estudiante }); 
    }

    async componentDidMount() {
        await Promise.all([
            fetch(`${API_MEDIATEC_APP}actores?tipo_actor_id=1`).then(respuesta => respuesta.json()).then(estudiantes => this.setState({ estudiantes: estudiantes })),
            fetch(`${API_MEDIATEC_APP}instituciones_educativas`).then(respuesta => respuesta.json()).then(instituciones => this.setState({ instituciones_educativas: instituciones })),
            fetch(`${API_MEDIATEC_APP}tipo_documento`).then(respuesta => respuesta.json()).then(tipo_documento => this.setState({ tipo_documento: tipo_documento }))
        ])

    }

    abrirModalNuevoEstudiante = () => {
        this.setState({titleModal : "Nuevo estudiante"})
        this.setState({estudiante:{}})
        this.setState({ showModal: true })
    }

    eliminarEstudiante = () => {
        let id_estudiante = e.currentTarget.getAttribute('id_estudiante')
        let respuesta = await fetch(`${API_MEDIATEC_APP}actores/${id_estudiante}`)
        let estudiante = await respuesta.json()

        this.dialog.show({
            title: 'Greedings',
            body: 'How are you?',
            actions: [
              Dialog.CancelAction(),
              Dialog.OKAction()
            ],
            bsSize: 'small',
            onHide: (dialog) => {
              dialog.hide()
              console.log('closed by clicking background.')
            }
          })
    }

    abrirModalEditarEstudiante = async(e) => {
        let id_estudiante = e.currentTarget.getAttribute('id_estudiante')
        let respuesta = await fetch(`${API_MEDIATEC_APP}actores/${id_estudiante}`)
        let estudiante = await respuesta.json()
       
        estudiante.fecha_nacimiento = new Date(moment(estudiante.fecha_nacimiento).valueOf())
        this.setState({
            estudiante:estudiante,
            titleModal : `Editar estudiante - ${this.state.estudiante.documento}`,
            showModal: true
        })
    }

    cerrarModalEstudiante = () => {
        this.setState({ showModal: false })
    }

    guardarEstudiante = async (e) => {
        e.preventDefault()
        this.setState({ cargando: true })
        let estudiante = Object.assign({}, this.state.estudiante) 
        let request = null, respuesta = null
        if(estudiante.id !== null && estudiante.id !== undefined){
            //Actualizar estudiante
            estudiante.fecha_actualizacion = moment().format('YYYY-MM-DD HH:mm:ss')
            estudiante.fecha_nacimiento = moment(estudiante.fecha_nacimiento).format('YYYY-MM-DD') 
            request = new Request(`${API_MEDIATEC_APP}actores/${estudiante.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(estudiante)
            });

            respuesta = await fetch(request)
            this.setState({ cargando: false })
            if (respuesta.status === 200) {
                NotificationManager.success('El estudiante fue actualizado exitosamente.', 'Estudiante actualizado', 5000);
                fetch(`${API_MEDIATEC_APP}actores?tipo_actor_id=1`).then(respuesta => respuesta.json()).then(estudiantes => this.setState({ estudiantes: estudiantes }))
                this.setState({ showModal: false, estudiante : {}})
            } else {
                NotificationManager.error('Se presento un error durante la creación.', 'Error', 2000);
            }
        }else{
            //Crear un estudiante
            estudiante.id = faker.random.uuid
            estudiante.tipo_actor_id = 1
            estudiante.fecha_creacion = moment().format('YYYY-MM-DD HH:mm:ss')

            request = new Request(`${API_MEDIATEC_APP}actores`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(estudiante)
            });

            respuesta = await fetch(request)
            this.setState({ cargando: false })
            if (respuesta.status === 201) {
                NotificationManager.success('El estudiante fue creado exitosamente.', 'Estudiante creado', 5000);
                fetch(`${API_MEDIATEC_APP}actores?tipo_actor_id=1`).then(respuesta => respuesta.json()).then(estudiantes => this.setState({ estudiantes: estudiantes }))
                this.setState({ showModal: false, estudiante: {} })
            } else {
                NotificationManager.error('Se presento un error durante la creación.', 'Error', 2000);
            }
        }
    }

    render() {
        return (
            <div>
                <br /><Button variant="primary" onClick={this.abrirModalNuevoEstudiante}>Nuevo Estudiante</Button><br /><br />
                <Modal
                    show={this.state.showModal}
                    onHide={this.cerrarModalEstudiante}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.titleModal}</Modal.Title>
                    </Modal.Header>
                    <Form id="frm-nuevo-estudiante" onSubmit={this.guardarEstudiante}>
                        <Modal.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="nombres">
                                    <Form.Label>Nombre(s) *</Form.Label>
                                    <Form.Control type="text" placeholder="Nombre(s) completo(s)" name="nombres" onChange={this.cambioEntradaCampoEstudiante} required="required" value={this.state.estudiante.nombres}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="apellidos">
                                    <Form.Label>Apellido(s)</Form.Label>
                                    <Form.Control type="text" placeholder="Apellidos completo" name="apellidos" value={this.state.estudiante.apellidos} onChange={this.cambioEntradaCampoEstudiante} />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="documento">
                                    <Form.Label>Documento *</Form.Label>
                                    <Form.Control type="text" minLength="7" maxLength="11" name="documento" placeholder="Documento de identidad" value={this.state.estudiante.documento} onChange={this.cambioEntradaCampoEstudiante} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="correo">
                                    <Form.Label>Correo *</Form.Label>
                                    <Form.Control type="email" placeholder="Digite el correo" name="correo" value={this.state.estudiante.correo} onChange={this.cambioEntradaCampoEstudiante} required />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="numero_expediente">
                                    <Form.Label>Expediente (*)</Form.Label>
                                    <Form.Control type="text" placeholder="EXP-3902993-P90" name="numero_expediente" value={this.state.estudiante.numero_expediente} onChange={this.cambioEntradaCampoEstudiante} required="required" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="tipo_documento">
                                    <Form.Label>Tipo de Documento (*)</Form.Label>
                                    <Form.Control as="select" name="tipo_documento" defaultValue={this.state.estudiante.tipo_documento} onChange={this.cambioEntradaCampoEstudiante} required>
                                        <option value="" style={{ display: "none" }}>Seleccionar...</option>
                                        {this.state.tipo_documento.map((tipo, i) => <option key={i} value={tipo.codigo}>{tipo.descripcion}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="genero">
                                    <Form.Label>Genero (*)</Form.Label>
                                    <Form.Control as="select" name="genero" defaultValue={this.state.estudiante.genero} onChange={this.cambioEntradaCampoEstudiante} required>
                                        <option value="" style={{ display: "none" }}>Seleccionar...</option>
                                        <option value="hombre">Hombre</option>
                                        <option value="mujer">Mujer</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="institucion_id">
                                    <Form.Label>Institución Educativa (*)</Form.Label>
                                    <Form.Control as="select" onChange={this.cambioEntradaCampoEstudiante} name="institucion_id" defaultValue={this.state.estudiante.institucion_id} required>
                                        <option value="" style={{ display: "none" }}>Seleccionar...</option>
                                        {this.state.instituciones_educativas.map((institucion, i) => <option key={i} value={institucion.id}>{institucion.nombre_ie}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="telefono_celular">
                                    <Form.Label>Celular</Form.Label>
                                    <Form.Control type="text" minLength="5" maxLength="11" onChange={this.cambioEntradaCampoEstudiante} placeholder="Número celular" name="telefono_celular" defaultValue={this.state.estudiante.telefono_celular}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="fecha_nacimiento">
                                    <Form.Label>Fecha de nacimiento (*)</Form.Label>
                                    <DatePicker
                                        type="input"
                                        value={this.state.estudiante.fecha_nacimiento}
                                        format="yyyy-MM-dd"
                                        locale={es}
                                        placeholder="Fecha de nacimiento"
                                        onChange={this.cambioFechaNacimiento}
                                        required
                                    />
                                </Form.Group>
                            </Form.Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.cerrarModalEstudiante}>Cerrar</Button>
                            <Button variant="primary" type="submit">Guardar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Documento</th>
                            <th>Nombre(s)</th>
                            <th>Apellido(s)</th>
                            <th>Fecha de nacimiento</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.estudiantes.map((estudiante, index) => {
                            return <tr key={index}>
                                <td>{estudiante.id}</td>
                                <td>{estudiante.documento}</td>
                                <td>{estudiante.nombres}</td>
                                <td>{estudiante.apellidos}</td>
                                <td>{estudiante.fecha_nacimiento}</td>
                                <td>{estudiante.telefono_celular}</td>
                                <td>{estudiante.correo}</td>
                                <td>
                                    <Button id_estudiante={estudiante.id} variant="link" onClick={this.abrirModalEditarEstudiante}><FontAwesomeIcon icon={faEdit} className="mr-2" /></Button>
                                    <Button id_estudiante={estudiante.id} variant="link"><FontAwesomeIcon icon={faTrash} className="mr-2" /></Button>
                                    <Button id_estudiante={estudiante.id} variant="link"><FontAwesomeIcon icon={faEye} className="mr-2" /></Button>
                                </td>
                            </tr>
                        })}


                    </tbody>
                </Table>
                <NotificationContainer />
                <Dialog ref={(component) => { this.dialog = component }} />
                <Loader visible={this.state.cargando} />
            </div>
        )
    }
}
