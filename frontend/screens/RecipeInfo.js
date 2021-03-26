import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

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
      <Block style={styles.container}>
        <Block>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex={1}>
              <Block center style={styles.infoContainer}>
                <Block style={{ alignItems: 'center' }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Block>
                      <Image
                        source={Images.eggplant}
                        style={{
                          width: width * 0.9,
                          height: 252,
                        }}
                      />
                    </Block>
                    <Block row style={{ marginTop: 20, marginLeft: 20, marginBottom: 8 }}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          fontSize: 24,
                        }}
                        color="black"
                      >
                        가지볶음
                      </Text>
                      <TouchableOpacity activeOpacity={0.5} onPress={this.changeImage}>
                        <Image source={this.state.img} style={{ marginLeft: 10 }} />
                      </TouchableOpacity>
                    </Block>
                    <Block row style={{ marginLeft: 25, marginBottom: 4 }}>
                      <Text color="black" size={15} style={{ fontFamily: 'montserrat-regular' }}>
                        2인분
                      </Text>
                      <Text> | </Text>
                      <Text color="black" size={15} style={{ fontFamily: 'montserrat-regular' }}>
                        20분
                      </Text>
                    </Block>
                    <Block center style={{ width: width * 0.8, alignItems: 'center' }}>
                      <Text
                        size={16}
                        muted
                        style={{
                          textAlign: 'center',
                          color: '#2c2c2c',
                          fontWeight: 'bold',
                          fontSize: 15,
                          padding: 10,
                        }}
                      >
                        가지는 장도 튼튼하게 해주고, 피로회복에도 효과가 뛰어나다고 해요!! 이렇게
                        좋은 먹거리인 ‘가지’로 간단하지만 정말 맛있는 가지볶음을 해보아요 :)
                      </Text>
                    </Block>
                    <Block
                      style={{
                        borderColor: '#b6b7b7',
                        width: '90%',
                        borderWidth: StyleSheet.hairlineWidth,
                        marginHorizontal: 10,
                      }}
                    />
                    <Block style={{ width: width * 0.8 }}>
                      <Block style={{ width: width * 0.8 }}>
                        <Text style={styles.titleStyle}> 재료</Text>
                        <Block style={{ marginLeft: 15 }}>
                          <Block row>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>가지</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>2개</Text>
                                </Block>
                              </Block>
                            </Block>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>고추</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>1개</Text>
                                </Block>
                              </Block>
                            </Block>
                          </Block>
                          <Block row>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>양파</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>1/4개</Text>
                                </Block>
                              </Block>
                            </Block>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>대파</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>1개</Text>
                                </Block>
                              </Block>
                            </Block>
                          </Block>
                          <Block row>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>통깨</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>0.5숟</Text>
                                </Block>
                              </Block>
                            </Block>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>참기름</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>1숟</Text>
                                </Block>
                              </Block>
                            </Block>
                          </Block>
                        </Block>
                      </Block>
                      <Block>
                        <Text style={styles.titleStyle}>양념장</Text>
                        <Block style={{ marginLeft: 15 }}>
                          <Block row>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>간장</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>2숟</Text>
                                </Block>
                              </Block>
                            </Block>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>다진마늘</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>0.5숟</Text>
                                </Block>
                              </Block>
                            </Block>
                          </Block>
                          <Block row>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>굴소스</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>1숟</Text>
                                </Block>
                              </Block>
                            </Block>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>고추가루</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>0.5숟</Text>
                                </Block>
                              </Block>
                            </Block>
                          </Block>
                          <Block row>
                            <Block style={styles.ingreBtn}>
                              <Block row>
                                <Text style={styles.ingreTxt}>설탕</Text>
                                <Block style={styles.amoutBtn}>
                                  <Text style={styles.amoutTxt}>1숟</Text>
                                </Block>
                              </Block>
                            </Block>
                          </Block>
                        </Block>
                      </Block>
                    </Block>
                  </ScrollView>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block style={styles.mainViewStyle}>
        <Block flex={9}>{this.renderDetail()}</Block>
        <Block flex={1} style={styles.underMenu}>
          <Button
            style={styles.btnStyle}
            textStyle={{ fontSize: 15, color: '#F18D46' }}
            color="Primary"
            round
            onPress={() => this.props.navigation.navigate('TTSOrder')}
          >
            요리시작
          </Button>
        </Block>
      </Block>
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
  },
  imageBackground: {
    width: width,
    height: height,
  },
  infoContainer: {
    marginTop: height > 800 ? 5 : 10,
    width: width * 0.9,
    height: height > 800 ? height * 0.78 : height * 0.725,
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
  ingreBtn: {
    width: '50%',
    height: 45,
    margin: 5,
    elevation: 0,
    backgroundColor: '#F18D46',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  ingreTxt: {
    fontSize: 15,
    color: 'white',
    margin: 10,
    fontFamily: 'montserrat-bold',
  },
  amoutBtn: {
    width: 53,
    borderRadius: 20,
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    overflow: 'hidden',
    padding: 5,
    justifyContent: 'center'
  },
  amoutTxt: {
    fontSize: 12,
    fontFamily: 'montserrat-bold',
    textAlign: 'center',
  },
  titleStyle: {
    color: '#2c2c2c',
    fontWeight: 'bold',
    fontSize: 19,
    fontFamily: 'montserrat-bold',
    margin: 15,
    marginLeft: 20,
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
});
export default RecipeInfo;
