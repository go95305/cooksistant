import React, { Component} from 'react';
//import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';


import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {View, Image } from "react-native";


import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);


class Ingredient extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
     hasCameraPermission: null,
     image: null,
    }
   }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  
  _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
     allowsEditing: true,
     aspect: [4, 3]
    });
    if (!result.cancelled) {
     this.setState({ image: result.uri });
    }
   }
   
  render() {
    const { image, hasCameraPermission } = this.state;
  if (hasCameraPermission === null) {
   return <View />
  }
  else if (hasCameraPermission === false) {
   return <Text>Access to camera has been denied.</Text>;
  }
  else {
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
                      size={18}
                    >
                      재료 검색
                    </Text>
                  </Block>

                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                            <View style={{ flex: 1 }}>
                              <View style={styles.activeImageContainer}>
                                {image ? (
                                <Image source={{ uri: image }} style={{ flex: 1 }} />
                                ) : (
                                <View />
                                )}
                              </View>
                              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                              <Button 
                                onPress={this._getPhotoLibrary.bind(this)} 
                                title="Photo Picker Screen!"
                              >
                                <Text>사진 등록</Text>
                              </Button>
                              </View>
                            </View>



                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                           
                          </Block>






                          <Block>
                            <Text
                              style={{
                                color: '#2c2c2c',
                                fontWeight: 'bold',
                                fontSize: 19,
                                fontFamily: 'montserrat-bold',
                                marginTop: 10,
                                marginBottom: 10,
                                zIndex: 2,
                              }}
                            >
                              재료
                            </Text>

                            <Block row>
                              <Button
                                style={{ width: '42%', height: 44, marginHorizontal: 10, elevation: 0 }}
                                textStyle={{ fontSize: 15, color: 'white' }}
                                color="Primary"
                                round
                              >
                                하늘
                              </Button>
                              <Button
                                right
                                style={{ width: '42%', height: 44, marginHorizontal: 20, elevation: 0 }}
                                textStyle={{ fontSize: 15, color: 'white' }}
                                color="Primary"
                                round
                              >
                                부히
                              </Button>
                            </Block>
                            <Block row>
                              <Button
                                style={{ width: '42%', height: 44, marginHorizontal: 10, elevation: 0 }}
                                textStyle={{ fontSize: 15, color: 'white' }}
                                color="Primary"
                                round
                              >
                                지현
                              </Button>
                              <Button
                                right
                                style={{ width: '42%', height: 44, marginHorizontal: 20, elevation: 0 }}
                                textStyle={{ fontSize: 15, color: 'white' }}
                                color="Primary"
                                round
                              >
                                유창
                              </Button>
                            </Block>
                           
                          </Block>
                        </Block>
                        <Block center>
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
    marginBottom: 40,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  activeImageContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
    backgroundColor: "#eee",
    borderBottomWidth: 0.5,
    borderColor: "#fff"
   },
});

export default Ingredient;
