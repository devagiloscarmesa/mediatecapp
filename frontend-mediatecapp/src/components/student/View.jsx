import React, { Component } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'

export default class View extends Component {
    constructor(props){
        super()
        this.studentApp = props.studentApp
    }

    cerrarModalVerEstudiante = () => {
        this.studentApp.setState({ showViewModal : false })
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.studentApp.state.showViewModal}
                    onHide={this.cerrarModalVerEstudiante}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Datos de Estudiante - {this.studentApp.state.estudiante.documento}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>ID Usuario</td>
                                    <td>{this.studentApp.state.estudiante.id}</td>
                                </tr>
                                <tr>
                                    <td>Documento</td>
                                    <td>{this.studentApp.state.estudiante.documento}</td>
                                </tr>
                                <tr>
                                    <td>Número de Expediente</td>
                                    <td>{this.studentApp.state.estudiante.numero_expediente}</td>
                                </tr>
                                
                                <tr>
                                    <td>Nombre(s)</td>
                                    <td>{this.studentApp.state.estudiante.nombres}</td>
                                </tr>
                                <tr>
                                    <td>Apellido(s)</td>
                                    <td>{this.studentApp.state.estudiante.apellidos}</td>
                                </tr>
                                <tr>
                                    <td>Correo</td>
                                    <td>{this.studentApp.state.estudiante.correo}</td>
                                </tr>
                                <tr>
                                    <td>Celular</td>
                                    <td>{this.studentApp.state.estudiante.telefono_celular}</td>
                                </tr>
                                <tr>
                                    <td>Tipo de documento</td>
                                    <td>{this.studentApp.state.estudiante.tipodoc !== undefined ? this.studentApp.state.estudiante.tipodoc.descripcion : ""}</td>
                                </tr>
                                <tr>
                                    <td>Genero</td>
                                    <td>{this.studentApp.state.estudiante.genero}</td>
                                </tr>
                                <tr>
                                    <td>Fecha de nacimiento</td>
                                    <td>{this.studentApp.state.estudiante.fecha_nacimiento}</td>
                                </tr>
                                <tr>
                                    <td>Institución Educativa</td>
                                    <td>{this.studentApp.state.estudiante.ie !== undefined ? this.studentApp.state.estudiante.ie.nombre_ie : ""}</td>
                                </tr>
                                <tr>
                                    <td>Fecha de creación</td>
                                    <td>{this.studentApp.state.estudiante.fecha_creacion}</td>
                                </tr>
                                <tr>
                                    <td>Fecha de actualización</td>
                                    <td>{this.studentApp.state.estudiante.fecha_actualizacion}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.cerrarModalVerEstudiante}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
