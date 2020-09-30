import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import dataStudents from '../../data/students.json'
export default class StudentApp extends Component {
    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Colegio</th>
                            <th>Fecha de nacimiento</th>
                            <th>Teléfono</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataStudents.map((student, index) => {
                            return <tr key={index}>
                                <td>{student.id}</td>
                                <td>{student.documento}</td>
                                <td>{student.nombre}</td>
                                <td>{student.colegio}</td>
                                <td>{student.fecha_nacimiento}</td>
                                <td>{student.telefono}</td>
                                <td>{student.correo}</td>
                            </tr>
                        })}
                        
                       
                    </tbody>
                </Table>
            </div>
        )
    }
}
