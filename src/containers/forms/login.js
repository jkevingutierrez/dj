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
	handlerClickGoogle(event){
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
		firebase.auth().signInWithPopup(provider)
		.then(function(datosUsuario){
			firebase.database().ref('USUARIOS/' + datosUsuario.user.uid).once('value').then(function(snapshot) {
	            	var usuario = (snapshot.val() && snapshot.val().usuario) || 'No Existe';
	            	if(usuario=='No Existe'){
		                firebase.auth().signOut();
	            		alert('el usuario seleccionado no se encuentra registrado');
	            	}else{
	            	}
	            }, function(error){
	            	alert('Ha ocurrido un error');
        		});

		}).catch(function(err){
			 	
		})
	}
	handlerClick(event){
		const auth = firebase.auth();
		var user = document.getElementById('username').value;
		var pass = document.getElementById('password').value;
		auth.signInWithEmailAndPassword(user, pass)
		.then(function(datosUsuario){


		}).catch(function(err){
	            		
	            	alert('Los datos ingresados sin incorrectos');
		});
	}
	handlerClickRegister(event){
	}
	render(){
		return(
			<div id="principal-login">
				<h1>LOGIN</h1>
				<input id = 'username' placeholder='username' type='email'/>
				<br/>
				<input id='password' placeholder ='password' type='password'/>
				<br/>
				<button onClick={this.handlerClick}>Iniciar sesión</button>
				<br/>
				<button onClick={this.handlerClickGoogle}>google</button>
				<button onClick={this.handlerClickRegister}>register</button>

			</div>
		);
	}
}
export default Login;