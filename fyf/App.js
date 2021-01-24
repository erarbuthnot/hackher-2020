import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';

import ApiKeys from './constants/ApiKeys';

import Login from './components/Login';
import Tasks from './components/TaskScreen';
import Nav from './components/NavBar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      userid: ''
    };

    // Initialize firebase
    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
  }

  componentDidMount(){
    this.isLoggedIn()
  }

  isLoggedIn = () =>{
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        //user has been logged in
        this.setState({logged_in: true});
        console.log("logged in")
        this.setState({userid: user.uid});
      } else {
        //user needs to log in still
        console.log("not logged in")
      }
    })
  }

  render() {
    return (
      this.state.logged_in ? <Nav userid={this.state.userid}/> : <Login/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
