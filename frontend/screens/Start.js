import React from 'react';
import { ImageBackground, Alert, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';

const firebaseConfig = {
  apiKey: 'AIzaSyC8PjQAKy-gaLJ960SIFn2Bc-4PVG2dcXc',
  authDomain: 'cooksistant-308615.firebaseapp.com',
  databaseURL: 'https://cooksistant-308615-default-rtdb.firebaseio.com',
  projectId: 'cooksistant-308615',
  storageBucket: 'cooksistant-308615.appspot.com',
  messagingSenderId: '859478845487',
  appId: '1:859478845487:web:68ebbc76dfad6cdf22feda',
  measurementId: 'G-2NQFW6NDY4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Onboarding extends React.Component {
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log('user sign in');
              firebase
                .database()
                .ref('/users' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.profile_picture,
                  locale: result.additionalUserInfo.profile_picture.locale,
                  first_name: result.additionalUserInfo.given_name,
                  last_name: result.additionalUserInfo.first_name,
                })
                .then(function (snapshot) {});
            })
            .catch(function (error) {
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
      }.bind(this)
    );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        clientId:
          Platform.OS === 'android'
            ? '859478845487-j0u018t8iqmg0bfua4hp0figqmlp4gfk.apps.googleusercontent.com'
            : '859478845487-23l78jo7evj2rdr9gkaupqauqq67d0o1.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        Alert.alert(result.accessToken);
        this.onSignIn(result);
        this.props.navigation.navigate('App');
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.Start}
            style={{ flex: 1, height: height, width, zIndex: 1 }}
          />
          <Block center space="between" style={styles.padded}>
            <Block>
              <Block>
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => this.signInWithGoogleAsync()}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 15 }}
                    color={theme.COLORS.WHITE}
                  >
                    구글 로그인
                  </Text>
                </Button>
              </Block>
              <Block>
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate('App')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    한번 둘러볼게요 :)
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 4.5 : theme.SIZES.BASE * 5,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
});
