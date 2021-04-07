import React from 'react';
import { ImageBackground, Alert, StyleSheet, StatusBar, Dimensions, Platform, AsyncStorag} from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import firebase from 'firebase';
import axios from "axios";

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
  state = { user: null };

  // 배포용 ==============================================
  componentDidMount() {
    this.initAsync();
  }

  initAsync = async () => {
    await GoogleSignIn.initAsync({
      // You may ommit the clientId when the firebase `googleServicesFile` is configured
      clientId: '859478845487-23l78jo7evj2rdr9gkaupqauqq67d0o1.apps.googleusercontent.com',
    });
    this._syncUserWithStateAsync();
  };

  _syncUserWithStateAsync = async () => {
    const googleuser = await GoogleSignIn.signInSilentlyAsync();
    this.setState({ googleuser });
  };

  signInAsync = async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
        this.onSignIn(user);
        this.props.navigation.navigate('App');
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  };
  
  // 로컬용 ==============================================
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id
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
            .then(() => {
              var user = firebase.auth().currentUser;
              axios.post(`http://j4c101.p.ssafy.io:8081/user`, {
                nickname: user.displayName,
                uid: user.uid
              })
              .then(()=> {
                console.log("success");
              })
              .catch(function (error) {
                console.log(error);
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };


  signInWithGoogle = async() => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '859478845487-c6kjb564m0kff49e50o9u2m8epil50nb.apps.googleusercontent.com',
        iosClientId: '859478845487-u55e018p49kijao11a0s8e2tdvk3gibc.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        this.onSignIn(result);
        this.props.navigation.navigate('App');
      }
    } catch ({ message }) {
      console.log(message);
    }
  }
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.Start}
            style={{ flex: 1, height: height * 1.05, width, zIndex: 1 }}
          />
          <Block center space="between" style={styles.padded}>
            <Block>
              <Block>
                <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  //onPress={() => this.signInWithGoogle()}
                  onPress={() => this.signInAsync()}
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

