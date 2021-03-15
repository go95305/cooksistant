import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { articles, nowTheme } from '../constants';
import { Card } from '../components';

class EvaluList extends React.Component {
  renderCards = () => {
    return (
      <Block style={styles.container}>
        <Card item={articles[0]} horizontal />
        <Card item={articles[1]} horizontal />
        <Card item={articles[2]} horizontal />
        <Card item={articles[3]} horizontal />
        <Card item={articles[4]} horizontal />
        <Card item={articles[5]} horizontal />  
      </Block>
    );
  };

  render() {
    return (
      <Block flex>
        <ScrollView showsVerticalScrollIndicator={false}>{this.renderCards()}</ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 110,
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  }
});

export default EvaluList;
