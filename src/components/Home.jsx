import React, { Component } from 'react'
import CntJumbotron from './CntJumbotron'
import CntBox1 from './CntBox1'
import CntBox2 from './CntBox2'
import CntBox3 from './CntBox2'
import { Row } from 'react-bootstrap'

export default class Head extends Component {
    constructor(props){
        super()
        props.App.setState({menu_option:"home"})
    }
    render() {
        return (
            <>
                <CntJumbotron />
                <Row>
                    <CntBox1 /><CntBox2 /><CntBox3 />
                </Row>
            </>
        )
    }
}
