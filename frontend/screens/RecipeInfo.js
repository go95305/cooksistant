import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import Hr from 'react-native-hr-component';
const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

const RecipeInfo = () => {
  return (
    <Block
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Block flex={0.35}>
        <ImageBackground
          source={Images.food1}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
              <Block style={{ top: height * 0.22 }}>
                <Block left>
                  <Text
                    style={{
                      marginTop: 12,
                      fontFamily: 'montserrat-bold',
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: '900',
                      fontSize: 26,
                    }}
                    color="#ffffff"
                  >
                    레시피
                  </Text>
                </Block>
                <Block style={styles.info}>
                  <Block row>
                    <Text
                      color="black"
                      size={15}
                      style={{ marginBottom: 4, fontFamily: 'montserrat-regular' }}
                    >
                      2인분
                    </Text>
                    <Text> l </Text>
                    <Text
                      color="black"
                      size={15}
                      style={{ marginBottom: 4, fontFamily: 'montserrat-regular' }}
                    >
                      15분 이내
                    </Text>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>

      <Block flex={0.85} style={{ padding: theme.SIZES.BASE, marginTop: 60 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={{ marginTop: 20 }}>
            <Block middle>
              <Text
                size={16}
                muted
                style={{
                  textAlign: 'center',
                  fontFamily: 'montserrat-regular',
                  zIndex: 2,
                  lineHeight: 25,
                  color: '#2c2c2c',
                  fontWeight: 'bold',
                  fontSize: 15,
                  paddingHorizontal: 15,
                }}
              >
                가지는 장도 튼튼하게 해주고, 피로회복에도 효과가 뛰어나다고 해요!! 이렇게 좋은
                먹거리인 ‘가지’로 간단하지만 정말 맛있는 가지볶음을 해보아요 :)
              </Text>
              <Hr />
            </Block>
            <Text
              style={{
                color: '#2c2c2c',
                fontWeight: 'bold',
                fontSize: 19,
                fontFamily: 'montserrat-bold',
                marginTop: 15,
                marginBottom: 30,
                zIndex: 2,
              }}
            >
              재료
            </Text>
          </Block>
          <Block right>
            <Button
              style={{ width: 90, height: 44, marginHorizontal: 10, elevation: 0 }}
              textStyle={{ fontSize: 15, color: 'white' }}
              color="Primary"
              round
            >
              요리시작
            </Button>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1,
  },
  profileBackground: {
    width,
    height: height * 0.35,
  },
  info: {
    // marginTop: 10,
    // paddingHorizontal: 10,
    //height: height * 0.2,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80,
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5,
  },
});

export default RecipeInfo;
