import React from 'react';
import { StyleSheet, ImageBackground, Dimensions, Image } from 'react-native';
import { Block, Text, Button as GaButton } from 'galio-framework';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import firebase from 'firebase';
import axios from 'axios';

import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

class RecipeRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      stepDTOpostList: [],
      ingredientDTOpostList: [],
    };
  }

  componentDidMount = () => {
    var user = firebase.auth().currentUser;
    axios
      .get(`http://j4c101.p.ssafy.io:8081/user/${user.uid}`)
      .then((result) => {
        this.setState({ userId: result.data.userId });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  titleInput = (props) => {
    return <Input {...props} editable maxLength={40} />;
  };
  introInput = (props) => {
    return <Input {...props} editable maxLength={2000} />;
  };

  onSubmit = () => {
    // axios
    //   .put(`http://j4c101.p.ssafy.io:8081/recipe/evaluationUpdate`, {
    //     userId: this.state.userId,
    //     evaluationId: this.state.evaluationId,
    //     recipeId: this.state.recipeId,
    //     isComplete: true,
    //     isSampled: true,
    //     isUpdate: true,
    //     favor: this.state.starCount,
    //     keywordList: this.state.selectedTastes.concat(this.state.selectedFeatures),
    //   })
    //   .then((response) => {
    //     if (response.status == 200) {
    //       Alert.alert('평가가 등록되었습니다.');
    //     }
    //   })
    //   .then(() => {
    //     this.props.navigation.dispatch(CommonActions.navigate('recipeList'));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  render() {
    const progressStepsStyle = {
      labelFontFamily: 'montserrat-bold',
      activeStepIconBorderColor: '#f18d46',
      activeLabelColor: '#f18d46',
      activeStepNumColor: '#f18d46',
      completedStepIconColor: '#f18d46',
      completedProgressBarColor: '#f18d46',
    };

    const buttonTextStyle = {
      color: '#f18d46',
      fontFamily: 'montserrat-bold',
      fontSize: 17,
    };

    return (
      <Block style={styles.container}>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex={1} middle>
              <Block style={styles.registerContainer}>
                <ProgressSteps {...progressStepsStyle}>
                  <ProgressStep
                    label="설명"
                    scrollViewProps={{ scrollEnabled: false }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                  >
                    <Block style={{ alignItems: 'center' }}>
                      <Block flex={1} center style={styles.recipeContainer}>
                        <Block width={width * 0.7} style={{ marginBottom: 5 }}>
                          <this.titleInput
                            multiline
                            numberOfLines={4}
                            placeholder="레시피명"
                            style={styles.titleInput}
                            iconContent={
                              <MaterialIcons
                                name="create"
                                size={16}
                                color="black"
                                style={styles.inputIcons}
                              />
                            }
                          />
                        </Block>
                        <Block row space="around " width={width * 0.7} style={{ marginBottom: 5 }}>
                          <Block center>
                            <Text
                              style={{ fontFamily: 'montserrat-regular' }}
                              size={14}
                              color="black"
                            >
                              이용 완료
                            </Text>
                          </Block>
                          <Block center>
                            <Text
                              style={{ fontFamily: 'montserrat-regular' }}
                              size={14}
                              color="black"
                            >
                              평가 완료
                            </Text>
                          </Block>
                        </Block>
                        <Block width={width * 0.7} style={{ marginBottom: 5 }}>
                          <this.introInput
                            multiline
                            numberOfLines={10}
                            placeholder="레시피 소개"
                            style={styles.introInput}
                          />
                        </Block>
                      </Block>
                    </Block>
                  </ProgressStep>
                  <ProgressStep
                    label="재료"
                    scrollViewProps={{ scrollEnabled: true }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    onSubmit={this.onSubmit}
                  >
                    <Block flex={1}></Block>
                  </ProgressStep>
                  <ProgressStep
                    label="과정"
                    scrollViewProps={{ scrollEnabled: true }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    onSubmit={this.onSubmit}
                  >
                    <Block flex={1}></Block>
                  </ProgressStep>
                </ProgressSteps>
              </Block>
            </Block>
          </ImageBackground>
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
  recipeContainer: {
    marginTop: 10,
  },
  titleInput: {
    height: 80,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 20,
  },
  introInput: {
    height: 150,
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 20,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  tasteContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  tag1: {
    width: width > 350 ? 95 : 80,
    padding: 10,
    margin: 3,
    borderWidth: 1,
    borderColor: '#f18d46',
    backgroundColor: '#fff',
    borderRadius: 18,
    fontSize: 14,
    fontFamily: 'montserrat-bold',
    color: '#f18d46',
    textAlign: 'center',
  },
  tag1Selected: {
    width: width > 350 ? 95 : 80,
    padding: 10,
    margin: 3,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#f18d46',
    borderRadius: 20,
    fontSize: 14,
    fontFamily: 'montserrat-bold',
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden',
  },
  featureContainer: {
    marginTop: 15,
    marginLeft: width > 340 ? 20 : 15,
  },
  tag2: {
    width: width > 340 ? 90 : 85,
    padding: 10,
    margin: 3,
    borderWidth: 1,
    borderColor: '#f18d46',
    backgroundColor: '#fff',
    borderRadius: 18,
    fontSize: 12,
    fontFamily: 'montserrat-bold',
    color: '#f18d46',
    textAlign: 'center',
  },
  tag2Selected: {
    width: width > 340 ? 90 : 85,
    padding: 10,
    margin: 3,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#f18d46',
    borderRadius: 18,
    fontSize: 12,
    fontFamily: 'montserrat-bold',
    color: 'white',
    textAlign: 'center',
    overflow: 'hidden',
  },
});

export default RecipeRegister;
