import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import UsuarioContext from '../../context/UsuarioContext'
import { API_MEDIATEC_APP } from '../../constantes'


export default class ProfileData extends Component {
    constructor(props) {
        super()
        this.state = {

        }
    }

    async componentDidMount() {
        let userSesion = JSON.parse(localStorage.getItem("usuario"))
        let response = await fetch(`${API_MEDIATEC_APP}actores/${userSesion.idUsuario}`)
        let usuario = await response.json()
        this.setState(usuario)
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th colSpan={2}>Datos de usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ID Usuario</td>
                            <td>{this.state.id}</td>
                        </tr>
                        <tr>
                            <td>Documento</td>
                            <td>{this.state.documento}</td>
                        </tr>
                        <tr>
                            <td>Nombre(s)</td>
                            <td>{this.state.nombres}</td>
                        </tr>
                        <tr>
                            <td>Apellido(s)</td>
                            <td>{this.state.apellidos}</td>
                        </tr>
                        <tr>
                            <td>Correo</td>
                            <td>{this.state.correo}</td>
                        </tr>
                        <tr>
                            <td>Celular</td>
                            <td>{this.state.telefono_celular}</td>
                        </tr>
                        <tr>
                            <td>Tipo de documento</td>
                            <td>{this.state.tipo_documento}</td>
                        </tr>
                        <tr>
                            <td>Genero</td>
                            <td>{this.state.genero}</td>
                        </tr>
                        <tr>
                            <td>Fecha de nacimiento</td>
                            <td>{this.state.fecha_nacimiento}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}
