import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import { API_MEDIATEC_APP } from './../constantes'


export default class TechnicalColleges extends Component {
    constructor(props) {
        super()
        this.state = {
            instituciones_educativas: []
        }
    }

    componentDidMount() {
        fetch(`${API_MEDIATEC_APP}instituciones_educativas`).then(respuesta => respuesta.json()).then(instituciones_educativas => this.setState({ instituciones_educativas: instituciones_educativas }))
    }

    render() {
        return (
            <div>
                <Carousel>
                    {this.state.instituciones_educativas.map((ie, i) => <Carousel.Item key={i} interval={1000}>
                        <img
                            className="d-block w-100"
                            src={ie.foto_ie}
                            alt={ie.nombre_ie}
                        />
                        <Carousel.Caption>
                            <h3>{ie.nombre_ie}</h3>
                            <p>{ie.nombre_ie.descripcion_ie}</p>
                        </Carousel.Caption>
                    </Carousel.Item>)}
                </Carousel>
            </div>
        )
    }
}
