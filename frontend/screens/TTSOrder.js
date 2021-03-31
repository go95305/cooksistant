import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  View,
} from 'react-native';
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
              stepList: list,
            },
          });
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      this.setState({
        swiperShow: true,
      });
    }, 0);
  };

  render() {
    if (this.state.swiperShow) {
      return (
        <Block style={styles.container}>
          <Block flex middle>
            <Swiper style={styles.imgWrapper} height={200} showsButtons={true} autoplay={false}>
              {this.state.recipeDetail.stepList.map((idx, index) => (
                <View style={styles.imgView}>
                  <Image source={{ uri: idx.image }} style={styles.bannerImg} />
                </View>
              ))}
            </Swiper>
          </Block>
        </Block>
      );
    } else {
      return (
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Swiper style={styles.imgWrapper} height={200} showsButtons={true} autoplay={true}>
              <View style={styles.imgView}>
                <Image
                  source={{
                    uri:
                      'https://recipe1.ezmember.co.kr/cache/recipe/2015/12/28/afc904b7d9ff6e62aae0d02ed64033331.jpg',
                  }}
                  style={styles.bannerImg}
                />
              </View>
            </Swiper>
          </ImageBackground>
        </Block>
      );
    }
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
  imgWrapper: {
    height: 230,
    width: 300,
  },
  imgView: {
    height: 200,
  },
  bannerImg: {
    height: 230,
    width: 300,
  },
});

export default TTSOrder;
