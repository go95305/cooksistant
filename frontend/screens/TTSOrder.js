import React from 'react';
import { StyleSheet, Dimensions, Image, Alert, ScrollView } from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import { FontAwesome5 } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import * as Speech from 'expo-speech';
import firebase from 'firebase';
import axios from 'axios';

const { width, height } = Dimensions.get('screen');

class TTSOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperShow: false,
      userId: 0,
      eId: 0,
      rId: this.props.route.params.id,
      image: null,
      cuisine: null,
      nickname: null,
      stepList: [],
    };
  }
  componentDidMount = () => {
    var user = firebase.auth().currentUser;
    if (user) {
      axios
        .get(`http://j4c101.p.ssafy.io:8081/user/${user.uid}`)
        .then((result) => {
          this.setState({ userId: result.data.userId });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    axios
      .get(`http://j4c101.p.ssafy.io:8081/recipe/show/${this.state.rId}`)
      .then((result) => {
        console.log(result);
        const sList = [];
        result.data.stepList.forEach((el) => {
          sList.push({
            sId: el.stepId,
            sImage: el.image,
            description: el.description,
            level: el.level,
          });
        }),
          this.setState({
            nickname: result.data.nickname,
            cuisine: result.data.cuisine,
            image: result.data.image,
            stepList: sList,
          });
      })
      .then(() => {
        Speech.speak(this.state.stepList[0].description);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  checkEvalu() {
    const { navigation } = this.props;
    axios
      .post(`http://j4c101.p.ssafy.io:8081/recipe/evaluation`, {
        userId: this.state.userId,
        evaluationId: 0,
        favor: 0,
        isComplete: false,
        isUpdate: true,
        recipeId: this.state.rId,
      })
      .then((response) => {
        if (response.status == 200) {
          this.setState({ eId: response.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    Alert.alert(
      '레시피 평가하러 갈까요?',
      ' ',
      [
        {
          text: '다음에 할게요',
          style: 'cancel',
        },
        {
          text: '네',
          onPress: () =>
            navigation.navigate('EvalueRegister', {
              eId: this.state.eId,
              rId: this.state.rId,
              title: this.state.cuisine,
              image: this.state.image,
            }),
        },
      ],
      { cancelable: false }
    );
  }

  _speechText(num) {
    console.log(this.state.stepList[num].description);
    console.log(num);
    Speech.speak(this.state.stepList[num].description);
  }

  btnSpeak(text) {
    const toSay = text;
    Speech.speak(toSay);
  }

  render() {
    return (
      <Swiper
        loop={false}
        showsPagination={false}
        onIndexChanged={(index) => {
          this._speechText(index);
        }}
      >
        {this.state.stepList.map((el, index) => (
          <Block flex center key={index} style={[styles.registerContainer]}>
            <Block flex={0.1} style={{ marginTop: 55 }}>
              <Block row space="around">
                <Text
                  style={{
                    fontFamily: 'montserrat-bold',
                    textAlign: 'center',
                  }}
                  color="#474747"
                  size={20}
                >
                  {el.level} &nbsp;
                </Text>
                <Text
                  style={{
                    fontFamily: 'montserrat-bold',
                    textAlign: 'center',
                  }}
                  color="#474747"
                  size={20}
                >
                  / {this.state.stepList.length}
                </Text>
              </Block>
            </Block>

            <Block flex={0.35}>
              <Block center style={{ marginBottom: 30, overflow: 'hidden' }}>
                <Image resizeMode="cover" style={styles.photo} source={{ uri: el.sImage }} />
              </Block>
            </Block>
            <Block flex={0.3}>
              <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 30 }}>
                <Block
                  center
                  style={{
                    width: width * 0.8,
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: '#FFDEAD',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      textAlign: 'center',
                      lineHeight: 25,
                      padding: 20,
                    }}
                    color="#474747"
                    size={15}
                    value={this.speechtext}
                  >
                    {el.description}
                  </Text>
                </Block>
              </ScrollView>
            </Block>
            <Block row flex={0.1}>
              <Button
                color="primary"
                round
                style={styles.button}
                onPress={() => this.btnSpeak(el.description)}
              >
                <FontAwesome5 name="microphone" size={24} color="white" />
              </Button>
              {el.level === this.state.stepList.length ? (
                <Button
                  color="primary"
                  round
                  style={styles.button}
                  onPress={() => this.checkEvalu()}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold' }}
                    size={14}
                    color={nowTheme.COLORS.WHITE}
                  >
                    레시피 완성
                  </Text>
                </Button>
              ) : (
                <Block />
              )}
            </Block>
          </Block>
        ))}
      </Swiper>
    );
  }
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
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: height > 800 ? 100 : 70,
    width: width * 0.9,
    height: height * 0.9,
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
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: width * 0.9,
    height: height / 2,
  },
  photo: {
    borderRadius: 30,
    height: 185,
    width: width * 0.85,
  },
  button: {
    height: 50,
    width: width * 0.3,
  },
});

export default TTSOrder;
