import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

export default class Login extends Component {

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function(result){
            console.log('User logged in.');
            firebase
              .database()
              .ref('/users/'+result.user.uid)
              .set({
                gmail: result.user.email,
                f_name: result.additionalUserInfo.profile.given_name,
                l_name: result.additionalUserInfo.profile.family_name,
                rank: 0,
                tasks: 0,
                hours: 0,
              })
              .then(function(snapshot) {
                // nothing here
              })
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }

  signInWithGoogleAsync = async () => {
    // Google account login
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: '1054596687120-jae34qa39vh8fl7gde6u2luikblhvflb.apps.googleusercontent.com',
        // iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/sky.png')} style={styles.background_image} blurRadius={2}/>
        <Text style={styles.login_title}>Fight Your</Text>
        <Text style={styles.login_title_bottom}>Friends</Text>
        <TouchableOpacity style={styles.sign_up_button} onPress={() => this.signInWithGoogleAsync()}>
          <Text style={styles.top_button_text}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.log_in_button} onPress={() => this.signInWithGoogleAsync()}>
          <Text style={styles.bottom_button_text}>Log In</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 170,
  },
  background_image: {
    position: 'absolute',
    flex: 1,
    resizeMode: 'cover',
  },
  login_title: {
    fontSize: 30,
    color: '#2C3A47',
  },
  login_title_bottom: {
    fontSize: 50,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: '#82589F',
  },
  sign_up_button: {
    width: 150,
    height: 70,
    marginTop: 200,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#82589F',
  },
  top_button_text: {
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: 'white',
  },
  log_in_button: {
    width: 120,
    height: 50,
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderWidth: 2,
    borderRadius: 25,
    borderColor: '#82589F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_button_text: {
    fontSize: 18,
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: '#82589F',
  },
});