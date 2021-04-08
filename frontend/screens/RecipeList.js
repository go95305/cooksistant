import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { ECard, Card } from '../components';
import axios from 'axios';

const { width, height } = Dimensions.get('screen');

class RecipeList extends React.Component {
  state = {
    size: null,
    keyword: this.props.route.params.keyword,
    recipeList: [],
  };

  componentDidMount = () => {
    axios
      .get(`http://j4c101.p.ssafy.io:8081/recipe/search/${this.state.keyword}`)
      .then((result) => {
        const arrayList = [];
        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((el) => {
            arrayList.push({
              rId: el.recipeId,
              title: el.recipename,
              image: el.url,
              favor: el.favor,
              desc: el.description,
              flag: false,
            });
          });
        }
        this.setState({ recipeList: arrayList, size: arrayList.length });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  renderCards = () => {
    return (
      <Block style={styles.container}>
        {this.state.size === 0 ? (
          <Card
            item={{ title: '키워드를 포함한 레시피가 없어요ㅠ', image: null, id: 0 }}
            horizontal
          />
        ) : (
          this.state.recipeList.map((el, index) => {
            return <ECard key={index} item={el} full />;
          })
        )}
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
export default RecipeList;
