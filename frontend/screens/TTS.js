import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';
import axios from 'axios';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class TTS extends React.Component {
  speak() {
    const thingToSay = '텍스트 안에서 함수실행은 어떻게 하죠?';
    Speech.speak(thingToSay);
  }
  constructor(props) {
    console.log('props' + props.route.params.id);
    super(props);
    this.state = {
      id: this.props.route.params.step.id,
      recipeDetail: {
        id: 0,
        nickname: null,
        cuisine: null,
        stepList: [],
      },
    };
  }
  componentDidMount = (props) => {
    axios
      .get(`http://j4c101.p.ssafy.io:8081/recipe/show/${this.state.id}`)
      .then((result) => {
        const IngredientList = [];
        const stepList = [];
        const title1 = result.data.cuisine.substr(0, result.data.cuisine.indexOf(']') + 1);
        const title2 = result.data.cuisine.substr(result.data.cuisine.indexOf(']') + 2);

        result.data.ingredientDTOList.forEach((el) => {
          const tmp = el.amount.split('(');
          const tmp1 = el.ingredientName.split('(');

          IngredientList.push({
            ingredientName: tmp1[0],
            amount: tmp[0],
            isType: el.isType,
          });
        }),
          result.data.stepList.forEach((el) => {
            stepList.push({
              description: el.description,
              image: el.image,
              level: el.level,
            });
          }),
          this.setState({
            recipeDetail: {
              id: result.data.recipeId,
              nickname: result.data.nickname,
              cuisine: title1,
              cuisine1: title2,
              description: result.data.description,
              cookingTime: result.data.cookingTime,
              image: result.data.image,
              level: result.data.level,
              serving: result.data.serving,
              ingredientDTOList: IngredientList,
              stepList: stepList,
            },
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly" style={{ marginTop: height > 800 ? 60 : 60 }}>
                  <Block flex={0.2} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        textAlign: 'center',
                      }}
                      color="#333"
                      size={20}
                      bold
                    >
                      {this.state.recipeDetail.cuisine}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        textAlign: 'center',
                        padding: 20,
                      }}
                      color="#333"
                      size={15}
                      bold
                    >
                      {this.state.recipeDetail.cuisine1}
                    </Text>
                  </Block>

                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block middle>
                          <Image
                            resizeMode="contain"
                            style={styles.photo}
                            source={{ uri: this.state.recipeDetail.image }}
                          />
                        </Block>
                        <Block flex={0.2} middle>
                          <Text
                            style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center',
                              marginTop: 50,
                              color: 'black',
                            }}
                            color="#333"
                            size={18}
                          >
                            같이 요리해볼까요?
                          </Text>
                        </Block>
                        <Block middle>
                          <Block color="primary" round style={styles.createButton}>
                            <Button onPress={this.speak}>
                              <Text>글을 읽어줄게요</Text>
                            </Button>
                          </Block>
                        </Block>

                        <Block center>
                          <Button
                            color="primary"
                            round
                            style={styles.createButton}
                            onPress={() =>
                              this.props.navigation.navigate('TTSOrder', {
                                id: this.state.recipeDetail.id,
                              })
                            }
                          >
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              START
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
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
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
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
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 30,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  photo: {
    borderRadius: 20,
    height: 230,
    width: 300,
  },
});

export default TTS;
