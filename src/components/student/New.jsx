import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
import moment from 'moment'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import faker from 'faker'
import { API_MEDIATEC_APP } from './../../constantes'
import MyForm from './Form'

export default class New extends Component {
    constructor(props) {
        super()
        this.studentApp = props.studentApp
        faker.locale = "es_MX"
    }

    cerrarModalNuevoEstudiante = () => {
        this.studentApp.setState({ showNewModal: false })
    }

    guardarEstudiante = async (e) => {
        e.preventDefault()
        this.studentApp.setState({ cargando: true })
        let estudiante = Object.assign({}, this.studentApp.state.estudiante)
        let request = null, respuesta = null
        //Crear un estudiante
        estudiante.id = faker.random.number()
        estudiante.tipo_actor_id = 1
        estudiante.fecha_creacion = moment().format('YYYY-MM-DD HH:mm:ss')
        estudiante.fecha_nacimiento = moment(estudiante.fecha_nacimiento).format('YYYY-MM-DD')

        request = new Request(`${API_MEDIATEC_APP}actores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(estudiante)
        });

        respuesta = await fetch(request)
        this.studentApp.setState({ cargando: false })
        if (respuesta.status === 201) {
            NotificationManager.success('El estudiante fue creado exitosamente.', 'Estudiante creado', 5000);
            this.studentApp.recargarListaEstudiantes()
            this.studentApp.setState({ showNewModal: false, estudiante: {} })
        } else {
            NotificationManager.error('Se presento un error durante la creación.', 'Error', 2000);
        }
    }

    render() {
        return (
            <div>

                <Modal
                    show={this.studentApp.state.showNewModal}
                    onHide={this.cerrarModalNuevoEstudiante}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{this.studentApp.state.titleModal}</Modal.Title>
                    </Modal.Header>
                    <Form id="frm-nuevo-estudiante" onSubmit={this.guardarEstudiante}>
                        <Modal.Body>
                           <MyForm {...this.props}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.cerrarModalNuevoEstudiante}>Cerrar</Button>
                            <Button variant="primary" type="submit">Guardar</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <NotificationContainer />
            </div>
        );
    }
}