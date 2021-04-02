import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Block, Text, Button as GaButton } from 'galio-framework';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import InputSpinner from 'react-native-input-spinner';
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import axios from 'axios';

import { Input, Select, Button } from '../components';
import { Images, nowTheme } from '../constants';
import { Alert } from 'react-native';

const { width, height } = Dimensions.get('screen');
let stepIdx = 0;

class RecipeRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      title: '',
      desc: '',
      serving: '',
      time: '',
      image: null,
      stepIdx: 0,
      stepList: [{ image: null, stepDescription: '', level: 1 }],
      ingreList: [{ ingredientName: '', amount: '', isType: '재료' }],
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

  titleInput = (props) => {
    return <Input {...props} editable maxLength={40} />;
  };
  descInput = (props) => {
    return <Input {...props} editable maxLength={2000} />;
  };
  ingreInput = (props) => {
    return <Input {...props} editable maxLength={20} />;
  };

  onSubmit = () => {
    axios
      .post('http://j4c101.p.ssafy.io:8081/recipe/create', {
        // uid: String(this.state.userId),
        // cuisine: this.state.title,
        // description: this.state.desc,
        // serving: this.state.serving,
        // cookingTime: this.state.time,
        // level: "쉬움",
        // ingredientDTOpostList: this.state.ingreList,
        // stepDTOpostList: this.state.stepList
        cookingTime: 'string',
        cuisine: 'string',
        description: 'string',
        ingredientDTOpostList: [
          {
            amount: 'string',
            ingredientName: 'string',
            isType: 'string',
          },
        ],
        level: 'string',
        serving: 'string',
        stepDTOpostList: [
          {
            image: 'string',
            level: 0,
            stepDescription: 'string',
          },
        ],
        uid: '1',
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          Alert.alert('레시피가 등록되었습니다.');
        } 
      })
      .then(() => {
        this.props.navigation.navigate('Profile');
      })
      .catch(function (error) {
        Alert.alert('실패');
        console.log(error);
      });
  };

  ingreInputChange = (text, name, index) => {
    const list = [...this.state.ingreList];
    list[index][name] = text;
    this.setState({
      ingreList: list,
    });
  };

  ingreRemoveClick = (index) => {
    const list = [...this.state.ingreList];
    list.splice(index, 1);
    this.setState({
      ingreList: list,
    });
  };

  ingreAddClick = () => {
    const list = [...this.state.ingreList];
    const newlist = [{ ingredientName: '', amount: '', isType: '재료' }];
    this.setState({
      ingreList: list.concat(newlist),
    });
  };

  stepInputChange = (text, name, index) => {
    const list = [...this.state.stepList];
    list[index][name] = text;
    this.setState({
      stepList: list,
    });
  };

  stepRemoveClick = (index) => {
    const list = [...this.state.stepList];
    list.splice(index, 1);
    this.setState({
      stepList: list,
    });
  };

  stepAddClick = () => {
    const list = [...this.state.stepList];
    const newlist = [{ image: null, stepDescription: '', level: 1 }];
    this.setState({
      stepList: list.concat(newlist),
    });
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

    // info Image 등록
    let ImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.cancelled === true) {
        return;
      }
      this.setState({ image: pickerResult.uri });
    };

    let stepImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.cancelled === true) {
        return;
      }

      const list = [...this.state.stepList];
      list[stepIdx]['image'] = pickerResult.uri;
      this.setState({
        stepList: list,
      });
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
                    label="설명"
                    scrollViewProps={{ scrollEnabled: true }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                  >
                    <Block style={{ alignItems: 'center' }}>
                      <Block flex={1} middle style={styles.recipeContainer}>
                        <Block width={width * 0.7} style={{ marginBottom: 8 }}>
                          <Text
                            style={{
                              fontFamily: 'montserrat-regular',
                              textAlign: 'center',
                              marginBottom: Platform.OS == 'android' ? 8 : 13,
                            }}
                            color={nowTheme.COLORS.MUTED}
                            size={16}
                          >
                            나만의 레시피를 알려주세요.
                          </Text>
                          <this.titleInput
                            multiline
                            numberOfLines={4}
                            placeholder="레시피명"
                            style={styles.titleInput}
                            iconContent={
                              <MaterialIcons
                                name="create"
                                size={16}
                                color="black"
                                style={styles.inputIcons}
                              />
                            }
                            onChangeText={(text) => {
                              this.setState({ title: text });
                            }}
                          />
                        </Block>
                        <Block
                          row
                          space="between"
                          width={Platform.OS == 'android' ? width * 0.78 : width * 0.7}
                          style={{ marginBottom: 8, padding: 1 }}
                        >
                          <Block flex left>
                            <Select
                              default={'인분'}
                              color={'#f18d46'}
                              options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                              onSelect={(opt) => {
                                this.setState({ serving: opt + 1 + '인분' });
                              }}
                            />
                          </Block>
                          <Block
                            flex
                            center
                            style={{ marginLeft: Platform.OS == 'android' ? 0 : 0 }}
                          >
                            <Block row space="between">
                              <InputSpinner
                                max={60}
                                min={0}
                                step={5}
                                height={47}
                                style={{ minWidth: 130, shadowOpacity: 0, borderRadius: 11 }}
                                color={'#f18d46'}
                                skin={'round'}
                                value={this.state.time}
                                onChange={(num) => {
                                  this.setState({ time: num + '분 이내' });
                                }}
                              />
                              <Text
                                style={{
                                  fontFamily: 'montserrat-regular',
                                  textAlign: 'center',
                                  margin: 5,
                                  marginTop: 18,
                                  marginRight: 35,
                                }}
                                color={nowTheme.COLORS.MUTED}
                                size={13}
                              >
                                분 이내
                              </Text>
                            </Block>
                          </Block>
                        </Block>
                        <Block width={width * 0.7} style={{ marginBottom: 8 }}>
                          <this.descInput
                            multiline
                            numberOfLines={10}
                            placeholder="레시피 소개"
                            style={styles.descInput}
                            onChangeText={(text) => {
                              this.setState({ desc: text });
                            }}
                          />
                        </Block>
                        <Block center>
                          <ImageBackground
                            resizeMode="cover"
                            source={
                              this.state.image == null
                                ? Images.RegisterBackground
                                : { uri: this.state.image }
                            }
                            style={{
                              height: height * 0.2,
                              width: width * 0.7,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <TouchableOpacity onPress={ImagePickerAsync}>
                              <MaterialIcons name="photo-camera" size={25} color="#f18d46" />
                            </TouchableOpacity>
                          </ImageBackground>
                        </Block>
                      </Block>
                    </Block>
                  </ProgressStep>
                  <ProgressStep
                    label="재료"
                    scrollViewProps={{ scrollEnabled: true }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    onSubmit={this.onSubmit}
                  >
                    <Block flex={1} style={styles.recipeContainer}>
                      <Block row>
                        <Text
                          style={{ padding: 7, marginLeft: 20 }}
                          size={13}
                          color={'#f18d46'}
                          bold
                        >
                          재료 등록 방법
                        </Text>
                        <Feather
                          name="info"
                          size={17}
                          color={nowTheme.COLORS.PRIMARY}
                          style={{ margin: 6 }}
                        />
                      </Block>
                      {this.state.ingreList.map((el, idx) => {
                        return (
                          <Block
                            row
                            space="between"
                            key={idx}
                            width={Platform.OS == 'android' ? width * 0.4 : width * 0.7}
                            style={{ alignItems: 'center', marginLeft: 20 }}
                          >
                            <this.ingreInput
                              placeholder="재료 입력"
                              numberOfLines={1}
                              style={styles.ingreInput}
                              onChangeText={(text) => {
                                this.ingreInputChange(text, 'ingredientName', idx);
                              }}
                            />
                            <this.ingreInput
                              placeholder="계량 입력"
                              numberOfLines={1}
                              style={styles.amountInput}
                              onChangeText={(text) => {
                                this.ingreInputChange(text, 'amount', idx);
                              }}
                            />
                            {this.state.ingreList.length !== 1 && (
                              <TouchableOpacity onPress={() => this.ingreRemoveClick(idx)}>
                                <FontAwesome
                                  name="minus-circle"
                                  size={24}
                                  color={nowTheme.COLORS.PRIMARY}
                                  style={{ marginLeft: 10 }}
                                />
                              </TouchableOpacity>
                            )}
                            {this.state.ingreList.length - 1 === idx && (
                              <TouchableOpacity onPress={() => this.ingreAddClick()}>
                                <FontAwesome
                                  name="plus-circle"
                                  size={24}
                                  color={nowTheme.COLORS.PRIMARY}
                                  style={{ marginLeft: 10 }}
                                />
                              </TouchableOpacity>
                            )}
                          </Block>
                        );
                      })}
                    </Block>
                  </ProgressStep>
                  <ProgressStep
                    label="과정"
                    scrollViewProps={{ scrollEnabled: true }}
                    nextBtnTextStyle={buttonTextStyle}
                    previousBtnTextStyle={buttonTextStyle}
                    onSubmit={this.onSubmit}
                  >
                    <Block flex={1} style={styles.recipeContainer}>
                      <Block row>
                        <Text
                          style={{ padding: 7, marginLeft: 45 }}
                          size={13}
                          color={'#f18d46'}
                          bold
                        >
                          요리과정 등록 방법
                        </Text>
                        <Feather
                          name="info"
                          size={17}
                          color={nowTheme.COLORS.PRIMARY}
                          style={{ margin: 6 }}
                        />
                      </Block>
                      {this.state.stepList.map((el, idx) => {
                        return (
                          <Block
                            center
                            key={idx}
                            width={width * 0.7}
                            style={{ alignItems: 'center', marginLeft: 20 }}
                          >
                            <ImageBackground
                              resizeMode="cover"
                              source={
                                el.image == null ? Images.RegisterBackground : { uri: el.image }
                              }
                              style={{
                                height: height * 0.2,
                                width: width * 0.7,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <TouchableOpacity onPress={((stepIdx = idx), stepImagePickerAsync)}>
                                <MaterialIcons name="photo-camera" size={25} color="#f18d46" />
                              </TouchableOpacity>
                            </ImageBackground>

                            <this.descInput
                              placeholder="과정 입력"
                              numberOfLines={10}
                              style={styles.stepInput}
                              onChangeText={(text) => {
                                this.stepInputChange(text, 'stepDescription', idx);
                              }}
                            />
                            <Block row style={{ marginBottom: 10 }}>
                              {this.state.stepList.length !== 1 && (
                                <TouchableOpacity onPress={() => this.stepRemoveClick(idx)}>
                                  <FontAwesome
                                    name="minus-circle"
                                    size={24}
                                    color={nowTheme.COLORS.PRIMARY}
                                    style={{ marginLeft: 5 }}
                                  />
                                </TouchableOpacity>
                              )}
                              {this.state.stepList.length - 1 === idx && (
                                <TouchableOpacity onPress={() => this.stepAddClick()}>
                                  <FontAwesome
                                    name="plus-circle"
                                    size={24}
                                    color={nowTheme.COLORS.PRIMARY}
                                    style={{ marginLeft: 5 }}
                                  />
                                </TouchableOpacity>
                              )}
                            </Block>
                          </Block>
                        );
                      })}
                      <Text style={{ marginTop: 20 }}>{JSON.stringify(this.state)}</Text>
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
  recipeContainer: {
    marginTop: 25,
  },
  titleInput: {
    height: 80,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 20,
  },
  descInput: {
    height: 180,
    alignItems: 'flex-start',
    paddingTop: Platform.OS == 'android' ? 0 : 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 20,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  ingreInput: {
    height: 50,
    width: Platform.OS == 'android' ? 100 : 110,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 20,
  },
  amountInput: {
    height: 50,
    width: Platform.OS == 'android' ? 100 : 110,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 20,
    marginLeft: Platform.OS == 'android' ? 5 : 10,
  },
  stepInput: {
    height: 130,
    alignItems: 'flex-start',
    paddingTop: Platform.OS == 'android' ? 0 : 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 20,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 15,
    marginBottom: 40,
  },
});

export default RecipeRegister;
