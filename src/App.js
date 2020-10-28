import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/MTApp.css'
import {TITLE_MEDIATEC_APP} from './constantes'
import Login from './components/Login'
import RecoverPassword from './components/RecoverPassword'
import StartApp from './components/StartApp'
import Main  from './components/Main'
import ContactUs  from './components/ContactUs'
import Module from './components/Module';
import TechnicalColleges from './components/TechnicalColleges';
import TechnicalSupport from './components/TechnicalSupport';
import Help from './components/Help';
import ProfileData from './components/user/ProfileData';
import StudentApp from './components/student/StudentApp';

export default class App extends Component { 
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className = "App wrapper">
          <Switch>
            <Route path='/' exact render={(props) => { return <Redirect {...props} to="/iniciar-sesion" /> }} />
            <Route path='/iniciar-sesion' exact render={(props) => <Login {...props} App = {this} title={`${TITLE_MEDIATEC_APP} - Iniciar Sesión`}/>} />
            <Route path='/recuperar-contrasena' exact render={(props) => <RecoverPassword {...props} title={`${TITLE_MEDIATEC_APP} - Recuprar Contraseña`}/>} />
            <Route path='/inicio' exact render={(props) => <Main {...props} App = {this} contetent = {StartApp} title={`${TITLE_MEDIATEC_APP} - Inicio`}/>} />
            <Route path='/contactanos' exact render={(props) => <Main {...props} App = {this} contetent = {ContactUs} title={`${TITLE_MEDIATEC_APP} - Contáctenos`}/>} />
            <Route path='/modulos' exact render={(props) => <Main {...props} App = {this} contetent = {Module} title={`${TITLE_MEDIATEC_APP} - Módulos`}/>} />
            <Route path='/colegios' exact render={(props) => <Main {...props} App = {this} contetent = {TechnicalColleges} title={`${TITLE_MEDIATEC_APP} - Colegios`}/>} />
            <Route path='/soporte-tecnico' exact render={(props) => <Main {...props} App = {this} contetent = {TechnicalSupport} title={`${TITLE_MEDIATEC_APP} - Soporte técnico`}/>} />
            <Route path='/ayuda' exact render={(props) => <Main {...props} App = {this} contetent = {Help} title={`${TITLE_MEDIATEC_APP} - Ayuda`}/>} />
            <Route path='/usuario/perfil' exact render={(props) => <Main {...props} App = {this} contetent = {ProfileData} title={`${TITLE_MEDIATEC_APP} - Perfil`}/>} />
            <Route path='/estudiantes/listado' exact render={(props) => <Main {...props} App = {this} contetent = {StudentApp} title={`${TITLE_MEDIATEC_APP} - Estudiantes`}/>} />
          </Switch>
          </div>
      </BrowserRouter>
    );
  }
}