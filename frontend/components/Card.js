import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import RecipeInfo from '../screens/RecipeInfo';
import RNUrlPreview from 'react-native-url-preview';
import { nowTheme } from '../constants';
const { width, height } = Dimensions.get('screen');
class Card extends React.Component {
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
    ];
    const title = item.title.split(']');
    return (
      <Block card flex style={cardContainer}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { id: item.id })}>
          <Block flex style={imgContainer}>
            <Image resizeMode="contain" center source={{ uri: item.image }} style={imageStyles} />
            {/* <RNUrlPreview text={item.image} /> */}
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Pro', { id: item.id })}>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              {/* <Text style={{ height: 0, width: 0 }}>{item.id}</Text> */}
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={height > 800 ? 15 : 12}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.title.includes(']')
                  ? title[0] +
                    ']' +
                    (title[1].trim().length > 20
                      ? title[1].trim().substr(0, 20) + ' ⋯'
                      : title[1].trim())
                  : item.title.length > 20
                  ? item.title.substr(0, 20) + ' ⋯'
                  : item.title}
              </Text>
            </Block>
            <Block right={ctaRight ? true : false}>
              <Text
                style={styles.articleButton}
                size={12}
                muted={!ctaColor}
                color={ctaColor || nowTheme.COLORS.ACTIVE}
                bold
              >
                {item.cta}
              </Text>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingBottom: 15,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    flex: 5,
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 125,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 187,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
});

export default withNavigation(Card);
