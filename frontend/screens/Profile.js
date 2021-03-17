import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import SegmentControl from 'react-native-segment-control';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme, tabs } from '../constants';
import { HeaderHeight } from '../constants/utils';

const { width, height } = Dimensions.get('screen');
let tmp = 0;
  if(height < 800){
    tmp = 35;
  }
const ImgSize = (width - 48 - 32) / 3;
const RecipeImg = (width - 48 - 32) / 2;

const Taste = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.segmentContainer}>
      <Block middle style={{justifyContent: 'flex-start'}}>
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
const Recipe = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.segmentContainer}>
      <Block
        row
        style={{paddingVertical: 10, paddingHorizontal: 15}}
        space="between"
      >
        <Text bold size={20} color="#2c2c2c" style={{ marginTop: 5, fontFamily: 'montserrat-bold' }}>
          Recipe
        </Text>
        <Button
          small
          color="transparent"
          textStyle={{ color: nowTheme.COLORS.PRIMARY, fontSize: 15, fontFamily: 'montserrat-regular' }}
        >
          View all
        </Button>
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
const Scrap = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.segmentContainer}>
      <Block
        style={{paddingVertical: 10, paddingHorizontal: 15}}
        space="between"
      >
        <Text bold size={20} color="#2c2c2c" style={{ marginTop: 5,marginBottom: 5, fontFamily: 'montserrat-bold' }}>
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

const segments = [
  {
    title: '취향',
    view: Taste,
  },
  {
    title: '레시피',
    view: Recipe,
  },
  {
    title: '스크랩',
    view: Scrap,
  },
];

const Profile = () => {

  return (
    <Block
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Block flex={2}>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block>
            <Block style={{position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 50 }}>
              <Block middle style={{ top: height * 0.125 - tmp }}>
                <Image source={Images.ProfilePicture} style={styles.avatar} />
              </Block>
              <Block style={{ top: height * 0.125 -tmp }}>
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

      <Block flex={3} style={{ padding: theme.SIZES.BASE, marginTop: '15%' }}>
        <Block>
          <SegmentControl segments={segments} />
        </Block>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height: '40%',
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.4,
  },
  info: {
    marginTop: 16,
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
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
  segmentContainer: {
    height: height * 0.42 - tmp,
    marginTop: 15,
  },
})

export default Profile;
