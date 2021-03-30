import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
//galio
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { ECard } from '../components';
import axios from 'axios';
import firebase from 'firebase';

const { width, height } = Dimensions.get('screen');

class EvalueList extends React.Component {
  state = {
    apiResult: []
  };

  componentDidMount = () => {
    var user = firebase.auth().currentUser;
    axios
      .post(`http://j4c101.p.ssafy.io:8081/recipe/review/${user.uid}`)
      .then((result) => {
        const arrayList = [];
        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((el) => {
            arrayList.push({
              title: el.cuisine,
              eId: el.evaluationId,
              rId: el.recipe_id,
              isEvalu: el.isComplete,
              image: el.image,
            });
          });
        }
        this.setState({ apiResult: arrayList })
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  renderCards = () => {
    return (
      <Block style={styles.container}>
        {this.state.apiResult.map((el, index) => { 
          return (<ECard key={index} item={el} horizontal />);
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

export default EvalueList;
