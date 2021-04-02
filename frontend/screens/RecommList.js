import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { ECard } from '../components';
import axios from 'axios';

const { width, height } = Dimensions.get('screen');

class RecommList extends React.Component {
  state = {
    userId: this.props.route.params.userId,
    ingreList: this.props.route.params.ingredients,
    recipeList: [],
  };

  componentDidMount = () => {
    axios
      .post(`http://j4c101.p.ssafy.io:8081/recipe/recommendation`, {
        ingredients: this.state.ingreList,
        userId: this.state.userId,
      })
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
              flag: false
            });
          });
        }
        this.setState({ recipeList: arrayList });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  renderCards = () => {
    return (
      <Block style={styles.container}>
        {this.state.recipeList.map((el, index) => { 
          return (<ECard key={index} item={el} full />);
        })}
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
export default RecommList;
