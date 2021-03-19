import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const options = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

class TasteRegister extends React.Component {
  render() {
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
                <Block flex space="evenly">
                  <Block flex={1.5} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center',
                        marginBottom: 15,
                      }}
                      color="#333"
                      size={19}
                    >
                      사용자의 취향이 궁금해요 :)
                    </Text>
                    <Block
                      center
                      style={{
                        borderColor: '#f2f2f2',
                        width: '85%',
                        borderWidth: StyleSheet.hairlineWidth,
                      }}
                    />
                  </Block>
                  <Block flex={6} marginTop={height < 800 ? -10 : -5}>
                    <Block center style={styles.tasteContainer}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          textAlign: 'center',
                          marginBottom:  Platform.OS === 'android' ? 10 : 15,
                        }}
                        color="#333"
                        size={15}
                      >
                        매운 맛
                      </Text>
                      <SwitchSelector
                        options={options}
                        initial={2}
                        fontSize={17}
                        textColor='#f18d46'
                        selectedColor='white'
                        buttonColor='#f18d46'
                        borderColor='#f18d46'
                        hasPadding
                        onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                      />
                    </Block>
                    <Block center style={styles.tasteContainer}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          textAlign: 'center',
                          marginBottom:  Platform.OS === 'android' ? 10 : 15,
                        }}
                        color="#333"
                        size={15}
                      >
                        짠 맛
                      </Text>
                      <SwitchSelector
                        options={options}
                        initial={2}
                        fontSize={17}
                        textColor='#f18d46'
                        selectedColor='white'
                        buttonColor='#f18d46'
                        borderColor='#f18d46'
                        hasPadding
                        onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                      />
                    </Block>
                    <Block center style={styles.tasteContainer}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          textAlign: 'center',
                          marginBottom:  Platform.OS === 'android' ? 10 : 15,
                        }}
                        color="#333"
                        size={15}
                      >
                        단 맛
                      </Text>
                      <SwitchSelector
                        options={options}
                        initial={2}
                        fontSize={17}
                        textColor='#f18d46'
                        selectedColor='white'
                        buttonColor='#f18d46'
                        borderColor='#f18d46'
                        hasPadding
                        onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                      />
                    </Block>
                    <Block center style={styles.tasteContainer}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          textAlign: 'center',
                          marginBottom:  Platform.OS === 'android' ? 10 : 15,
                        }}
                        color="#333"
                        size={15}
                      >
                        신 맛
                      </Text>
                      <SwitchSelector
                        options={options}
                        initial={2}
                        fontSize={17}
                        textColor='#f18d46'
                        selectedColor='white'
                        buttonColor='#f18d46'
                        borderColor='#f18d46'
                        hasPadding
                        onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                      />
                    </Block>
                    <Block center style={styles.tasteContainer}>
                      <Text
                        style={{
                          fontFamily: 'montserrat-bold',
                          textAlign: 'center',
                          marginBottom:  Platform.OS === 'android' ? 10 : 15,
                        }}
                        color="#333"
                        size={15}
                      >
                        쓴 맛
                      </Text>
                      <SwitchSelector
                        options={options}
                        initial={2}
                        fontSize={17}
                        textColor='#f18d46'
                        selectedColor='white'
                        buttonColor='#f18d46'
                        borderColor='#f18d46'
                        hasPadding
                        onPress={(value) => console.log(`Call onPress with value: ${value}`)}
                      />
                    </Block>
                  </Block>
                  <Block flex={1} middle space="between">
                    <Block center>
                      <Button color="primary" round style={styles.createButton}>
                        <Text
                          style={{ fontFamily: 'montserrat-bold' }}
                          size={14}
                          color={nowTheme.COLORS.WHITE}
                        >
                          등록하기
                        </Text>
                      </Button>
                    </Block>
                  </Block>
                </Block>
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
    height: height < 812 ? height * 0.8 : height * 0.8,
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
    marginBottom: Platform.OS === 'android' ? 15 : 20,
  },
  createButton: {
    width: width * 0.5,
  },
});

export default TasteRegister;
