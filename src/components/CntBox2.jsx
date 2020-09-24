import React, { Component } from 'react'
import {Col,Button} from 'react-bootstrap'
export default class CntBox2 extends Component {
    render() {
        return (
            <>
                <Col xs={1} md={2} lg={4}>
                    <h2>Heading</h2>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><Button variant="primary" size="lg">View details &raquo;</Button></p>
                </Col>
            </>
        )
    }
}
