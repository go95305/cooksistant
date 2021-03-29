import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { STTButton, Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';








const { width, height } = Dimensions.get('screen');


const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);




class STT extends React.Component {
  
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
                        fontFamily: 'montserrat-regular',
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
                          <Image style={styles.photo} source={Images.eggplant} />
                        </Block>
                        <Block flex={0.2} middle>
                          <Text
                            style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center',
                            }}
                            color="#333"
                            size={18}
                          >
                            같이 요리해볼까요?
                          </Text>
                        </Block>
                        
                        <Block color="primary" round style={styles.createButton}>
                            
                        </Block>
                        
                        <Block center>
                          <Button color="primary" round style={styles.createButton}>
                            <Text
                              style={{ fontFamily: 'montserrat-bold' }}
                              size={14}
                              color={nowTheme.COLORS.WHITE}
                            >
                              START
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
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 30,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  photo: {
    borderRadius: 20,
    height: 230,
    width: 300,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default STT;
