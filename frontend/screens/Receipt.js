import React from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Clipboard,
  FlatList,
  Image,
  Share,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'react-native-uuid';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import Environment from '../config/environment';
import firebase from '../config/firebase';
import axios from 'axios';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

export default class App extends React.Component {
  state = {
    userId: 0,
    image: null,
    uploading: false,
    googleResponse: null,
    recipeList: [],
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    const user = await firebase.auth().currentUser;
    axios
      .get(`http://j4c101.p.ssafy.io:8081/user/${user.uid}`)
      .then((result) => {
        this.setState({
          userId: result.data.userId,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let { image } = this.state;

    return (
      <Block style={styles.container}>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex={1} middle>
              <Block style={styles.receiptContainer}>
                <Block center style={{ marginTop: 30 }}>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      textAlign: 'center',
                    }}
                    color="#474747"
                    size={18}
                  >
                    영수증 사진을 등록해주세요.
                  </Text>
                </Block>
                <Block
                  center
                  style={{
                    borderColor: '#8898AA',
                    width: '90%',
                    borderWidth: StyleSheet.hairlineWidth,
                    marginTop: 20,
                  }}
                />
                <Block row center style={{ marginTop: 10 }}>
                  <Button color="primary" round style={styles.button} onPress={this._pickImage}>
                    <FontAwesome5 name="image" size={28} color="white" />
                  </Button>
                  <Button color="primary" round style={styles.button} onPress={this._takePhoto}>
                    <FontAwesome5 name="camera" size={28} color="white" />
                  </Button>
                </Block>
                <Block center>
                  {this._maybeRenderImage()}
                  {this._maybeRenderUploadingOverlay()}
                  {this.state.googleResponse && (
                    <FlatList
                      data={this.state.googleResponse.responses[0].labelAnnotations}
                      extraData={this.state}
                      keyExtractor={this._keyExtractor}
                      renderItem={({ item }) => <Text>Item: {item.description}</Text>}
                    />
                  )}
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </Block>
    );
  }

  organize = (array) => {
    return array.map(function (item, i) {
      return (
        <Block key={i}>
          <Text>{item}</Text>
        </Block>
      );
    });
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <Block
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </Block>
      );
    }
  };

  _maybeRenderImage = () => {
    const { navigation } = this.props;
    let { image, googleResponse } = this.state;
    if (!image) {
      return;
    }
    return (
      <Block>
        <Block style={{ marginTop: 20 }}>
          <Block center>
            <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
          </Block>
          <Block center row style={{ marginTop: 15, marginBottom: 10, alignItems: 'center' }}>
            <Text style={{ marginRight: 5 }} size={15} color={'#f18d46'} bold>
              두번 이상 클릭해주세요.
            </Text>
            <AntDesign name="warning" size={20} color={'#f18d46'} />
          </Block>
          <Block row center>
            <Button
              color="primary"
              round
              style={styles.button}
              onPress={() => this.submitToGoogle()}
            >
              <Text
                style={{ fontFamily: 'montserrat-bold' }}
                size={14}
                color={nowTheme.COLORS.WHITE}
              >
                재료 추출하기
              </Text>
            </Button>
            {this.state.recipeList.length > 0 && (
              <Button
                color="primary"
                round
                style={styles.button}
                onPress={() =>
                  navigation.navigate('RecommList', {
                    userId: this.state.userId,
                    ingredients: [],
                    recipeList: this.state.recipeList,
                  })
                }
              >
                <Text
                  style={{ fontFamily: 'montserrat-bold' }}
                  size={14}
                  color={nowTheme.COLORS.WHITE}
                >
                  레시피 추천받기
                </Text>
              </Button>
            )}
          </Block>
        </Block>
      </Block>
    );
  };
  uploadUrl;

  _keyExtractor = (item, index) => item.id;

  _renderItem = (item) => {
    <Text>response: {JSON.stringify(item)}</Text>;
  };

  _share = () => {
    Share.share({
      message: JSON.stringify(this.state.googleResponse.responses),
      title: 'Check it out',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied to clipboard');
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async (pickerResult) => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        const uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
        //this.setState({ image: pickerResult.uri });
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({ uploading: false });
    }
  };

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: 'TEXT_DETECTION' }],
            image: {
              source: {
                imageUri: image,
              },
            },
            imageContext: {
              languageHints: ['ko-t-i0-handwrit'],
            },
          },
        ],
      });

      let response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=' +
          Environment['GOOGLE_CLOUD_VISION_API_KEY'],
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
          method: 'POST',
          body: body,
        }
      );

      let responseJson = await response.json();
      console.log('###########################################');
      console.log(responseJson);
      console.log('###########################################');
      try {
        console.log(
          JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(responseJson)).responses[0]))
            .textAnnotations[0].description
        );
        let str = JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(responseJson)).responses[0]))
          .textAnnotations[0].description;
        console.log('str : ' + str);

        axios
          .post(`http://j4c101.p.ssafy.io:8081/recipe/ocr/`, {
            ocrscan: str,
            userId: this.state.userId,
          })
          .then((result) => {
            console.log(result);
            const arrayList = [];
            if (result.data && Array.isArray(result.data)) {
              result.data.forEach((el) => {
                arrayList.push({
                  rId: el.recipeId,
                  title: el.recipename,
                  image: el.url,
                  favor: el.favor,
                  desc: el.description,
                  flag: false,
                });
              });
            }
            this.setState({ recipeList: arrayList });
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(strArray[0]);
      } catch (error) {
        console.log('error');
      }
      this.setState({
        googleResponse: responseJson,
        uploading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(uuid.v4());
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  receiptContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },

  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },

  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    height: 50,
    width: width * 0.3,
  },
});
