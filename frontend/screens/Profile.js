import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Platform
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme, tabs } from '../constants';
import { HeaderHeight } from '../constants/utils';

import firebase from 'firebase';
import axios from 'axios';

const { width, height } = Dimensions.get('screen');

const iosImg = (width - 48 - 32) / 3;
const andImg = (width - 48 - 32) / 2.5;
const RecipeImg = (width - 48 - 32) / 2;

class Profile extends React.Component {
  state = {
    googleInfo: {
      nickName: null,
      email: null,
      img: null,
    },
    Info: {
      userId: 0,
      scrapSize: 0,
      recipeUsedSize: 0,
      evaluatedSize: 0,
      scrapList: [],
    },
    selectedIndex: 0,
  };

  componentDidMount = () => {
    const user = firebase.auth().currentUser;
    this.setState({
      googleInfo: {
        nickName: user.displayName,
        email: user.email,
        img: user.photoURL,
      },
    });
    axios
      .get(`http://j4c101.p.ssafy.io:8081/user/${user.uid}`)
      .then((result) => {
        const eList = [];
        result.data.scrapList.forEach((el) => {
          eList.push({
            rId: el.recipeId,
            title: el.cuisine,
            description: el.description,
            image: el.image,
          });
        });
        this.setState({
          Info: {
            scrapSize: result.data.scrapSize,
            recipeUsedSize: result.data.recipeUsedSize,
            evaluatedSize: result.data.evaluatedSize,
            userId: result.data.userId,
            scrapList: eList,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  Info = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block middle style={{ justifyContent: 'flex-start' }}>
          <Text
            style={{
              color: '#2c2c2c',
              fontWeight: 'bold',
              fontSize: 19,
              fontFamily: 'montserrat-bold',
              marginTop: 20,
              marginBottom: 30,
              zIndex: 2,
            }}
          >
            {this.state.googleInfo.nickName}
          </Text>
          <Text
            size={16}
            muted
            style={{
              textAlign: 'center',
              fontFamily: 'montserrat-regular',
              zIndex: 2,
              lineHeight: 25,
              color: '#9A9A9A',
              paddingHorizontal: 15,
            }}
          >
            {this.state.googleInfo.email}
          </Text>
          <Text
            size={16}
            muted
            style={{
              textAlign: 'center',
              fontFamily: 'montserrat-regular',
              zIndex: 2,
              lineHeight: 25,
              color: '#9A9A9A',
              paddingHorizontal: 15,
            }}
          >
            사용자의 정보를 보여주는 공간입니다.
          </Text>
        </Block>
      </ScrollView>
    );
  };

  Scrap = () => {
    const { navigation } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
          <Block row space="between" style={{ flexWrap: 'wrap' }}>
            {this.state.Info.scrapList.map((el, index) => (
              // <Block> card flex style={cardContainer}
                <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Pro')}>
                  <Image
                    source={{ uri: el.image }}
                    resizeMode="stretch"
                    style={styles.thumb}
                  />
                </TouchableWithoutFeedback>
              //</Block>
            ))}
          </Block>
        </Block>
      </ScrollView>
    );
  };

  render() {
    return (
      <Block style={styles.container}>
        <Block flex={2}>
          <ImageBackground
            source={Images.ProfileBackground}
            style={styles.profileContainer}
            imageStyle={styles.profileBackground}
          >
            <Block>
              <Block
                style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 50 }}
              >
                <Block center style={{ top: Platform.OS === 'android' ? height * 0.1: height * 0.13, }}>
                  <Image
                    source={
                      this.state.googleInfo.img != null
                        ? { uri: this.state.googleInfo.img }
                        : Images.ProfilePicture
                    }
                    style={styles.avatar}
                  />
                </Block>
                <Block style={{ top: Platform.OS === 'android' ? height * 0.1: height * 0.13, }}>
                  <Block center>
                    <Text
                      style={{
                        marginTop: 15,
                        fontFamily: 'montserrat-bold',
                        marginBottom: theme.SIZES.BASE / 2,
                        fontWeight: '900',
                        fontSize: 26,
                      }}
                      color="#ffffff"
                    >
                      {this.state.googleInfo.nickName}
                    </Text>
                  </Block>
                  <Block style={styles.info}>
                    <Block row space="between">
                      <Block center>
                        <Text
                          color="white"
                          size={17}
                          style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                        >
                          {this.state.Info.recipeUsedSize}
                        </Text>
                        <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                          이용 완료
                        </Text>
                      </Block>
                      <Block center>
                        <Text
                          color="white"
                          size={17}
                          style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                        >
                          {this.state.Info.evaluatedSize}
                        </Text>
                        <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                          평가 완료
                        </Text>
                      </Block>
                      <Block center>
                        <Text
                          color="white"
                          size={17}
                          style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                        >
                          {this.state.Info.scrapSize}
                        </Text>
                        <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                          스크랩
                        </Text>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>

        <Block flex={3}>
          <Block style={styles.segmentContainer}>
            <Block>
              <SegmentedControlTab
                values={['사용자 정보', '스크랩']}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                tabTextStyle={{ color: '#444444', fontFamily: 'montserrat-bold' }}
                borderRadius={15}
                height={50}
              />
            </Block>
            <Block style={{ marginTop: 20 }}>
              {this.state.selectedIndex === 0 && this.Info(this)}
              {this.state.selectedIndex === 1 && this.Scrap(this)}
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  profileContainer: {
    width,
    height,
    padding: 0,
  },
  profileBackground: {
    width,
    height: height * 0.4,
  },
  info: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: height * 0.8,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: Platform.OS === 'android' ? andImg: iosImg,
    height: Platform.OS === 'android' ? andImg: iosImg,
    borderRadius: Platform.OS === 'android' ? 55 : 50,
    borderWidth: 0,
  },
  thumb: {
    borderRadius: 3,
    marginVertical: 6,
    alignSelf: 'center',
    width: RecipeImg,
    height: 100,
  },
  // segment style
  segmentContainer: {
    width,
    height: height * 0.5,
    padding: theme.SIZES.BASE,
    marginTop: Platform.OS === 'android' ? height * 0.04: height * 0.01,
  },
  tabsContainerStyle: {
    height: 40,
  },
  tabStyle: {
    borderColor: '#f18d46',
  },
  activeTabStyle: {
    backgroundColor: '#f18d46',
  },
});

export default Profile;
