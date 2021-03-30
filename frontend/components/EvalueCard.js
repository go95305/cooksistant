import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

class Card extends React.Component {
  render() {
    const {
      navigation,
      item,
      horizontal,
      style,
      isEvaluColor,
      imageStyle,
      titleStyle,
    } = this.props;

    const imageStyles = [styles.horizontalImage, imageStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    const title = item.title.split(']');
    
    return (
      <Block card flex style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            item.isEvalu ? navigation.navigate('Pro', { recipe_id: item.id }) : navigation.navigate('EvalueRegister', {
              eId:item.eId,
              rId: item.rId,
              title: item.title,
              image: item.image
            });
          }}
        >
          <Block flex style={imgContainer}>
            <Image resizeMode="cover" source={{uri: item.image}}  style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            item.isEvalu ? navigation.navigate('Pro', { recipe_id: item.id }) : navigation.navigate('EvalueRegister', {
              eId:item.eId,
              recipeId: item.rId,
              title: item.title,
              image: item.image
            });
          }}
        >
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{ fontFamily: 'montserrat-bold',paddingTop: 3, paddingHorizontal: 8, lineHeight: 20, }}
                size={13}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.title.includes(']') ? title[0]+'] \n' + title[1].trim() : item.title}
              </Text>
            </Block>
            <Block row space="between">
              <Text
                style={{padding: 7 }}
                size={13}
                muted={!isEvaluColor}
                color={'#f18d46'}
                bold
              >
                {item.isEvalu ? '레시피 보러가기' : '레시피 평가하기'}
              </Text>
              {item.isEvalu ? (
                <MaterialIcons name="check-box" size={29} color="#f18d46"/>
              ) : (
                <MaterialIcons name="check-box-outline-blank" size={29} color="#f18d46" />
              )}
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
  isEvaluColor: PropTypes.string,
  imageStyle: PropTypes.any,
  isEvaluRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 120,
    marginBottom: 4,
  },
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    height: 180,
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 174,
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
    height: 200,
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
    paddingVertical: 7,
  },
});

export default withNavigation(Card);
