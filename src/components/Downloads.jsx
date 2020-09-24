import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'

export default class Downloads extends Component {
    constructor(props) {
        super()
        props.App.setState({ menu_option: "downloads" })
    }
    render() {
        return (
            <>
                <Row>
                    <Col>
                        <h2>Downloads</h2>
                    </Col>
                </Row>
            </>
        );
    }
}
