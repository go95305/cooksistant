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
    // const [alternateImage, setAlternateImage] = useState(true);

    // const changeImage = () => {
    //   setAlternateImage((alternateImage) => !alternateImage);
    // };
    return (
      <ScrollView style={styles.scrollableView} showsVerticalScrollIndicator={false}>
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
                  paddingTop: height > 800 ? 130 : 100,
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
                <Text style={styles.titleStyle}>재료</Text>

                <Block row>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>가지</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>2개</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>고추</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>1개</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                </Block>
                <Block row>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>양파</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>1/4개</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>대파</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>1개</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                </Block>
                <Block row>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>통깨</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>0.5숟</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>참기름</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>1숟</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                </Block>
              </Block>
              <Block>
                <Text style={styles.titleStyle}>양념장</Text>

                <Block row>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>간장</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>2숟</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>다진마늘</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>0.5숟</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                </Block>
                <Block row>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>굴소스</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>1숟</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>고추가루</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>0.5숟</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                </Block>
                <Block row>
                  <TouchableOpacity style={styles.ingreBtn}>
                    <Block row>
                      <Text style={styles.ingreTxt}>설탕</Text>
                      <View style={styles.viewStyle}>
                        <Text style={styles.amoutTxt}>1숟</Text>
                      </View>
                    </Block>
                  </TouchableOpacity>
                </Block>
              </Block>
              <Hr />
            </Block>
          </Block>
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <View style={styles.mainViewStyle}>
        {this.renderDetail()}
        <View style={styles.underMenu}>
          <Button
            style={styles.btnStyle}
            textStyle={{ fontSize: 15, color: '#F18D46' }}
            color="Primary"
            round
            onPress={() => this.props.navigation.navigate('TTSOrder')}
          >
            요리시작
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollableView: { flexGrow: 1, height: height * 0.5 },
  mainViewStyle: { flexGrow: 1, marginTop: height > 800 ? 100 : 60 },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    alignSelf: 'center',
    fontFamily: 'montserrat-bold',
  },
  ingreTxt: {
    fontSize: 15,
    color: 'white',
    margin: 10,
    fontFamily: 'montserrat-bold',
  },
  amoutTxt: {
    fontFamily: 'montserrat-bold',
  },
  titleStyle: {
    color: '#2c2c2c',
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'montserrat-bold',
    marginTop: 10,
    marginBottom: 10,
    zIndex: 2,
  },

  ingreBtn: {
    width: '45%',
    height: 44,
    marginHorizontal: 10,
    elevation: 0,
    margin: 5,
    backgroundColor: '#F18D46',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  underMenu: {
    alignItems: 'center',
    marginBottom: 10,
    bottom: -10,
    backgroundColor: 'white',
  },
  btnStyle: {
    width: 200,
    height: 44,
    marginHorizontal: 10,
    elevation: 0,
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 4,
    borderColor: '#F18D46',
  },
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
