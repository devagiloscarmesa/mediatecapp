import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'

export default class Contact extends Component {
    constructor(props) {
        super()
        props.App.setState({ menu_option: "contact" })
    }
    render() {
        return (
            <>
                <Row>
                    <Col>
                        <h2>Contact</h2>
                    </Col>
                </Row>
            </>
        );
    }
}
