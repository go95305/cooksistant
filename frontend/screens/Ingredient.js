import React, { Component } from 'react';
//import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import TagInput from 'react-native-tags-input';
import { MaterialIcons } from '@expo/vector-icons';
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
      tags: {
        tag: '',
        tagsArray: [],
      },
      tagsColor: '#f18d46',
      tagsText: '#f18d46',
    };
  }

  updateTagState = (state) => {
    this.setState({
      tags: state,
    });
  };

  render() {
    const { navigation } = this.props;
    return (
      <DismissKeyboard>
        <Block middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex={1} middle>
              <Block style={styles.registerContainer}>
                <Block flex={0.2} middle>
                  <Text
                    style={{
                      fontFamily: 'montserrat-regular',
                      textAlign: 'center',
                    }}
                    color="#333"
                    size={18}
                  >
                    재료를 등록해주세요 :)
                  </Text>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center>
                    <TagInput
                      updateState={this.updateTagState}
                      tags={this.state.tags}
                      placeholder="재료 추가"
                      label="정확한 재료를 입력해주세요."
                      labelStyle={{
                        color: '#f18d46',
                        fontSize: 13,
                        fontFamily: 'montserrat-regular',
                      }}
                      leftElement={
                        <Icon
                          size={16}
                          color={theme.COLORS.MUTED}
                          name="zoom-bold2x"
                          family="NowExtra"
                        />
                      }
                      leftElementContainerStyle={{ marginLeft: 5 }}
                      containerStyle={{ width: width * 0.85 }}
                      inputContainerStyle={[styles.textInput, { backgroundColor: '#fff' }]}
                      inputStyle={{
                        color: '#8c8c8c',
                        fontSize: 16,
                        fontFamily: 'montserrat-regular',
                      }}
                      deleteElement={
                        <MaterialIcons name="highlight-remove" size={20} color="white" />
                      }
                      deleteIconStyles={{ marginLeft: 20 }}
                      autoCorrect={false}
                      tagStyle={styles.tag}
                      tagTextStyle={styles.tagText}
                      keysForTag={', '}
                    />
                  </Block>
                </Block>
                <Block flex={0.3} center>
                  <Button color="primary" round style={styles.createButton}>
                    <Text
                      style={{ fontFamily: 'montserrat-bold' }}
                      size={14}
                      color={nowTheme.COLORS.WHITE}
                      onPress={() =>
                        this.state.tags.tagsArray.length === 0
                          ? Alert.alert("재료를 등록해주세요.")
                          : navigation.navigate('RecipeList')
                        //navigation.navigate('RecipeList')
                      }
                    >
                      있는 재료로 레시피 추천받기
                    </Text>
                  </Button>
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
  search: {
    height: 45,
    width: width * 0.7,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
  },
  createButton: {
    width: width * 0.6,
    marginTop: 25,
    marginBottom: 40,
  },
  textInput: {
    height: 45,
    borderColor: '#f18d46',
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 25,
    padding: 3,
  },
  tag: {
    height: 42,
    backgroundColor: '#f18d46',
    borderColor: '#f18d46',
    borderRadius: 25,
  },
  tagText: {
    color: '#fff',
    fontFamily: 'montserrat-bold',
  },
});

export default Ingredient;

