import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get('screen');

class Card extends React.Component {
  state = {
    modalVisible: false,
    recipeid: 0,
    favor: 0,
    keywords: [],
    userId: 0,
  };

  checkEvalue = (evalId) => {
    axios
      .get(`http://j4c101.p.ssafy.io:8081/recipe/evaluation/${evalId}`)
      .then((result) => {
        const kList = [];
        result.data.keywords.forEach((el) => {
          kList.push(el);
        });

        const favor = parseFloat(result.data.favor).toFixed(1);
        this.setState({
          recipeid: result.data.recipeid,
          keywords: kList,
          favor: Number(favor),
          userId: result.data.userId,
        });
        console.log(result);
        this.setModalVisible(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { navigation, item, horizontal, full, style, isEvaluColor, imageStyle } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];

    const { modalVisible } = this.state;
    const title = item.title.split(']');
    const favor = parseFloat(item.favor).toFixed(1);
    return (
      <Block card flex style={cardContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            item.flag
              ? item.isEvalu
                ? this.checkEvalue(item.eId)
                : navigation.navigate('EvalueRegister', {
                    eId: item.eId,
                    rId: item.rId,
                    title: item.title,
                    image: item.image,
                  })
              : navigation.navigate('Pro', { id: item.rId });
          }}
        >
          <Block flex style={imgContainer}>
            <Image resizeMode="cover" source={{ uri: item.image }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            item.flag
              ? item.isEvalu
                ? this.checkEvalue(item.eId)
                : navigation.navigate('EvalueRegister', {
                    eId: item.eId,
                    rId: item.rId,
                    title: item.title,
                    image: item.image,
                  })
              : navigation.navigate('Pro', { id: item.rId });
          }}
        >
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex>
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  paddingTop: 3,
                  paddingHorizontal: 8,
                  lineHeight: 20,
                }}
                size={14.5}
                color="#474747"
              >
                {item.title.includes(']')
                  ? title[0] +
                    '] \n' +
                    (title[1].trim().length > 23
                      ? title[1].trim().substr(0, 23) + ' ⋯'
                      : title[1].trim())
                  : item.title.length > 23
                  ? item.title.substr(0, 23) + ' ⋯'
                  : item.title}
              </Text>
            </Block>
            {item.flag ? (
              <Block row space="between">
                <Text  style={styles.articleButton} size={13} color={'#f18d46'} bold>
                  {item.isEvalu ? '레시피 보러가기' : '레시피 평가하기'}
                </Text>
                {item.isEvalu ? (
                  <MaterialIcons style={{margin :8}} name="check-box" size={30} color="#f18d46" />
                ) : (
                  <MaterialIcons style={{margin :8}} name="check-box-outline-blank" size={30} color="#f18d46" />
                )}
              </Block>
            ) : (
              <Block row flex style={{ marginLeft: 10, marginTop: 15 }}>
                <Block>
                  <AntDesign name="star" size={15} color="#f18d46" />
                </Block>
                <Block>
                  <Text style={{ marginLeft: 5 }} size={14} color={'#f18d46'} bold>
                    {favor === 'NaN' ? '0.0' : favor}
                  </Text>
                </Block>
              </Block>
            )}
          </Block>
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!modalVisible);
          }}
        >
          <Block style={styles.centeredView}>
            <Block style={styles.modalView}>
              <Block flex={9}>
                <Block
                  style={{ padding: 8, borderWidth: 2, borderRadius: 15, borderColor: '#f18d46' }}
                >
                  <Text
                    style={{
                      fontFamily: 'montserrat-bold',
                      textAlign: 'center',
                      lineHeight: 25,
                      marginTop: 12,
                      marginBottom: 12,
                    }}
                    color="#474747"
                    size={13.5}
                  >
                    {item.title.includes(']') ? title[0] + '] \n' + title[1].trim() : item.title}
                  </Text>
                </Block>
                <Text
                  style={{
                    fontFamily: 'montserrat-bold',
                    textAlign: 'center',
                    marginTop: 20,
                    marginBottom: 8,
                  }}
                  color="#474747"
                  size={13}
                >
                  {this.state.favor} 점
                </Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={37}
                  halfStarEnabled={true}
                  emptyStarColor={'#f18d46'}
                  fullStarColor={'#f18d46'}
                  rating={this.state.favor}
                />
                <Block row style={{ marginTop: 15 }}>
                  {this.state.keywords.map((el, idx) => (
                    <Text key={idx} style={styles.keyword}>
                      {el}
                    </Text>
                  ))}
                </Block>
              </Block>
              <Block row center flex={1}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>닫기</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                    navigation.navigate('Pro', { id: item.rId });
                  }}
                >
                  <Text style={styles.textStyle}>이동</Text>
                </Pressable>
              </Block>
            </Block>
          </Block>
        </Modal>
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
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: width * 0.75,
    height: height * 0.55,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#f18d46',
  },
  textStyle: {
    width: 50,
    color: 'white',
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
  },
  keyword: {
    height: 50,
    width: 55,
    padding: 10,
    margin: 3,
    borderWidth: 1,
    borderColor: '#f18d46',
    backgroundColor: '#fff',
    borderRadius: 18,
    fontSize: 13,
    fontFamily: 'montserrat-bold',
    color: '#f18d46',
    textAlign: 'center',
  },
  articleButton: {
    fontFamily: 'montserrat-bold',
    margin: 8,
    paddingVertical: 8,
  },
});

export default withNavigation(Card);
