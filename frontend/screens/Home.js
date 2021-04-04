import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { Card } from '../components';
import axios from 'axios';
import Swiper from 'react-native-swiper';
import RNUrlPreview from 'react-native-url-preview';
const { width, height } = Dimensions.get('screen');

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      recipePopular: [],
      recipeTrendy: [],
    };
  }
  state = { recipePopular: [], recipeTrendy: [] };
  componentDidMount = () => {
    axios
      .get(`http://j4c101.p.ssafy.io:8081/recipe/favor`)
      .then((result) => {
        const arrayList = [];
        console.log(result);
        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((el) => {
            arrayList.push({
              id: el.recipeId,
              title: el.recipename,
              image: el.url,
              flag: false,
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
        const arrayList1 = [];
        console.log(result);
        console.log('DDDDDDDDDDDDDDDDDDDDDDD' + result.data.trend);
        if (result.data.trend && Array.isArray(result.data.trend)) {
          result.data.trend.forEach((el) => {
            arrayList1.push({
              title: el.title,
              image: el.link,
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
      <Block flex={1}>
        <Block flex={2}>
          <Text
            style={{
              fontFamily: 'montserrat-bold',
              marginTop: height > 800 ? 30 : 10,
              paddingLeft: height > 800 ? 20 : 10,
            }}
            color='#474747'
            size={15}
          >
            인기 레시피
          </Text>
          <Block flex style={styles.container}>
            <Swiper
              loop={true}
              horizontal={false}
              renderPagination={renderPagination}
              autoplay={true}
              autoplayTimeout={5}
              key={this.state.recipePopular.length}
            >
              {this.state.recipePopular.map((el, index) => {
                return <Card key={index} item={el} full />;
              })}
            </Swiper>
          </Block>
        </Block>
        <Block flex={0.1}></Block>
        <Block
          center
          style={{
            borderColor: '#f18d46',
            width: '90%',
            borderWidth: StyleSheet.hairlineWidth + 1,
          }}
        />
        <Block flex={1.5}>
          <Block flex>
            <Text
              style={{
                fontFamily: 'montserrat-bold',
                marginTop: height > 800 ? 30 : 10,
                paddingLeft: height > 800 ? 20 : 10,
              }}
              color='#474747'
              size={15}
            >
              트렌디 레시피
            </Text>
            <Block flex style={styles.container}>
              <Swiper
                loop={true}
                renderPagination={renderPagination}
                autoplay={true}
                autoplayTimeout={3.5}
                key={this.state.recipeTrendy.length}
              >
                {this.state.recipeTrendy.map((el, index) => (
                  <Block key={index} style={{ padding: 10 }}>
                    <Block>
                      <RNUrlPreview text={el.image} />
                    </Block>
                    <Text
                      style={{
                        fontFamily: 'montserrat-bold',
                        paddingTop: 3,
                        lineHeight: 20,
                      }}
                      size={12}
                      color="#474747"
                    >
                      {el.title}
                    </Text>
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
  container: {
    paddingHorizontal: theme.SIZES.BASE,
    marginTop: 10,
  },
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
