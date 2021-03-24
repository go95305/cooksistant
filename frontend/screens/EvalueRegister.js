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
import StarRating from 'react-native-star-rating';
import TagSelector from 'react-native-tag-selector';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const recipe = {
  title: '빨간맛 떡볶이',
  image: require('../assets/imgs/food1.png'),
  isEvalu: false,
};

class TasteRegister extends React.Component {
  Tastes = [
    { id: 1, name: '달아요' },
    { id: 2, name: '짜요' },
    { id: 3, name: '써요' },
    { id: 4, name: '셔요' },
    { id: 5, name: '매워요' },
    { id: 6, name: '싱거워요' },
  ];
  Features = [
    { id: 7, name: '기름져요' },
    { id: 8, name: '느끼해요' },
    { id: 9, name: '고소해요' },
    { id: 10, name: '담백해요' },
    { id: 11, name: '비려요' },
    { id: 12, name: '바삭해요' },
    { id: 13, name: '아삭해요' },
    { id: 14, name: '쫀득해요' },
    { id: 15, name: '쫄깃해요' },
    { id: 16, name: '눅눅해요' },
    { id: 17, name: '부드러워요' },
    { id: 18, name: '향이강해요' },
  ];

  constructor(props) {
    super(props);
    this.state = {
      starCount: this.starCount == null ? 3 : this.starCount,
      selectedTastes: [],
      selectedFeatures: [],
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onSubmit() {
    Alert.alert('확인','평가를 등록하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('취소'),
        style: 'cancel',
      },
      {
        text: '네',
        onPress: () => {
          console.log('네');
          Alert.alert('별점: ', JSON.stringify(this.state.starCount))
          Alert.alert('맛: ', JSON.stringify(this.state.selectedTastes))
          Alert.alert('특징: ', JSON.stringify(this.state.selectedFeatures))
        },
      },
    ]);
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
                          size={14}
                        >
                          레시피에 대해 평가해주세요!
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
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginTop: height > 800 ? 15 : 10,
                          }}
                        >
                          {this.state.starCount} / 5
                        </Text>
                      </Block>
                    </Block>
                  </ProgressStep>
                  <ProgressStep
                    label="맛 & 특징"
                    scrollViewProps={{ scrollEnabled: false }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    onSubmit={this.onSubmit.bind(this)}
                  >
                    <Block flex={1}>
                      <Block>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            marginTop: 10,
                            marginLeft: Platform.OS === 'android' ? 40 : 30,
                          }}
                          color="#333"
                          size={14}
                        >
                          맛
                        </Text>
                        <Block flex={1} center style={styles.taste1Container}>
                          <TagSelector
                            tagStyle={styles.tag1}
                            selectedTagStyle={styles.tag1Selected}
                            tags={this.Tastes}
                            onChange={(selected) => this.setState({ selectedTastes: selected })}
                          />
                        </Block>
                      </Block>
                      <Block>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            marginTop: 25,
                            marginLeft: Platform.OS === 'android' ? 40 : 30,
                          }}
                          color="#333"
                          size={14}
                        >
                          특징
                        </Text>
                        <Block flex={1} center style={styles.featureContainer}>
                          <TagSelector
                            tagStyle={styles.tag2}
                            selectedTagStyle={styles.tag2Selected}
                            tags={this.Features}
                            onChange={(selected) => this.setState({ selectedFeatures: selected })}
                          />
                        </Block>
                      </Block>
                    </Block>
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
  taste1Container: {
    marginTop: 10,
    marginLeft: 25,
  },
  tag1: {
    width: width > 350 ? 95 : 80,
    padding: 10,
    margin: 3,
    borderWidth: 1,
    borderColor: '#f18d46',
    backgroundColor: '#fff',
    borderRadius: 20,
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
  },
  featureContainer: {
    marginTop: 15,
    marginLeft: 25,
  },
  tag2: {
    width: 90,
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
    width: 90,
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
  },
});

export default TasteRegister;
