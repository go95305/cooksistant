import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import SwitchSelector from 'react-native-switch-selector';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const recipe = {
  title: '빨간맛 떡볶이',
  image: require('../assets/imgs/food1.png'),
  isEvalu: false,
};

const isLike = [
  { label: '좋아요', value: 0 },
  { label: '싫어요', value: 1 },
];

const isTaste = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

class TasteRegister extends React.Component {
  static navigationOptions = {
    header: null,
  };

  defaultScrollViewProps = {
    scrollEnabled: false,
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };

  onPrevStep = () => {
    console.log('called previous step');
  };
  onNextStep = () => {
    console.log('called next step');
  };
  onSubmitSteps = () => {
    console.log('called on submit step.');
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
                    label="좋아요"
                    onNext={this.onNextStep}
                    scrollViewProps={this.defaultScrollViewProps}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                  >
                    <Block flex={1} style={{ alignItems: 'center' }}>
                      <Block style={{ marginTop: 10 }}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginTop: 10,
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
                            width: width - theme.SIZES.BASE * 6,
                            height: 200,
                          }}
                        />
                      </Block>
                      <Block flex={1} center style={styles.likeContainer}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginBottom: Platform.OS === 'android' ? 20 : 15,
                          }}
                          color="#333"
                          size={15}
                        >
                          레시피가 마음에 들었나요?
                        </Text>
                        <SwitchSelector
                          options={isLike}
                          initial={1}
                          fontSize={15}
                          textColor="#f18d46"
                          textStyle={{ fontFamily: 'montserrat-regular' }}
                          selectedTextStyle={{ fontFamily: 'montserrat-regular' }}
                          selectedColor="white"
                          buttonColor="#f18d46"
                          borderColor="#f18d46"
                          hasPadding
                          onPress={(value) => {
                            console.log(`Call onPress with value: ${value}`);
                          }}
                        />
                      </Block>
                    </Block>
                  </ProgressStep>
                  <ProgressStep
                    label="맛"
                    onPrevious={this.onPrevStep}
                    onSubmit={this.onSubmitSteps}
                    scrollViewProps={this.defaultScrollViewProps}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                  >
                    <Block>
                      <Block center style={styles.tasteContainer}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginBottom: Platform.OS === 'android' ? 10 : 15,
                          }}
                          color="#333"
                          size={13}
                        >
                          매운 맛
                        </Text>
                        <SwitchSelector
                          options={isTaste}
                          initial={2}
                          fontSize={15}
                          textColor="#f18d46"
                          selectedColor="white"
                          buttonColor="#f18d46"
                          borderColor="#f18d46"
                          hasPadding
                          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                        />
                      </Block>
                      <Block center style={styles.tasteContainer}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginBottom: Platform.OS === 'android' ? 10 : 15,
                          }}
                          color="#333"
                          size={13}
                        >
                          짠 맛
                        </Text>
                        <SwitchSelector
                          options={isTaste}
                          initial={2}
                          fontSize={15}
                          textColor="#f18d46"
                          selectedColor="white"
                          buttonColor="#f18d46"
                          borderColor="#f18d46"
                          hasPadding
                          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                        />
                      </Block>
                      <Block center style={styles.tasteContainer}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginBottom: Platform.OS === 'android' ? 10 : 15,
                          }}
                          color="#333"
                          size={13}
                        >
                          단 맛
                        </Text>
                        <SwitchSelector
                          options={isTaste}
                          initial={2}
                          fontSize={15}
                          textColor="#f18d46"
                          selectedColor="white"
                          buttonColor="#f18d46"
                          borderColor="#f18d46"
                          hasPadding
                          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                        />
                      </Block>
                      <Block center style={styles.tasteContainer}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginBottom: Platform.OS === 'android' ? 10 : 15,
                          }}
                          color="#333"
                          size={13}
                        >
                          신 맛
                        </Text>
                        <SwitchSelector
                          options={isTaste}
                          initial={2}
                          fontSize={15}
                          textColor="#f18d46"
                          selectedColor="white"
                          buttonColor="#f18d46"
                          borderColor="#f18d46"
                          hasPadding
                          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                        />
                      </Block>
                      <Block center style={styles.tasteContainer}>
                        <Text
                          style={{
                            fontFamily: 'montserrat-bold',
                            textAlign: 'center',
                            marginBottom: Platform.OS === 'android' ? 10 : 15,
                          }}
                          color="#333"
                          size={13}
                        >
                          쓴 맛
                        </Text>
                        <SwitchSelector
                          options={isTaste}
                          initial={2}
                          fontSize={15}
                          textColor="#f18d46"
                          selectedColor="white"
                          buttonColor="#f18d46"
                          borderColor="#f18d46"
                          hasPadding
                          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                        />
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
  tasteContainer: {
    width: width * 0.7,
    marginBottom: 10,
  },
  likeContainer: {
    width: width * 0.7,
    marginTop: Platform.OS === 'android' ? 30 : 40,
  },
});

export default TasteRegister;
