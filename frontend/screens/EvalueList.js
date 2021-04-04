import React from 'react';
import { ScrollView, StyleSheet, Dimensions, RefreshControl, fetchData } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { ECard } from '../components';
import axios from 'axios';
import firebase from 'firebase';

const { width, height } = Dimensions.get('screen');

class EvalueList extends React.Component {
  state = {
    refreshing: false,
    apiResult: [],
  };

  componentDidMount = () => {
    this.getEvaluList();
  };

  getEvaluList = () => {
    var user = firebase.auth().currentUser;
    axios
      .post(`http://j4c101.p.ssafy.io:8081/recipe/review/${user.uid}`)
      .then((result) => {
        const arrayList = [];
        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((el) => {
            arrayList.push({
              eId: el.evaluationId,
              title: el.cuisine,
              rId: el.recipe_id,
              image: el.image,
              isEvalu: el.isComplete,
              flag: true,
            });
          });
        }
        this.setState({ apiResult: arrayList });
        this.setState({ refreshing: false });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.getEvaluList();
  }

  renderCards = () => {
    return (
      <Block style={styles.container}>
        {this.state.apiResult.map((el, index) => {
          return <ECard key={index} item={el} full />;
        })}
      </Block>
    );
  };

  render() {
    return (
      <Block flex={1} style={{ marginTop: height > 800 ? 80 : 50 }}>
        <Block style={{ marginTop: 20 }}></Block>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {this.renderCards()}
        </ScrollView>
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
