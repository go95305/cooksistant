import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { Block, Text, Button as GaButton } from 'galio-framework';
import { Button} from '../components';
import { Images, nowTheme } from '../constants';

const { width, height } = Dimensions.get('screen');

class TTS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rId: this.props.route.params.step.id,
      cuisine: this.props.route.params.step.cuisine,
      image: this.props.route.params.step.image,
    };
  }
  render() {
    const title = this.state.cuisine;
    const tmp = title.split(']');
    return (
      <Block style={styles.container}>
        <Block>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex={1} middle>
              <Block style={styles.registerContainer}>
                <Block flex={0.2} middle style={{marginTop: 30, marginBottom: 20}}>
                  <Block width={width * 0.8}
                    style={{ padding: 5, borderWidth: 2, borderRadius: 15, borderColor: '#f18d46' }}
                  >
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        lineHeight: 27,
                        margin: 20,
                        marginTop: 10,
                        marginBottom: 10,
                      }}
                      color="#474747"
                      size={17}
                    >
                      {title.includes(']') ? tmp[0] + '] \n' + tmp[1].trim() : title}
                    </Text>
                  </Block>
                </Block>
                <Block center flex={0.5}>
                  <Block style={{ overflow: 'hidden' }}>
                  <Image
                    resizeMode="cover"
                    style={styles.photo}
                    source={{ uri: this.state.image }}
                  />
                  </Block>
                </Block>
  
                <Block center flex={0.2}>
                  <Button
                    color="primary"
                    round
                    style={styles.createButton}
                    onPress={() =>
                      this.props.navigation.navigate('TTSOrder', {
                        id: this.state.rId,
                      })
                    }
                  >
                    <Text
                      style={{ fontFamily: 'montserrat-bold' }}
                      size={14}
                      color={nowTheme.COLORS.WHITE}
                    >
                      같이 요리해볼까요?
                    </Text>
                  </Button>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
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
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: height > 800 ? height * 0.12 : 0,
    width: width * 0.9,
    height: height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    height: 50,
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 30,
  },
  photo: {
    borderRadius: 30,
    height: 185,
    width: width * 0.85,
  },
});

export default TTS;
