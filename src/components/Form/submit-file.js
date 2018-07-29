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

class SubmitFile extends Component {
	handlerClickPublish(event){

		const user = firebase.auth().currentUser.uid;
		const title = document.getElementById('title').value;
		const picture = document.getElementById('picture').value;
		const description = document.getElementById('description').value;
		var obj = {
			'TITLE':title,
			'PICTURE': picture,
			'DESCRIPTION': description,
			'TYPE': 'IMAGE'
		}
		firebase.database().ref('USUARIOS/'+user).child('PUBLISH').push(obj).then(function(){
			alert('publicado correctamente');

		});
	}
	render(){
		return(
			<div id="principal-login">
				<h1>Añadir fotografía</h1>
				<p>
					Título
					<input type='text' id='title'/>
				</p>
				<p>
					Foto
					<input type='file' id = 'picture' accept='image/png, image/jpg'/>
				</p>
				<p>
					Descripcion
					<input type='text' id = 'description'/>
				</p>
				<button onClick= {this.handlerClickPublish}>Publicar</button>

			</div>
		);
	}
}
export default SubmitFile;