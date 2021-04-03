import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import TagInput from 'react-native-tags-input';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Icon } from '../components';
import { Images, nowTheme } from '../constants';
import firebase from 'firebase';
import axios from 'axios';

const { width, height } = Dimensions.get('screen');
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      tags: {
        tag: '',
        tagsArray: [],
      },
      suggestions: [],
      suggestionsArr: [],
      tagsColor: '#f18d46',
      tagsText: '#f18d46',
    };
  }

  componentDidMount = () => {
    const user = firebase.auth().currentUser;
    axios
      .get(`http://j4c101.p.ssafy.io:8081/user/${user.uid}`)
      .then((result) => {
        this.setState({
          userId: result.data.userId,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://j4c101.p.ssafy.io:8081/recipe/ingredient`)
      .then((result) => {
        const arrayList = [];
        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((el) => {
            arrayList.push(el);
          });
        }
        this.setState({ suggestionsArr: arrayList });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateTagState = (state) => {
    console.log(state)
    this.setState(
      {
        tags: state
      },
      () => {
        this.updateSuggestionState(state);
      }
    );
  };

  updateSuggestionState = (state) => {
    if (state.tag === '') {
      return;
    }

    let tempSuggestions = [];

    for (let i = 0; i < this.state.suggestionsArr.length; i++) {
      if (this.state.suggestionsArr[i].includes(state.tag) === true) {
        tempSuggestions.push(this.state.suggestionsArr[i]);
      }
    }
    if (tempSuggestions.length > 0) {
      this.setState({
        suggestions: tempSuggestions,
      });
    } else {
      this.setState({
        suggestions: [],
      });
    }
  };

  renderSuggestions = () => {
    if (this.state.suggestions.length > 0) {
      return this.state.suggestions.map((item, count) => {
        return (
          <Pressable key={count} onPress={() => this.onSuggestionClick(item)}>
            <Text
              style={{
                fontFamily: 'montserrat-regular',
                height: height * 0.07,
                margin: 5,
                padding: 15,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: nowTheme.COLORS.BORDER,
              }}
            >
              {item}
            </Text>
          </Pressable>
        );
      });
    } else {
      return null;
    }
  };

  onSuggestionClick = (suggestion) => {
    let state = this.state.tags;

    state.tagsArray.push(suggestion);

    this.setState({
      tags: {
        tag: '',
        tagsArray: state.tagsArray,
      },
      suggestions: [],
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
                      autoCapitalize={'none'}
                      // customElement={
                      //   <ScrollView showsVerticalScrollIndicator={false}>
                      //     <Block style={{ marginTop: 10 }}>{this.renderSuggestions()}</Block>
                      //   </ScrollView>
                      // }
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
                      autoCorrect={false}
                      deleteIconStyles={{ marginLeft: 20 }}
                      tagStyle={styles.tag}
                      tagTextStyle={styles.tagText}
                      keysForTag={', '}
                    />
                  </Block>
                </Block>
                <Block flex={0.3} center>
                  <Button
                    color="primary"
                    round
                    style={styles.createButton}
                    onPress={() =>
                      this.state.tags.tagsArray.length > 0
                        ? navigation.navigate('RecommList', {
                            userId: this.state.userId,
                            ingredients: this.state.tags.tagsArray,
                          })
                        : Alert.alert('재료를 등록해주세요.')
                    }
                  >
                    <Text
                      style={{ fontFamily: 'montserrat-bold' }}
                      size={14}
                      color={nowTheme.COLORS.WHITE}
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
    marginBottom: 10,
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
