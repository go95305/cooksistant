import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { ScrollView, StyleSheet } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { articles, nowTheme } from '../constants';
import { Card } from '../components';

class TrendyList extends React.Component {
  renderCards = () => {
    return (
      <Block style={styles.container}>
        <Block flex row>
          <Card
            item={articles[0]}
            style={{ marginRight: theme.SIZES.BASE }}
            onPress={() => navigation.navigate('RecipeInfo')}
          />
          <Card item={articles[1]} onPress={() => navigation.navigate('RecipeInfo')} />
        </Block>

        <Block flex row>
          <Card
            item={articles[2]}
            style={{ marginRight: theme.SIZES.BASE }}
            onPress={() => navigation.navigate('RecipeInfo')}
          />
          <Card item={articles[1]} onPress={() => navigation.navigate('RecipeInfo')} />
        </Block>
        <Block flex row>
          <Card
            item={articles[3]}
            style={{ marginRight: theme.SIZES.BASE }}
            onPress={() => navigation.navigate('RecipeInfo')}
          />
          <Card item={articles[1]} onPress={() => navigation.navigate('RecipeInfo')} />
        </Block>

        <Block flex row>
          <Card
            item={articles[4]}
            style={{ marginRight: theme.SIZES.BASE }}
            onPress={() => navigation.navigate('RecipeInfo')}
          />
          <Card item={articles[5]} onPress={() => navigation.navigate('RecipeInfo')} />
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
    paddingHorizontal: theme.SIZES.BASE,
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
});

export default TrendyList;
