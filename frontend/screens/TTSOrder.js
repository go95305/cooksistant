import React, {Component} from 'react';
import { StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import axios from 'axios';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

import Swiper from 'react-native-swiper';
import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get('screen');

class TTSOrder extends React.Component {
  
  sptx = "";

  constructor(props) {
    // console.log('props' + props.route.params.id);
    super(props);
    this.state = {
      swiperShow: false,
      id: this.props.route.params.id,
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
        console.log(result);
        console.log('result.data.cuisine' + result.data.cuisine);
        const list = [];

        result.data.stepList.forEach((el) => {
          list.push({
            image: el.image,
            level: el.level,
            description: el.description,
          });
        }),
          this.setState({
            recipeDetail: {
              id: result.data.recipeId,
              nickname: result.data.nickname,
              cuisine: result.data.cuisine,
              stepList: list,
            },
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _speechText() {
    //const thingToSay = document.getElementById('speechtext').value;
    const thingToSay = this.sptx;
    console.log(thingToSay);
    Speech.speak(thingToSay);
  };

  render() {
    let thingToSay;
    return (
      <Swiper
        onMomentumScrollEnd={this._speechText} >
        {this.state.recipeDetail.stepList.map((idx, index) => (
          <Block center key={index} style={[styles.registerContainer]}>
            <Block
              center
              style={{
                marginTop: height > 800 ? 100 : 80,
                width: width * 0.8,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  textAlign: 'center',
                }}
                color="#333"
                size={20}
                bold
              >
                Level.
              </Text>
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  textAlign: 'center',
                }}
                color="#333"
                size={15}
                bold
              >
                {idx.level}
              </Text>
            </Block>
            <Block space="between">
              <Block center style={{ marginTop: 50, marginBottom: 50 }}>
                <Image style={{ height: 150, width: 250 }} source={{ uri: idx.image }} />
              </Block>
              <Block
                style={{
                  width: width * 0.8,
                  alignItems: 'center',
                  borderRadius: 20,
                  backgroundColor: '#FFDEAD',
                }}
              >
                <Text
                  ref = {(ref) => {this.sptx=ref}}
                  style={{
                    fontFamily: 'montserrat-regular',
                    textAlign: 'center',
                    lineHeight: 25,
                    padding: 10,
                  }}
                  color="#333"
                  size={15}
                  value = {this.speechtext}
                >
                  {idx.description}
                </Text>
                
              </Block>
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
});

export default TTSOrder;
