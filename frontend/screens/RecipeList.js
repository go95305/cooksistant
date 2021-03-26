import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { ScrollView, StyleSheet , Dimensions} from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { articles, nowTheme } from '../constants';
import { Card } from '../components';

const { width, height } = Dimensions.get('screen');

class RecipeList extends React.Component {
  renderCards = () => {
    return (
      <Block style={styles.container}>
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
  }
});

export default RecipeList;

