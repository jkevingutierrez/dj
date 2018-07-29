import React, { Component } from 'react';
import firebase from 'firebase';

var config = {
    apiKey: 'AIzaSyD-tm6iCpcspwdR7w1E7E4BMI66cntx4zc',
    authDomain: 'recycler-94604.firebaseapp.com',
    databaseURL: 'https://recycler-94604.firebaseio.com',
    projectId: 'recycler-94604',
    storageBucket: 'recycler-94604.appspot.com',
    messagingSenderId: '202993610998'
  };
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(
	function(user){
			if(user){
            }else{
			}
	}
	);

class Login extends Component {
	handlerClickRegister(event){

		const auth = firebase.auth();
		const user = document.getElementById('correo').value;
		const pass = document.getElementById('pass').value;
		auth.createUserWithEmailAndPassword(user, pass)
		.then(function(datosUsuario){

			var ref = firebase.database().ref('USUARIOS');
			const us = document.getElementById('correo').value;
			const pa = document.getElementById('pass').value;
			const ty = document.getElementById('tipo-cuenta').value;
			const name = document.getElementById('nombre').value;
			console.log(us+pa+ty+name);
			var obj = {
				'PASS':pa,
				'TYPE':ty,
				'USER':us,
				'NAME': name
			}
			ref.child(datosUsuario.user.uid).set(obj);

		}).catch(function(err){
	        document.getElementById("principal-login").innerHTML += "<br/> <h1>Los datos ingresados son incorrectos</h1>";
		});

		
	}
	render(){
		return(
			<div id="principal-login">
				<h1>REGISTER</h1>
				<p>
					Tipo de cuenta
					<select id='tipo-cuenta'>
					  <option value="IE">Institución educativa</option>
					  <option value="RA">Asociación de recicladores</option>
					  <option value="IND">Industria</option>
					</select>
				</p>
				<p>
					Nombre Institución
					<input type='text' id = 'nombre'/>
				</p>
				<p>
					Correo
					<input type='email' id = 'correo'/>
				</p>
				<p>
					Contraseña
					<input type='password' id = 'pass'/>
				</p>
				<button onClick= {this.handlerClickRegister}>Registrar</button>

			</div>
		);
	}
}
export default Login;