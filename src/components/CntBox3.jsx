import React, { Component } from 'react'
import {Col,Button} from 'react-bootstrap'
export default class CntBox3 extends Component {
    render() {
        return (
            <>
                <Col xs={1} md={2} lg={4}>
                    <h2>Heading</h2>
                    <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa.</p>
                    <p><Button variant="primary" size="lg">View details &raquo;</Button></p>
                </Col>
            </>
        )
    }
}
