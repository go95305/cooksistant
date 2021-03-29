import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Alert} from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { ECard } from '../components';
import axios from 'axios';
import firebase from 'firebase';

const { width, height } = Dimensions.get('screen');

const recipes = [
  {
    title: '빨간맛 떡볶이',
    image: require('../assets/imgs/food1.png'),
    isEvalu: false,
    horizontal: true,
  },
  {
    title: '감자조림',
    image: require('../assets/imgs/food2.png'),
    isEvalu: true,
  },
  {
    title: '나박김치',
    image: require('../assets/imgs/food3.png'),
    isEvalu: false,
    horizontal: true,
  },
  {
    title: '된장찌개',
    image: require('../assets/imgs/food4.png'),
    isEvalu: false,
    horizontal: true,
  },

  {
    title: '제육볶음',
    image: require('../assets/imgs/food5.png'),
    isEvalu: true,
    horizontal: true,
  },
  {
    title: '채소듬뿍 김밥',
    image: require('../assets/imgs/food6.png'),
    isEvalu: true,
    horizontal: true,
  },
];
class EvalueList extends React.Component {
  state = { apiResult: [] };
  // componentDidMount = () => {
  //   var user = firebase.auth().currentUser;
  //   axios
  //     .post(`http://j4c101.p.ssafy.io:8081/recipe/review`, {
  //       authKey: user.uid
  //     })
  //     .then((result) => {
  //     })
  // };
  renderCards = () => {
    return (
      <Block style={styles.container}>
        <ECard item={recipes[0]} horizontal />
        <ECard item={recipes[1]} horizontal />
        <ECard item={recipes[2]} horizontal />
        <ECard item={recipes[3]} horizontal />
        <ECard item={recipes[4]} horizontal />
        <ECard item={recipes[5]} horizontal />
      </Block>
    );
  };

  render() {
    return (
      <Block flex={1} style={{ marginTop: height > 800 ? 80 : 50 }}>
        <Block style={{ marginTop: 20 }}></Block>
        <ScrollView showsVerticalScrollIndicator={false}>{this.renderCards()}</ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE,
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 45,
    color: nowTheme.COLORS.HEADER,
  },
});

export default EvalueList;
