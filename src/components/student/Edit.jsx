import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import moment from 'moment'
import { API_MEDIATEC_APP } from './../../constantes'
import MyForm from './Form'

export default class Edit extends Component {
    constructor(props) {
        super()
        this.studentApp = props.studentApp
    }

    cerrarModaEditarlEstudiante = () => {
        this.studentApp.setState({ showEditModal: false })
    }

    guardarEstudiante = async (e) => {
        e.preventDefault()
        this.studentApp.setState({ cargando: true })
        let estudiante = Object.assign({}, this.studentApp.state.estudiante)
        let request = null, respuesta = null

        //Actualizar estudiante
        estudiante.fecha_actualizacion = moment().format('YYYY-MM-DD HH:mm:ss')
        estudiante.fecha_nacimiento = moment(estudiante.fecha_nacimiento).format('YYYY-MM-DD')
        request = new Request(`${API_MEDIATEC_APP}actores/${estudiante.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(estudiante)
        });

        respuesta = await fetch(request)
        this.studentApp.setState({ cargando: false })
        if (respuesta.status === 200) {
            NotificationManager.success('El estudiante fue actualizado exitosamente.', 'Estudiante actualizado', 5000);
            this.studentApp.recargarListaEstudiantes()
            this.studentApp.setState({ showEditModal: false, estudiante: {} })
        } else {
            NotificationManager.error('Se presento un error durante la creación.', 'Error', 2000);
        }
    }

    render() {
        return (
            <div>
                <Modal
                    show={this.studentApp.state.showEditModal}
                    onHide={this.cerrarModaEditarlEstudiante}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.studentApp.state.titleModal}</Modal.Title>
                    </Modal.Header>
                    <Form id="frm-nuevo-estudiante" onSubmit={this.guardarEstudiante}>
                        <Modal.Body>
                            <MyForm {...this.props} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.cerrarModaEditarlEstudiante}>Cerrar</Button>
                            <Button variant="primary" type="submit">Guardar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <NotificationContainer />
            </div>
        );
    }
}