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
import axios from 'axios';
const { width, height } = Dimensions.get('screen');

class RecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: require('../assets/imgs/bookmark.png'),
      id: this.props.route.params.id,

      recipeDetail: {
        id: 0,
        nickname: null,
        cuisine: null,
        description: null,
        cookingTime: null,
        image: null,
        level: null,
        serving: null,
        ingredientDTOList: [],
        stepList: [],
      },
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

  componentDidMount = (props) => {
    axios
      .get(`http://j4c101.p.ssafy.io:8081/recipe/show/${this.state.id}`)
      .then((result) => {
        const IngredientList = [];
        const stepList = [];

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
              cuisine: result.data.cuisine,
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
                        resizeMode="contain"
                        source={{ uri: this.state.recipeDetail.image }}
                        style={{
                          width: width * 0.9,
                          height: 252,
                        }}
                      />
                    </Block>
                    <Block
                      row
                      style={{
                        width: width * 0.65,
                        marginTop: 20,
                        marginLeft: 20,
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          fontSize: 15,
                          lineHeight: 18,
                        }}
                        color="black"
                      >
                        {this.state.recipeDetail.cuisine}
                      </Text>
                      <TouchableOpacity activeOpacity={0.5} onPress={this.changeImage}>
                        <Image source={this.state.img} style={{ marginLeft: 10 }} />
                      </TouchableOpacity>
                    </Block>
                    <Block row style={{ marginLeft: 25, marginBottom: 4 }}>
                      <Text color="black" size={13} style={{ fontFamily: 'montserrat-regular' }}>
                        {this.state.recipeDetail.serving}
                      </Text>
                      <Text size={13}> | </Text>
                      <Text color="black" size={13} style={{ fontFamily: 'montserrat-regular' }}>
                        {this.state.recipeDetail.cookingTime}
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
                          fontSize: 13,
                          padding: 10,
                        }}
                      >
                        {this.state.recipeDetail.description}
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
                    <Block style={{ width: width * 0.9 }}>
                      <Text style={styles.titleStyle}> 재료</Text>

                      <Block row style={{ marginLeft: 10, flexWrap: 'wrap' }}>
                        {this.state.recipeDetail.ingredientDTOList.map((idx, index) => (
                          <Block key={index} style={styles.ingreBtn}>
                            <Block row>
                              <Text style={styles.ingreTxt}>{idx.ingredientName}</Text>
                              <Block style={styles.amoutBtn}>
                                <Text style={styles.amoutTxt}>{idx.amount}</Text>
                              </Block>
                            </Block>
                          </Block>
                        ))}
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
            textStyle={{ fontSize: 15, color: '#F18D46', fontFamily: 'montserrat-bold' }}
            color="Primary"
            round
            onPress={() =>
              this.props.navigation.navigate('TTS', { id: this.state.recipeDetail.id })
            }
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

  ingreBtn: {
    width: width * 0.4,
    height: 45,
    margin: 5,
    backgroundColor: '#F18D46',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  ingreTxt: {
    fontSize: 13,
    color: 'white',
    margin: 5,
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
    justifyContent: 'center',
  },
  amoutTxt: {
    fontSize: 10,
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
