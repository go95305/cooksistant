import React, { Component } from 'react';

import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import Hr from 'react-native-hr-component';
const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

class RecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: require('../assets/imgs/bookmark.png'),
    };
  }
  changeImage = () => {
    this.setState({ img: require('../assets/imgs/bookmarkFull.png') });
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     img: require('../assets/imgs/bookmark.png'),
  //     value: 0,
  //   };
  // }
  // changeImage = () => {
  //   if (value == 0) {
  //     this.setState({ img: require('../assets/imgs/bookmarkFull.png') }, 1);
  //   } else if (value == 1) {
  //     this.setState({ img: require('../assets/imgs/bookmark.png') }, 0);
  //   }
  // };
  renderDetail = () => {
    return (
      <Block>
        <Block>
          <ImageBackground
            source={Images.eggplant}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          ></ImageBackground>
        </Block>
        <Block
          style={{
            top: height * 0.2,
            width: width,
            zIndex: 5,
            paddingHorizontal: 20,
          }}
        >
          <Block right row>
            <Text
              style={{
                marginTop: 15,
                fontFamily: 'montserrat-bold',
                marginBottom: theme.SIZES.BASE / 2,
                fontWeight: '900',
                fontSize: 26,
                paddingTop: 100,
              }}
              color="black"
            >
              가지볶음
            </Text>
            <TouchableOpacity activeOpacity={0.5} onPress={this.changeImage}>
              <Image source={this.state.img} style={{ marginLeft: 5, top: -5 }} />
            </TouchableOpacity>
          </Block>
          <Block row>
            <Text
              left
              color="black"
              size={15}
              style={{ marginBottom: 4, fontFamily: 'montserrat-regular' }}
            >
              2인분
            </Text>
            <Text> l </Text>
            <Text
              color="black"
              size={15}
              style={{ marginBottom: 4, fontFamily: 'montserrat-regular' }}
            >
              20분
            </Text>
          </Block>
          <Block right>
            <Button
              style={{ width: 90, height: 44, marginHorizontal: 10, elevation: 0 }}
              textStyle={{ fontSize: 15, color: 'white' }}
              color="Primary"
              round
              onPress={() => this.props.navigation.navigate('TTSOrder')}
            >
              요리시작
            </Button>
          </Block>
          <Block middle>
            <Text
              size={16}
              muted
              style={{
                textAlign: 'center',
                color: '#2c2c2c',
                fontWeight: 'bold',
                fontSize: 15,
                paddingHorizontal: 15,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              가지는 장도 튼튼하게 해주고, 피로회복에도 효과가 뛰어나다고 해요!! 이렇게 좋은
              먹거리인 ‘가지’로 간단하지만 정말 맛있는 가지볶음을 해보아요 :)
            </Text>
          </Block>
          <Hr />
          <Block>
            <Block>
              <Text
                style={{
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-bold',
                  marginTop: 10,
                  marginBottom: 10,
                  zIndex: 2,
                }}
              >
                재료
              </Text>

              <Block row>
                <Button
                  style={{ width: '42%', height: 44, marginHorizontal: 10, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  가지
                </Button>
                <Button
                  right
                  style={{ width: '42%', height: 44, marginHorizontal: 20, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  고추
                </Button>
              </Block>
              <Block row>
                <Button
                  style={{ width: '42%', height: 44, marginHorizontal: 10, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  양파
                </Button>
                <Button
                  right
                  style={{ width: '42%', height: 44, marginHorizontal: 20, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  대파
                </Button>
              </Block>
              <Block row>
                <Button
                  style={{ width: '42%', height: 44, marginHorizontal: 10, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  통깨
                </Button>
                <Button
                  right
                  style={{ width: '42%', height: 44, marginHorizontal: 20, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  참기름
                </Button>
              </Block>
            </Block>
            <Block>
              <Text
                style={{
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 19,
                  fontFamily: 'montserrat-bold',
                  marginTop: 10,
                  marginBottom: 10,
                  zIndex: 2,
                }}
              >
                양념장
              </Text>

              <Block row>
                <Button
                  style={{ width: '42%', height: 44, marginHorizontal: 10, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  간장
                </Button>
                <Button
                  right
                  style={{ width: '42%', height: 44, marginHorizontal: 20, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  다진마늘
                </Button>
              </Block>
              <Block row>
                <Button
                  style={{ width: '42%', height: 44, marginHorizontal: 10, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  굴소스
                </Button>
                <Button
                  right
                  style={{ width: '42%', height: 44, marginHorizontal: 20, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  고추가루
                </Button>
              </Block>
              <Block row>
                <Button
                  style={{ width: '42%', height: 44, marginHorizontal: 10, elevation: 0 }}
                  textStyle={{ fontSize: 15, color: 'white' }}
                  color="Primary"
                  round
                >
                  설탕
                </Button>
              </Block>
            </Block>
            <Hr />
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <ScrollView style={styles.scrollableView} showsVerticalScrollIndicator={false}>
          {this.renderDetail()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollableView: { flexGrow: 1, height: 0 },
  viewStyle: { flexGrow: 1, top: 60 },
  profileContainer: {
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
});
export default RecipeInfo;
