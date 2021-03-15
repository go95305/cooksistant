import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { articles, nowTheme } from '../constants';
import { Card } from '../components';

class RecipeList extends React.Component {
  renderCards = () => {
    return (
      <Block style={styles.container}>
      <Text size={16} style={styles.title}>
        Cards
      </Text>
        <Card item={articles[0]} horizontal
              onPress={() => navigation.navigate('RecipeInfo')} />
        <Block flex row>
          <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
          <Card item={articles[2]} />
        </Block>
        <Card item={articles[3]} horizontal />
        <Block flex row>
          <Card item={articles[4]} style={{ marginRight: theme.SIZES.BASE }} />
          <Card item={articles[5]} />
        </Block>
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
    paddingHorizontal: theme.SIZES.BASE
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  }
});

export default RecipeList;