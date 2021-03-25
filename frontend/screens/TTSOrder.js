import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  View,
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class TTSOrder extends React.Component {
  render() {
    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.2} middle>
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        textAlign: 'center',
                      }}
                      color="#333"
                      size={25}
                      bold
                    >
                      가지 볶음
                    </Text>
                  </Block>

                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block middle>
                          <Image style={styles.photo} source={Images.cutEggplant} />
                        </Block>
                        <Block middle>
                          <View style={styles.MainContainer}>
                            <Text
                              style={{
                                fontFamily: 'montserrat-regular',
                                textAlign: 'center',
                                padding: 15,
                                margin: 10,
                              }}
                              color="#333"
                              size={17}
                            >
                              1. 먼저 가지를 먹기 좋게 썰어주세요! 저처럼 동글하게 썰어도 좋고,
                              손가락만하게 썰어도 좋아요 :)
                            </Text>
                          </View>
                        </Block>
                        <Block center>
                          <Button color="primary" round style={styles.createButton}>
                            <Text color={nowTheme.COLORS.WHITE} size={30}>
                              <Image center style={{ height: 20, width: 10 }} source={Images.mic} />
                            </Text>
                          </Button>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
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

  createButton: {
    width: width * 0.5,
    marginTop: 10,
    marginBottom: 30,
  },

  photo: {
    borderRadius: 20,
    height: 200,
    width: 250,
  },
  MainContainer: {
    justifyContent: 'center',
    margin: 20,
  },
});

export default TTSOrder;
