import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableWithoutFeedback, Dimensions, Modal, Pressable} from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

class Card extends React.Component {
  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  

  render() {
    const {
      navigation,
      item,
      horizontal,
      full,
      style,
      isEvaluColor,
      imageStyle,
    } = this.props;

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
                ? this.setModalVisible(true)
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
                ? this.setModalVisible(true)
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
                size={13}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.title.includes(']')
                  ? title[0] +
                    '] \n' +
                    (title[1].trim().length > 26
                      ? title[1].trim().substr(0, 26) + ' ⋯'
                      : title[1].trim())
                  : item.title.length > 26
                  ? item.title.substr(0, 26) + ' ⋯'
                  : item.title}
              </Text>
            </Block>
            {item.flag ? (
              <Block row space="between">
                <Text style={{ padding: 7 }} size={13} muted={!isEvaluColor} color={'#f18d46'} bold>
                  {item.isEvalu ? '레시피 보러가기' : '레시피 평가하기'}
                </Text>
                {item.isEvalu ? (
                  <MaterialIcons name="check-box" size={30} color="#f18d46" />
                ) : (
                  <MaterialIcons name="check-box-outline-blank" size={30} color="#f18d46" />
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
                <Text style={styles.modalText}>별점 : </Text>
              </Block>
              <Block flex={1}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>닫기</Text>
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
    paddingVertical: 7,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: width * 0.7,
    height: height * 0.5,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#f18d46',
  },
  textStyle: {
    color: 'white',
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'montserrat-regular',
  },
});

export default withNavigation(Card);
