import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp({
  apiKey: "AIzaSyBYYhmwVTO2rPqAsZbQrMsk2jrBBVZOlLw",
  authDomain: "react-firebase-login-db.firebaseapp.com"
})

class App extends React.Component {
  state = {
    isSignedIn: false
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callback: {
      signInSuccess: () => false
    }
  }

 

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!!user}) //!!user means that if user isSignedIn covert it to !isSigneIn
    })
  }

  render(){
    return (
      <div className="App">
        {
          this.state.isSignedIn ? (
            <Fragment>
              <div>
                <h1>Hello {firebase.auth().currentUser.displayName}</h1>
                <img alt="profile picture" src={firebase.auth().currentUser.photoURL} />
              </div>
              <div>
                <button onClick={()=>firebase.auth().signOut()}>Sign Out</button>
              </div>
            </Fragment>
          ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )
        }
      </div>
    );
  }
}

export default App;
