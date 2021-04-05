import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Images, nowTheme } from '../constants';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

const { width, height } = Dimensions.get('screen');

class Card extends React.Component {
  state = {
    rId: this.props.item.id,
  };

  onDelete = () => {
    console.log(this.state.rId);
    axios
      .put(`http://j4c101.p.ssafy.io:8081/recipe/delete/${this.state.rId}`)
      .then((response) => {
        if (response.status == 200) {
          Alert.alert("레시피가 삭제되었습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onCheckDelete = () => {
    Alert.alert(
      '정말 삭제하시겠습니까?',
      ' ',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        { text: '네', onPress: () => this.onDelete() },
      ],
      { cancelable: false }
    );
  };

  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
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
        <TouchableWithoutFeedback
          onPress={() => (item.id == 0 ? '' : navigation.navigate('Pro', { id: item.id }))}
        >
          <Block flex={3} style={imgContainer}>
            <Image
              resizeMode="cover"
              source={item.image == null ? Images.white : { uri: item.image }}
              style={imageStyles}
            />
          </Block>
        </TouchableWithoutFeedback>
        <Block flex={1} space="between" style={styles.cardDescription}>
          <TouchableWithoutFeedback
            onPress={() => (item.id == 0 ? '' : navigation.navigate('Pro', { id: item.id }))}
          >
            <Block flex>
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  paddingTop: 3,
                  lineHeight: 20,
                }}
                size={item.isMy ? 10.5 : 12.5}
                color="#474747"
              >
                {item.isMy
                  ? item.title
                  : item.title.includes(']')
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
          </TouchableWithoutFeedback>
          <Block row space="between" style={{ marginTop: 10 }}>
            <Block right={ctaRight ? true : false}>
              <TouchableWithoutFeedback
                onPress={() => (item.id == 0 ? '' : navigation.navigate('Pro', { id: item.id }))}
              >
                <Text style={styles.articleButton} size={12} color="#f18d46" bold>
                  {item.cta}
                </Text>
              </TouchableWithoutFeedback>
            </Block>
            {item.isMyRecipe ? (
              <Block right style={{ marginTop: 2 }}>
                <TouchableWithoutFeedback onPress={() => (item.id == 0 ? '' : this.onCheckDelete())}>
                  <AntDesign name="delete" size={15} color="#f18d46" />
                </TouchableWithoutFeedback>
              </Block>
            ) : (
              <Block />
            )}
          </Block>
        </Block>
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
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
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
    paddingVertical: 3,
  },
});

export default withNavigation(Card);
