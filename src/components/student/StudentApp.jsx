import React, { Component } from 'react'
import { Button, Table } from 'react-bootstrap'
import moment from 'moment'
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_MEDIATEC_APP } from './../../constantes'
import Loader from './../Loader'
import View from './View'
import Delete from './Delete'
import Edit from './Edit'
import New from './New';

export default class StudentApp extends Component {
    constructor(props) {
        super()
        this.state = {
            showNewModal: false,
            showViewModal: false,
            showDeleteModal: false,
            showEditModal: false,
            cargando: false,
            titleModal: "",
            estudiantes: [],
            instituciones_educativas: [],
            tipo_documento: [],
            estudiante: {}
        }
    }

    cambioEntradaCampoEstudiante = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let estudiante = Object.assign({}, this.state.estudiante)
        estudiante[name] = value
        this.setState({estudiante: estudiante})
    }

    cambioFechaNacimiento = fecha => {
        let estudiante = this.state.estudiante
        estudiante['fecha_nacimiento'] = fecha
        this.setState({ estudiante: estudiante });
    }

    recargarListaEstudiantes = async () => {
        return fetch(`${API_MEDIATEC_APP}actores?tipo_actor_id=1`).then(respuesta => respuesta.json()).then(estudiantes => this.setState({ estudiantes: estudiantes }))
    }    

    async componentDidMount() {
        await Promise.all([
            this.recargarListaEstudiantes(),
            fetch(`${API_MEDIATEC_APP}instituciones_educativas`).then(respuesta => respuesta.json()).then(instituciones => this.setState({ instituciones_educativas: instituciones })),
            fetch(`${API_MEDIATEC_APP}tipo_documento`).then(respuesta => respuesta.json()).then(tipo_documento => this.setState({ tipo_documento: tipo_documento }))
        ])
    }

    abrirModalNuevoEstudiante = () => {
        this.setState({ titleModal: "Nuevo estudiante", estudiante: {}, showNewModal: true })
    }

    consultarEstudiante = async (id_estudiante) => {
        return fetch(`${API_MEDIATEC_APP}actores/${id_estudiante}`)
    }

    eliminarEstudiante = async (e) => {
        let estudiante = this.state.estudiante
        estudiante.id = e.currentTarget.getAttribute('id_estudiante')
        this.setState({ estudiante: estudiante, showDeleteModal: true })
    }

    varEstudiante = async (e) => {
        this.setState({ cargando: true })
        let respuesta = await this.consultarEstudiante(e.currentTarget.getAttribute('id_estudiante'))
        let estudiante = await respuesta.json()

        if (estudiante.institucion_id !== undefined)
            fetch(`${API_MEDIATEC_APP}instituciones_educativas/${estudiante.institucion_id}`).then(respuesta => respuesta.json()).then(ie => { let est = this.state.estudiante; est.ie = ie; this.setState({ estudiante: est }) })
        if (estudiante.tipo_documento !== undefined)
            fetch(`${API_MEDIATEC_APP}tipo_documento?codigo=${estudiante.tipo_documento}`).then(respuesta => respuesta.json()).then(tp => { if (tp[0] !== undefined) { let est = this.state.estudiante; est.tipodoc = tp[0]; this.setState({ estudiante: est }) } })
        this.setState({ showViewModal: true, estudiante: estudiante, cargando: false })
    }

    abrirModalEditarEstudiante = async (e) => {
        this.setState({ cargando: true })
        let id_estudiante = e.currentTarget.getAttribute('id_estudiante')
        let respuesta = await this.consultarEstudiante(id_estudiante)
        let estudiante = await respuesta.json()

        estudiante.fecha_nacimiento = new Date(moment(estudiante.fecha_nacimiento).valueOf())
        this.setState({
            estudiante: estudiante,
            titleModal: `Editar estudiante - ${estudiante.documento}`,
            showEditModal: true,
            cargando: false
        })
    }

    render() {
        return (
            <div>
                <br /><Button variant="primary" onClick={this.abrirModalNuevoEstudiante}>Nuevo Estudiante</Button><br /><br />

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
                                    <Button id_estudiante={estudiante.id} variant="link" onClick={this.eliminarEstudiante}><FontAwesomeIcon icon={faTrash} className="mr-2" /></Button>
                                    <Button id_estudiante={estudiante.id} variant="link" onClick={this.varEstudiante}><FontAwesomeIcon icon={faEye} className="mr-2" /></Button>
                                </td>
                            </tr>
                        })}


                    </tbody>
                </Table>
                <View studentApp={this} />
                <Delete studentApp={this} />
                <Edit studentApp={this} />
                <New studentApp={this} />
                <Loader visible={this.state.cargando} />
            </div>
        )
    }
}
