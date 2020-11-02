import React, { Component } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import Dialog from 'react-bootstrap-dialog'
import { API_MEDIATEC_APP } from './../../constantes'

export default class Delete extends Component {
    constructor(props) {
        super()
        this.studentApp = props.studentApp
    }

    delete = async () => {
        if (this.studentApp.state.showDeleteModal) {
            let id_estudiante = this.studentApp.state.estudiante.id
            let respuesta = await this.studentApp.consultarEstudiante(id_estudiante)
            let estudiante = await respuesta.json()
            if (estudiante.id !== undefined) {
                this.dialog.show({
                    title: `Eliminar esudiante - ${estudiante.documento}`,
                    body: 'Esta seguro de eliminar este estudiante?',
                    actions: [
                        Dialog.CancelAction( (dialog) => {
                            this.studentApp.setState({ showDeleteModal : false})
                        }),
                        Dialog.OKAction(async (dialog) => {
                            this.studentApp.setState({})
                            this.studentApp.setState({ showDeleteModal : false,cargando: true })
                            var request = new Request(`${API_MEDIATEC_APP}actores/${estudiante.id}`, {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' }
                            });

                            let response = await fetch(request)
                            this.studentApp.recargarListaEstudiantes()
                            if (response.status === 200) {
                                NotificationManager.success('El estudiante fue eliminado exitosamente.', 'Estudiante eliminado', 5000);
                            } else {
                                NotificationManager.error('Se presento un error durante la eliminación.', 'Estudiante eliminado', 5000);
                            }

                            this.studentApp.setState({ cargando: false })
                            dialog.hide()
                        })
                    ],
                    bsSize: 'small',
                    onHide: (dialog) => {
                        dialog.hide()
                    }
                })

            } else {
                NotificationManager.error('Este estudiante no existe.', 'Estudiante eliminado', 5000);
            }
        }
    }

    render() {
        this.delete()
        return (
            <div>
                <Dialog ref={(component) => { this.dialog = component }} />
                <NotificationContainer />
            </div>
        )
    }
}
