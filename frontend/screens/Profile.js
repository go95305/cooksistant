import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
} from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Card } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import firebase from 'firebase';
import axios from 'axios';

const { width, height } = Dimensions.get('screen');

const iosImg = (width - 48 - 32) / 3;
const andImg = (width - 48 - 32) / 2.5;

class Profile extends React.Component {
  state = {
    refreshing: false,
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
    this.getRecipeScrapList();
  };

  getRecipeScrapList = () => {
    const user = firebase.auth().currentUser;
    this.setState({
      uid: user.uid,
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
            id: el.recipeId,
            title: el.cuisine,
            description: el.description,
            image: el.image,
            isMy: true,
            isMyRecipe: true,
            cta: '레시피 보러가기',
          });
        });
        const sList = [];
        result.data.scrapList.forEach((el) => {
          sList.push({
            id: el.recipeId,
            title: el.cuisine,
            description: el.description,
            image: el.image,
            isMy: true,
            isMyRecipe: false,
            cta: '레시피 보러가기',
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
        this.setState({ refreshing: false });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getRecipeScrapList();
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  Recipe = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
          <Block center style={{ width: width * 0.85 }}>
            {this.state.Info.recipeSize === 0 ? (
              <Block flex row>
                <Card item={{ title: '아직 등록한 레시피가 없어요.', image: null, id: 0 }} full/>
              </Block>
            ) : (
              this.state.Info.recipeList.map(
                (el, i) =>
                  i % 2 == 0 && (
                    <Block flex row key={i}>
                      <Card
                        item={this.state.Info.recipeList[i]}
                        style={{ marginRight: theme.SIZES.BASE }}
                      />
                      {Number(i + 1) < this.state.Info.recipeSize ? (
                        <Card item={this.state.Info.recipeList[Number(i + 1)]} />
                      ) : (
                        <Card item={{ title: '', image: null, id: 0 }} />
                      )}
                    </Block>
                  )
              )
            )}
          </Block>
        </Block>
      </ScrollView>
    );
  };

  Scrap = () => {
    return (
      <Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
            <Block center style={{ width: width * 0.85 }}>
              {this.state.Info.scrapSize === 0 ? (
                <Block flex row>
                  <Card item={{ title: '아직 스크랩한 레시피가 없어요.', image: null, id: 0 }} horizontal/>
                </Block>
              ) : (
                this.state.Info.scrapList.map(
                  (el, i) =>
                    i % 2 == 0 && (
                      <Block flex row key={i}>
                        <Card
                          item={this.state.Info.scrapList[i]}
                          style={{ marginRight: theme.SIZES.BASE }}
                        />
                        {Number(i + 1) < this.state.Info.scrapSize ? (
                          <Card item={this.state.Info.scrapList[Number(i + 1)]} />
                        ) : (
                          <Card item={{ title: '', image: null, id: 0 }} />
                        )}
                      </Block>
                    )
                )
              )}
            </Block>
          </Block>
        </ScrollView>
      </Block>
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
                  <Block center row>
                    <Text
                      style={{
                        marginTop: 15,
                        fontFamily: 'montserrat-bold',
                        marginBottom: theme.SIZES.BASE / 2,
                        marginRight: 10,
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
  avatar: {
    width: Platform.OS === 'android' ? andImg : iosImg,
    height: Platform.OS === 'android' ? andImg : iosImg,
    borderRadius: Platform.OS === 'android' ? 55 : 50,
    borderWidth: 0,
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
});

export default Profile;
