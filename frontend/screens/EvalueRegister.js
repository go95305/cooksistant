import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import TagSelect from 'react-native-tag-select';
import StarRating from 'react-native-star-rating';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const recipe = {
  title: '빨간맛 떡볶이',
  image: require('../assets/imgs/food1.png'),
  isEvalu: false,
};

class TasteRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: this.starCount == null ? 3 : this.starCount,
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

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
                    label="평가"
                    scrollViewProps={{ scrollEnabled: false }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                  >
                    <Block flex={1} style={{ alignItems: 'center' }}>
                      <Block style={{ marginTop: 10 }}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginTop: height > 800 ? 15 : 10,
                            marginBottom: 15,
                          }}
                          color="#333"
                          size={19}
                        >
                          {recipe.title}
                        </Text>
                        <Image
                          source={recipe.image}
                          style={{
                            width: width - theme.SIZES.BASE * (height > 800 ? 6 : 8),
                            height: height > 800 ? 210 : 180,
                          }}
                        />
                      </Block>
                      <Block flex={1} center style={styles.evalueContainer}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginBottom: height > 800 ? 18 : 15,
                          }}
                          color="#333"
                          size={15}
                        >
                          레시피 평가
                        </Text>
                        <StarRating
                          disabled={false}
                          maxStars={5}
                          starSize={45}
                          halfStarEnabled={true}
                          emptyStarColor={'#f18d46'}
                          fullStarColor={'#f18d46'}
                          rating={this.state.starCount}
                          selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                        <Text style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginTop: height > 800 ? 15 : 10,
                          }} >{this.state.starCount} / 5</Text>
                      </Block>
                    </Block>
                  </ProgressStep>
                  <ProgressStep
                    label="맛"
                    scrollViewProps={{ scrollEnabled: false }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                  >
                    <Block></Block>
                  </ProgressStep>
                  <ProgressStep
                    label="특징"
                    scrollViewProps={{ scrollEnabled: false }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                  >
                    <Block></Block>
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
  evalueContainer: {
    marginTop: Platform.OS === 'android' ? 35 : 45,
  },
  tasteContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    marginLeft: 15,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 20,
    marginBottom: 15,
  },
  item: {
    width: 100,
    borderWidth: 1,
    borderColor: '#f18d46',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  label: {
    color: '#f18d46',
    fontFamily: 'montserrat-bold',
  },
  itemSelected: {
    backgroundColor: '#f18d46',
    borderColor: '#fff',
  },
  labelSelected: {
    color: '#FFF',
  },
});

export default TasteRegister;
