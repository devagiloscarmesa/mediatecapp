import React, { Component } from 'react'
import { Col, Form } from 'react-bootstrap'
import DatePicker from 'DatePicker'
import { es } from 'date-fns/locale'

export default class myForm extends Component {
    constructor(props) {
        super()
        this.studentApp = props.studentApp
    }    
    render() {
        return (
            <div>
                <Form.Row>
                    <Form.Group as={Col} controlId="nombres">
                        <Form.Label>Nombre(s) *</Form.Label>
                        <Form.Control type="text" placeholder="Nombre(s) completo(s)" name="nombres" onChange={this.studentApp.cambioEntradaCampoEstudiante} required="required" defaultValue={this.studentApp.state.estudiante.nombres} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="apellidos">
                        <Form.Label>Apellido(s)</Form.Label>
                        <Form.Control type="text" placeholder="Apellidos completo" name="apellidos" defaultValue={this.studentApp.state.estudiante.apellidos} onChange={this.studentApp.cambioEntradaCampoEstudiante} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="documento">
                        <Form.Label>Documento *</Form.Label>
                        <Form.Control type="text" minLength="7" maxLength="11" name="documento" placeholder="Documento de identidad" defaultValue={this.studentApp.state.estudiante.documento} onChange={this.studentApp.cambioEntradaCampoEstudiante} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="correo">
                        <Form.Label>Correo *</Form.Label>
                        <Form.Control type="email" placeholder="Digite el correo" name="correo" defaultValue={this.studentApp.state.estudiante.correo} onChange={this.studentApp.cambioEntradaCampoEstudiante} required />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="numero_expediente">
                        <Form.Label>Expediente (*)</Form.Label>
                        <Form.Control type="text" placeholder="EXP-3902993-P90" name="numero_expediente" defaultValue={this.studentApp.state.estudiante.numero_expediente} onChange={this.studentApp.cambioEntradaCampoEstudiante} required="required" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="tipo_documento">
                        <Form.Label>Tipo de Documento (*)</Form.Label>
                        <Form.Control as="select" name="tipo_documento" defaultValue={this.studentApp.state.estudiante.tipo_documento} onChange={this.studentApp.cambioEntradaCampoEstudiante} required>
                            <option value="" style={{ display: "none" }}>Seleccionar...</option>
                            {this.studentApp.state.tipo_documento.map((tipo, i) => <option key={i} value={tipo.codigo}>{tipo.descripcion}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="genero">
                        <Form.Label>Genero (*)</Form.Label>
                        <Form.Control as="select" name="genero" defaultValue={this.studentApp.state.estudiante.genero} onChange={this.studentApp.cambioEntradaCampoEstudiante} required>
                            <option value="" style={{ display: "none" }}>Seleccionar...</option>
                            <option value="hombre">Hombre</option>
                            <option value="mujer">Mujer</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="institucion_id">
                        <Form.Label>Institución Educativa (*)</Form.Label>
                        <Form.Control as="select" onChange={this.studentApp.cambioEntradaCampoEstudiante} name="institucion_id" defaultValue={this.studentApp.state.estudiante.institucion_id} required>
                            <option value="" style={{ display: "none" }}>Seleccionar...</option>
                            {this.studentApp.state.instituciones_educativas.map((institucion, i) => <option key={i} value={institucion.id}>{institucion.nombre_ie}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="telefono_celular">
                        <Form.Label>Celular</Form.Label>
                        <Form.Control type="text" minLength="5" maxLength="11" onChange={this.studentApp.cambioEntradaCampoEstudiante} placeholder="Número celular" name="telefono_celular" defaultValue={this.studentApp.state.estudiante.telefono_celular} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="fecha_nacimiento">
                        <Form.Label>Fecha de nacimiento (*)</Form.Label>
                        <DatePicker
                            type="input"
                            value={this.studentApp.state.estudiante.fecha_nacimiento}
                            format="yyyy-MM-dd"
                            locale={es}
                            placeholder="Fecha de nacimiento"
                            onChange={this.studentApp.cambioFechaNacimiento}
                            required
                        />
                    </Form.Group>
                </Form.Row>
            </div>
        )
    }
}
