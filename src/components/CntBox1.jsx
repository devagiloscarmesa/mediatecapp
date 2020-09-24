import React, { Component } from 'react'
import {Col,Button} from 'react-bootstrap'
export default class CntBox1 extends Component {
    render() {
        return (
            <>
                <Col xs={1} md={2} lg={4}>
                    <h2>Safari bug warning!</h2>
                    <p className="text-danger">As of v9.1.2, Safari exhibits a bug in which resizing your browser horizontally causes rendering errors in the justified nav that are cleared upon refreshing.</p>
                    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                    <p><Button variant="primary" size="lg">View details &raquo;</Button></p>
                </Col>
            </>
        )
    }
}
