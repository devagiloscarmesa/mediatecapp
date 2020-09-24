import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';

export default class Projects extends Component {
    constructor(props){
        super()
        props.App.setState({menu_option:"projects"})
    }
    render() {
        return (
            <>
            <Row>
                <Col>
                <h2>Projects</h2>
                </Col>
            </Row>
            </>
        );
    }
}