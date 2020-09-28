import React, { Component } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { withRouter } from "react-router";
import SideBar from "./sidebar/SideBar";
import Content from "./content/Content";

export default class Main extends Component {
    constructor(props) {
        super()
        
        // Moblie first
        this.state = {
            isOpen: false,
            isMobile: true
        };

        this.previousWidth = -1;
    }

    updateWidth() {
        const width = window.innerWidth;
        const widthLimit = 576;
        const isMobile = width <= widthLimit;
        const wasMobile = this.previousWidth <= widthLimit;

        if (isMobile !== wasMobile) {
            this.setState({
                isOpen: !isMobile
            });
        }

        this.previousWidth = width;
    }

    componentDidMount() {
        this.updateWidth();
        window.addEventListener("resize", this.updateWidth.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWidth.bind(this));
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };
 
    render() {
        return (
            <>
              <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
              <Content toggle={this.toggle} isOpen={this.state.isOpen} {...this.props}/>
            </>
          );
    }
}