import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  state,
  TouchableWithoutFeedback,
} from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { Card, CardTrendy } from '../components';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import RNUrlPreview from 'react-native-url-preview';
const { width, height } = Dimensions.get('screen');

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      recipePopular: [],
      recipeTrendy: [],
    };
  }
  state = { recipePopular: [], recipeTrendy: [] };
  componentDidMount = () => {
    axios
      .get(`http://j4c101.p.ssafy.io:8081/recipe/favor`)
      .then((result) => {
        console.log(result);
        const arrayList = [];
        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((el) => {
            arrayList.push({
              id: el.recipeId,
              title: el.recipename,
              image: el.url,
              cta: '레시피 보러가기',
            });
          });
        }
        this.setState({
          recipePopular: arrayList,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://j4c101.p.ssafy.io:5000/trend`)
      .then((result) => {
        console.log(result);
        const arrayList1 = [];
        if (result.data.trendList && Array.isArray(result.data.trendList)) {
          result.data.trendList.forEach((el) => {
            arrayList1.push({
              title: el.title,
              image: el.link,
              cta: '레시피 보러가기',
            });
          });
        }
        this.setState({
          recipeTrendy: arrayList1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Block style={{ flex: 1 }}>
        <Block style={{ flex: 1, padding: 10 }}>
          <Block style={{ flex: height > 800 ? 0.5 : 0.3 }}>
            <Text
              style={{
                fontFamily: 'montserrat-bold',
                marginTop: height > 800 ? 30 : 10,
                paddingLeft: height > 800 ? 20 : 10,
              }}
            >
              인기 레시피
            </Text>
          </Block>
          <Block style={{ flex: height > 800 ? 3 : 4 }}>
            <Swiper style={styles.wrapper} renderPagination={renderPagination} loop={false}>
              {this.state.recipePopular.map((el, index) => (
                <Card key={index} item={el} full />
              ))}
            </Swiper>
          </Block>
        </Block>

        <Block style={{ flex: 1 }}>
          <Block style={{ flex: 1, padding: 10 }}>
            <Block style={{ flex: height > 800 ? 0.5 : 0.3 }}>
              <Text
                style={{
                  fontFamily: 'montserrat-bold',
                  marginTop: height > 800 ? 30 : 10,
                  paddingLeft: height > 800 ? 20 : 10,
                }}
              >
                트렌디 레시피
              </Text>
            </Block>
            <Block style={{ flex: 3 }}>
              <Swiper loop timeout={-2.5} renderPagination={renderPagination}>
                {this.state.recipeTrendy.map((el, index) => (
                  <Block key={index} style={{ flex: 1, padding: 10 }}>
                    <Block>
                      {/* <Image resizeMode="contain" source={{ uri: el.image }} style={imageStyles} /> */}
                      <RNUrlPreview text={el.image} />
                    </Block>
                    <Text>{el.title}</Text>
                  </Block>
                ))}
              </Swiper>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}
const renderPagination = (index, total, context) => {
  return (
    <Block style={styles.paginationStyle}>
      <Text style={{ color: 'grey' }}>
        <Text style={styles.paginationText}></Text>
      </Text>
    </Block>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width,
    height: height / 2,
    flex: 1,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  paginationText: {
    color: 'white',
    fontSize: 15,
  },
});

export default Home;
