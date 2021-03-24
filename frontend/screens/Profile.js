import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme, tabs } from '../constants';
import { HeaderHeight } from '../constants/utils';

const { width, height } = Dimensions.get('screen');
let and = 0,
  ios = 0;
if (height < 800) {
  and = 35;
} else {
  ios = 15;
}

const ImgSize = (width - 48 - 32) / 3;
const RecipeImg = (width - 48 - 32) / 2;

const Info = () => {
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
          About me
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
          An artist of considerable range, named Ryan — the name has taken by Melbourne has raised,
          Brooklyn-based Nick Murphy — writes, performs and records all of his own music.
        </Text>
      </Block>
    </ScrollView>
  );
};
const Scrap = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block style={{ paddingVertical: 10, paddingHorizontal: 15 }} space="between">
        <Text
          bold
          size={20}
          color="#2c2c2c"
          style={{ marginTop: 5, fontFamily: 'montserrat-bold' }}
        >
          Scrap
        </Text>
      </Block>

      <Block style={{ paddingBottom: -HeaderHeight * 2, paddingHorizontal: 15 }}>
        <Block row space="between" style={{ flexWrap: 'wrap' }}>
          {Images.Viewed.map((img, imgIndex) => (
            <Image source={img} key={`viewed-${img}`} resizeMode="cover" style={styles.thumb} />
          ))}
        </Block>
      </Block>
    </ScrollView>
  );
};

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };

  render() {
    const { navigation } = this.props;
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
                <Block middle style={{ top: height > 800 ? height * 0.13 : height * 0.09 }}>
                  <Image source={Images.ProfilePicture} style={styles.avatar} />
                </Block>
                <Block style={{ top: height > 800 ? height * 0.13 : height * 0.09 }}>
                  <Block middle>
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
                      사용자
                    </Text>
                  </Block>
                  <Block style={styles.info}>
                    <Block row space="around">
                      <Block middle>
                        <Text
                          color="white"
                          size={18}
                          style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                        >
                          26
                        </Text>
                        <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                          Recipe
                        </Text>
                      </Block>

                      <Block middle>
                        <Text
                          color="white"
                          size={18}
                          style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                        >
                          48
                        </Text>
                        <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                          Scrap
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
              {this.state.selectedIndex === 0 && <Info />}
              {this.state.selectedIndex === 1 && <Scrap />}
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
    marginTop: height > 800 ? 20 : 0,
    paddingHorizontal: 50,
    height: height * 0.8,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: ImgSize,
    height: ImgSize,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 3,
    marginVertical: 6,
    alignSelf: 'center',
    width: RecipeImg,
    height: RecipeImg,
  },
  // segment style
  segmentContainer: {
    width,
    height: height * 0.5 - and,
    padding: theme.SIZES.BASE,
    marginTop: and + ios,
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
