import React from 'react';
import { ScrollView, StyleSheet, Dimensions} from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { ECard } from '../components';

const { width, height } = Dimensions.get('screen');

const recipes = [
  {
    title: '빨간맛 떡볶이',
    image: require("../assets/imgs/food1.png"),
    cta: '레시피 보러가기',
    horizontal: true
  },
  {
    title: '감자조림',
    image: require("../assets/imgs/food2.png"),
    cta: '레시피 보러가기',
  },
  {
    title: '나박김치',
    image: require("../assets/imgs/food3.png"),
    cta: '레시피 보러가기',
    horizontal: true
  },
  {
    title: '된장찌개',
    image: require("../assets/imgs/food4.png"),
    cta: '레시피 보러가기',
    isEvalu: false,
    horizontal: true
  },

  {
    title: '제육볶음',
    image: require("../assets/imgs/food5.png"),
    cta: '레시피 보러가기',
    horizontal: true
  },
  {
    title: '채소듬뿍 김밥',
    image: require("../assets/imgs/food6.png"),
    cta: '레시피 보러가기',
    horizontal: true
  }
]
class EvalueList extends React.Component {
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
      <Block flex={1} style={{marginTop: height > 800 ? 90 : 50}}>
        <ScrollView showsVerticalScrollIndicator={false}>{this.renderCards()}</ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 45,
    color: nowTheme.COLORS.HEADER
  }
});

export default EvalueList;
