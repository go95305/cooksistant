import React from 'react';
import { ScrollView, StyleSheet , Dimensions} from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { Card } from '../components';

const { width, height } = Dimensions.get('screen');

import axios from 'axios';

class RecipeList extends React.Component {
  state = {
    userId: this.props.route.params.userId,
    ingreList: this.props.route.params.ingredients,
    recipeList:[]
  }
  
  componentDidMount = () => {
    axios
      .post(`http://j4c101.p.ssafy.io:8081/recipe/recommendation`, {
        ingredients: this.state.ingreList,
        userId: this.state.userId
      })
      .then((result) => {
        const arrayList = [];
        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((el) => {
            arrayList.push({
              rId: el.recipeId,
              rName: el.recipename,
              rImage: el.url,
            });
          });
        }
        this.setState({ recipeList: arrayList })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  renderCards = () => {
    return (
      <Block style={styles.container}>
        {/* <Card item={articles[0]} horizontal/>
        <Block flex row>
          <Card item={articles[1]} style={{ marginRight: theme.SIZES.BASE }} />
          <Card item={articles[2]} />
        </Block>
        <Card item={articles[3]} horizontal />
        <Block flex row>
          <Card item={articles[4]} style={{ marginRight: theme.SIZES.BASE }} />
          <Card item={articles[5]} />
        </Block> */}
        <Text>{this.state.ingreList[0]}</Text>
        <Text>{this.state.recipeList.length}</Text>
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

