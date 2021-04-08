import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import Hr from 'react-native-hr-component';
const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class IngredientInfo extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      ctaColor,
      imageStyle,
      ctaRight,
      titleStyle,
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Block flex={0.35}>
              <ImageBackground
                source={item.image}
                style={styles.profileContainer}
                imageStyle={styles.profileBackground}
              >
                <Block
                  style={{
                    top: height * 0.22,
                    position: 'absolute',
                    width: width,
                    zIndex: 5,
                    paddingHorizontal: 20,
                  }}
                >
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
                      {item.title}
                    </Text>
                  </Block>
                  <Block>
                    <Block row>
                      <Text
                        color="black"
                        size={15}
                        style={{ marginBottom: 4, fontFamily: 'montserrat-regular' }}
                      >
                        {item.serving}
                      </Text>
                      <Text> l </Text>
                      <Text
                        color="black"
                        size={15}
                        style={{ marginBottom: 4, fontFamily: 'montserrat-regular' }}
                      >
                        {item.time}
                      </Text>
                    </Block>
                  </Block>
                  <Block middle>
                    <Text
                      size={16}
                      muted
                      style={{
                        textAlign: 'center',
                        color: '#2c2c2c',
                        fontWeight: 'bold',
                        fontSize: 15,
                        paddingHorizontal: 15,
                        paddingTop: 30,
                        paddingBottom: 10,
                      }}
                    >
                      {item.content}
                    </Text>
                    <Hr />
                  </Block>
                  <Block flex={0.85}>
                    <Block>
                      <Text
                        style={{
                          color: '#2c2c2c',
                          fontWeight: 'bold',
                          fontSize: 19,
                          fontFamily: 'montserrat-bold',
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
                          {item.ingredients}
                        </Button>
                      </Block>

                      <Text
                        style={{
                          color: '#2c2c2c',
                          fontWeight: 'bold',
                          fontSize: 19,
                          fontFamily: 'montserrat-bold',
                          marginBottom: 10,
                          zIndex: 2,
                        }}
                      >
                        양념장
                      </Text>

                      <Block row>
                        <Button
                          style={{ width: '42%', height: 44, marginHorizontal: 10, elevation: 0 }}
                          textStyle={{ fontSize: 15, color: 'white' }}
                          color="Primary"
                          round
                        >
                          {item.source}
                        </Button>
                      </Block>

                      <Hr />
                    </Block>
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
                </Block>
              </ImageBackground>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

IngredientInfo.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  //   imageStyle: PropTypes.any,
  //   ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
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

export default withNavigation(IngredientInfo);
