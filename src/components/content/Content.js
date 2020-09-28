import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./Navbar";

class Content extends React.Component {
	constructor(props){
    super()
    this.contetent = props.contetent
  }
  render() {
    return (
      <Container
        fluid
        className={classNames("content", { "is-open": this.props.isOpen })}
      >
        <NavBar toggle={this.props.toggle} />
        {React.createElement(this.contetent)}
      </Container>
    );
  }
}

export default Content;
