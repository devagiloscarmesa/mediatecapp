import React, { Component } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import DatePicker from 'DatePicker'
import { es } from 'date-fns/locale'
import moment from 'moment'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { API_MEDIATEC_APP } from '../../constantes'
import Loader from './../Loader'

export default class ProfileData extends Component {
    constructor(props) {
        super()
        this.state = {
            edit: false,
            cargando: false,
            institucioneseducativas : [],
            tipodocumento : []
        }
    }

    async componentDidMount() {
        let userSesion = JSON.parse(localStorage.getItem("usuario"))
        let response = await fetch(`${API_MEDIATEC_APP}actores/${userSesion.idUsuario}`)
        let usuario = await response.json()
        usuario.fecha_nacimiento = new Date(moment(usuario.fecha_nacimiento).valueOf())
        console.log(new Date(moment(usuario.fecha_nacimiento).valueOf()))
        fetch(`${API_MEDIATEC_APP}tipo_documento`).then(respuesta => respuesta.json()).then(tipo_documento => this.setState({ tipodocumento: tipo_documento }))
        
        this.setState(usuario)
    }
    cambioEntradaCampoEstudiante = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let estudiante = Object.assign({}, this.state)
        estudiante[name] = value
        this.setState({ ...estudiante })
    }
    editProfile = e => {
        this.setState({ edit: true })
    }
    cambioFechaNacimiento = fecha => {
        let data = this.state
        data['fecha_nacimiento'] = fecha
        this.setState({...data});
    }
    saveProfile = async (e) => {
        e.preventDefault()
        this.setState({ cargando: true })
        let perfil = Object.assign({}, this.state)
        let request = null, respuesta = null

        perfil.fecha_actualizacion = moment().format('YYYY-MM-DD HH:mm:ss')
        perfil.fecha_nacimiento = moment(perfil.fecha_nacimiento).format('YYYY-MM-DD')
        request = new Request(`${API_MEDIATEC_APP}actores/${perfil.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                documento : this.state.documento,
                nombres : this.state.nombres,
                apellidos : this.state.apellidos,
                correo : this.state.correo,
                telefono_celular : this.state.telefono_celular,
                tipo_documento : this.state.tipo_documento,
                genero : this.state.genero,
                fecha_nacimiento : this.state.fecha_nacimiento
            })
        });

        respuesta = await fetch(request)
        this.setState({ cargando: false, edit: false  })
        if (respuesta.status === 200) {
            NotificationManager.success('Perfil actualizado exitosamente.', 'Perfil actualizado', 5000);
            this.setState({ showEditModal: false })
        } else {
            NotificationManager.error('Se presento un error.', 'Error', 2000);
        }
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
                            <td>
                                {this.state.edit ? <Form.Control type="text" minLength="7" maxLength="11" name="documento" placeholder="Documento de identidad" defaultValue={this.state.documento} onChange={this.cambioEntradaCampoEstudiante} required /> : this.state.documento}
                            </td>
                        </tr>
                        <tr>
                            <td>Nombre(s)</td>
                            <td>{this.state.edit ? <Form.Control type="text" placeholder="Nombre(s) completo(s)" name="nombres" onChange={this.cambioEntradaCampoEstudiante} required="required" defaultValue={this.state.nombres} /> : this.state.nombres}</td>
                        </tr>
                        <tr>
                            <td>Apellido(s)</td>
                            <td>{this.state.edit ? <Form.Control type="text" placeholder="Apellidos completo" name="apellidos" defaultValue={this.state.apellidos} onChange={this.cambioEntradaCampoEstudiante} /> : this.state.apellidos}</td>
                        </tr>
                        <tr>
                            <td>Correo</td>
                            <td>{this.state.edit ? <Form.Control type="email" placeholder="Digite el correo" name="correo" defaultValue={this.state.correo} onChange={this.cambioEntradaCampoEstudiante} required /> : this.state.correo}</td>
                        </tr>
                        <tr>
                            <td>Celular</td>
                            <td>{this.state.edit ? <Form.Control type="text" minLength="5" maxLength="11" onChange={this.cambioEntradaCampoEstudiante} placeholder="Número celular" name="telefono_celular" defaultValue={this.state.telefono_celular} /> : this.state.telefono_celular}</td>
                        </tr>
                        <tr>
                            <td>Tipo de documento</td>
                            <td>{this.state.edit ? <Form.Control as="select" name="tipo_documento" defaultValue={this.state.tipo_documento} onChange={this.cambioEntradaCampoEstudiante} required>
                            <option value="" style={{ display: "none" }}>Seleccionar...</option>
                            {this.state.tipodocumento.map((tipo, i) => <option key={i} value={tipo.codigo}>{tipo.descripcion}</option>)}
                        </Form.Control> : this.state.tipo_documento}</td>
                        </tr>
                        <tr>
                            <td>Genero</td>
                            <td>{this.state.edit ? <Form.Control as="select" name="genero" defaultValue={this.state.genero} onChange={this.cambioEntradaCampoEstudiante} required>
                                <option value="" style={{ display: "none" }}>Seleccionar...</option>
                                <option value="hombre">Hombre</option>
                                <option value="mujer">Mujer</option>
                            </Form.Control> : this.state.genero}</td>
                        </tr>
                        <tr>
                            <td>Fecha de nacimiento</td>
                            <td>{this.state.edit ?<DatePicker
                            type="input"
                            value={this.state.fecha_nacimiento}
                            format="yyyy-MM-dd"
                            locale={es}
                            placeholder="Fecha de nacimiento"
                            onChange={this.cambioFechaNacimiento}
                            required
                        />:moment(this.state.fecha_nacimiento).format('YYYY-MM-DD')}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                {this.state.edit ? <Button variant="primary" size="lg" block onClick={this.saveProfile}>Guardar</Button> : <Button variant="primary" size="lg" block onClick={this.editProfile}>Editar</Button>}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Loader visible={this.state.cargando} />
                <NotificationContainer />
            </div>
        )
    }
}
