import React from 'react';
import { StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import axios from 'axios';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('screen');

class TTSOrder extends React.Component {
  constructor(props) {
    console.log('props' + props.route.params.id);
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
        const title1 = result.data.cuisine.substr(0, result.data.cuisine.indexOf(']') + 1);
        const title2 = result.data.cuisine.substr(result.data.cuisine.indexOf(']') + 2);

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
              cuisine: title1,
              cuisine1: title2,
              stepList: list,
            },
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Swiper>
        {this.state.recipeDetail.stepList.map((idx, index) => (
          <Block key={index} style={[styles.slideContainer]}>
            <Block cente style={{ width: width * 0.8, alignItems: 'center' }}>
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
                }}
                color="#333"
                size={15}
                bold
              >
                {this.state.recipeDetail.cuisine1}
              </Text>
            </Block>
            <Block space="between">
              <Block center style={{ marginTop: 50, marginBottom: 50 }}>
                <ImageBackground style={{ height: 150, width: 250 }} source={{ uri: idx.image }} />
              </Block>
              <Block style={{ width: width * 0.8, alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily: 'montserrat-regular',
                    textAlign: 'center',
                    lineHeight: 25,
                    padding: 10,
                  }}
                  color="#333"
                  size={15}
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
  createButton: {
    width: width * 0.5,
    marginTop: 10,
    marginBottom: 30,
  },
  photo: {
    borderRadius: 20,
    height: 230,
    width: 300,
  },
  MainContainer: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    justifyContent: 'center',
    margin: 10,
  },
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TTSOrder;
