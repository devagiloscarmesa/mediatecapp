import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'

export default class About extends Component {
    constructor(props){
        super()
        props.App.setState({menu_option:"about"})
    }
    render() {
        return (
            <>
            <Row>
                <Col>
                <h2>About</h2>
                </Col>
            </Row>
            </>
        );
    }
}
