import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import StarRating from 'react-native-star-rating';
import TagSelector from 'react-native-tag-selector';

import firebase from 'firebase';
import axios from 'axios';

import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

class TasteRegister extends React.Component {
  Tastes = [
    { id: '달다', name: '달아요' },
    { id: '짜다', name: '짜요' },
    { id: '쓰다', name: '써요' },
    { id: '시다', name: '셔요' },
    { id: '맵다', name: '매워요' },
    { id: '싱겁다', name: '싱거워요' },
  ];
  Features = [
    { id: '기름지다', name: '기름져요' },
    { id: '느끼하다', name: '느끼해요' },
    { id: '고소하다', name: '고소해요' },
    { id: '담백하다', name: '담백해요' },
    { id: '비리다', name: '비려요' },
    { id: '바삭하다', name: '바삭해요' },
    { id: '아삭하다', name: '아삭해요' },
    { id: '쫀득쫀득', name: '쫀득해요' },
    { id: '쫄깃쫄깃', name: '쫄깃해요' },
    { id: '눅눅하다', name: '눅눅해요' },
    { id: '부드럽다', name: '부드러워요' },
    { id: '향이 강하다', name: '향이강해요' },
  ];

  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      evaluationId: this.props.route.params.eId,
      recipeId: this.props.route.params.rId,
      starCount: this.starCount == null ? 3 : this.starCount,
      selectedTastes: [],
      selectedFeatures: [],
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

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  onSubmit = () => {
    axios
      .put(`http://j4c101.p.ssafy.io:8081/recipe/evaluationUpdate`, {
        userId: this.state.userId,
        evaluationId: this.state.evaluationId,
        recipeId: this.state.recipeId,
        isComplete: true,
        isSampled: true,
        isUpdate: true,
        favor: this.state.starCount,
        keywordList: this.state.selectedTastes.concat(this.state.selectedFeatures),
      })
      .then((response) => {
        if (response.status == 200) {
          Alert.alert('평가가 등록되었습니다.');
        }
      })
      .then(() => {
        this.props.navigation.dispatch(
            CommonActions.navigate('EvalueList'))
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const title = this.props.route.params.title;
    const image = this.props.route.params.image;
    const tmp = title.split(']');

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
                      <Block center style={{ marginTop: 7 }}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            lineHeight: 25,
                            margin: 20,
                            marginTop: height > 800 ? 0 : -5
                          }}
                          color="#333"
                          size={15}
                        >
                          {title.includes(']') ? tmp[0] + '] \n' + tmp[1].trim() : title} 
                        </Text>
                        <Image
                          resizeMode="stretch"
                          source={{ uri: image }}
                          style={{
                            borderRadius: 15,
                            width: width * 0.8,
                            height: 200,
                          }}
                        />
                      </Block>
                      <Block flex={1} center style={styles.evalueContainer}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginTop: height > 800 ? -5 : -10,
                            marginBottom: 13,
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
                            alignItems: 'center',
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
                    onSubmit={this.onSubmit}
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
                        <Block flex={1} center style={styles.tasteContainer}>
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
    marginTop: 35,
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

export default TasteRegister;
