import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InicioSesion from './components/InicioSesion';
import RecuperarContrasena from './components/RecuperarContrasena';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
export default class App extends Component { 
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Container className = "h-100">
          <Switch>
            <Route path='/' exact render={() => { return <Redirect to="/iniciar-sesion" /> }} />
            <Route path='/iniciar-sesion' exact render={() => <InicioSesion App = {this}/>} />
            <Route path='/recuperar-contrasena' exact render={(props) => <RecuperarContrasena {...props} App = {this}/>} />
            
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}