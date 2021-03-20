import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
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

const options = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
];

const result = [];

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
                  <Block>
                    <Text
                      style={{
                        fontFamily: 'montserrat-regular',
                        textAlign: 'center',
                        marginTop: Platform.OS === 'android' ? 25 : 20,
                        marginBottom: 10,
                      }}
                      color="#333"
                      size={19}
                    >
                      레시피의 맛은 어땠나요?
                    </Text>
                  </Block>
                  <Block
                    center
                    style={{
                      borderColor: '#f2f2f2',
                      width: '85%',
                      marginBottom: 10,
                      borderWidth: StyleSheet.hairlineWidth,
                    }}
                  />
                  <Block center>
                    <Image
                      source={recipe.image}
                      style={{
                        width: width - theme.SIZES.BASE * 7,
                        height: 180,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        textAlign: 'center',
                        marginTop: 15,
                        marginBottom: 15,
                      }}
                      color="#333"
                      size={19}
                    >
                      {recipe.title}
                    </Text>
                  </Block>
                  <Block>
                      
                  </Block>
                  <Block flex={1} center >
                      <Button color="primary" round style={styles.createButton}>
                        <Text
                          style={{ fontFamily: 'montserrat-bold' }}
                          size={14}
                          color={nowTheme.COLORS.WHITE}
                        >
                          다음 단계
                        </Text>
                      </Button>
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
