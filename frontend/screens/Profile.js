import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
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
      recipeSize: 0,
      recipeList: [],
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
        const rList = [];
        result.data.recipeList.forEach((el) => {
          rList.push({
            rId: el.recipeId,
            title: el.cuisine,
            description: el.description,
            image: el.image,
          });
        });
        const sList = [];
        result.data.scrapList.forEach((el) => {
          sList.push({
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
            recipeSize: result.data.recipeSize,
            userId: result.data.userId,
            recipeList: rList,
            scrapList: sList,
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

  onDelete = () => {
    Alert.alert(                    
      "삭제하시겠습니까?", " ",                                    
      [                             
        {
          text: "취소",                               
          style: "cancel"
        },
        { text: "네", onPress: () => ''}
      ],
      { cancelable: false }
    );
  }

  Recipe = () => {
    const { navigation } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
          <Block row space="between" style={{ flexWrap: 'wrap' }}>
            {this.state.Info.recipeList.map((el, idx) => (
              <TouchableWithoutFeedback
                key={idx}
                onPress={() => navigation.navigate('Pro', { id: el.rId })}
              >
                <Image source={{ uri: el.image }} resizeMode="cover" style={styles.thumb} />
              </TouchableWithoutFeedback>
            ))}
          </Block>
        </Block>
      </ScrollView>
    );
  };

  Scrap = () => {
    const { navigation } = this.props;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
          <Block center>
            {this.state.Info.scrapList.map((el, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate('Pro', { id: el.rId })}
              >
                <Block flex card center shadow style={styles.category}>
                  <ImageBackground
                    resizeMode="cover"
                    source={{ uri: el.image }}
                    style={[
                      styles.imageBlock,
                      { width: width - theme.SIZES.BASE * 5, height: 160 },
                    ]}
                    imageStyle={{
                      width: width - theme.SIZES.BASE * 5,
                      height: 160,
                    }}
                  >
                    <Block style={styles.categoryTitle}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 13,
                          fontFamily: 'montserrat-bold',
                          lineHeight: 25,
                          zIndex: 2,
                          color: 'white',
                          paddingHorizontal: 15,
                        }}
                      >
                        {el.title.includes(']')
                          ? el.title.substr(0, el.title.indexOf(']') + 1)
                          : el.title}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 15,
                          fontFamily: 'montserrat-bold',
                          lineHeight: 25,
                          zIndex: 2,
                          color: 'white',
                          paddingHorizontal: 15,
                        }}
                      >
                        {el.title.includes(']')
                          ? el.title.substr(el.title.indexOf(']') + 2).trim().length > 26
                            ? el.title
                                .substr(el.title.indexOf(']') + 2)
                                .trim()
                                .substr(0, 26) + ' ⋯'
                            : el.title.substr(el.title.indexOf(']') + 2).trim()
                          : el.title}
                      </Text>
                    </Block>
                  </ImageBackground>
                </Block>
              </TouchableWithoutFeedback>
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
                <Block
                  center
                  style={{ top: Platform.OS === 'android' ? height * 0.1 : height * 0.135 }}
                >
                  <Image source={{ uri: this.state.googleInfo.img }} style={styles.avatar} />
                </Block>
                <Block style={{ top: Platform.OS === 'android' ? height * 0.1 : height * 0.135 }}>
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
                          이용완료
                        </Text>
                      </Block>
                      <Block center>
                        <Text
                          color="white"
                          size={17}
                          style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                        >
                          {this.state.Info.recipeSize}
                        </Text>
                        <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                          레시피
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
                values={['레시피', '스크랩']}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                activeTabStyle={styles.activeTabStyle}
                tabTextStyle={{ color: '#474747', fontFamily: 'montserrat-bold' }}
                borderRadius={15}
                height={50}
              />
            </Block>
            <Block style={{ marginTop: 20 }}>
              {this.state.selectedIndex === 0 && this.Recipe(this)}
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
    width: Platform.OS === 'android' ? andImg : iosImg,
    height: Platform.OS === 'android' ? andImg : iosImg,
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
    marginTop: Platform.OS === 'android' ? height * 0.04 : height * 0.01,
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
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 3,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
});

export default Profile;
