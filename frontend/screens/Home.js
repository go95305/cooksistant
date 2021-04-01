import React from 'react';
import { StyleSheet, Dimensions, ScrollView, state } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { Card, CardTrendy } from '../components';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      recipePopular: [],
      recipeTrendy: [],
    };
  }
  state = { recipePopular: [], recipeTrendy: [] };
  componentDidMount = () => {
    axios
      .get(`http://j4c101.p.ssafy.io:8081/recipe/favor`)
      .then((result) => {
        const arrayList = [];
        if (result.data && Array.isArray(result.data)) {
          result.data.forEach((el) => {
            arrayList.push({
              id: el.recipeId,
              title: el.recipename,
              image: el.url,
              cta: '레시피 보러가기',
            });
          });
        }
        this.setState({
          recipePopular: arrayList,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://j4c101.p.ssafy.io:5000/trend`)
      .then((result) => {
        console.log(result);
        const arrayList1 = [];
        if (result.data.trendList && Array.isArray(result.data.trendList)) {
          result.data.trendList.forEach((el) => {
            arrayList1.push({
              title: el.title,
              image: el.link,
              cta: '레시피 보러가기',
            });
          });
        }
        this.setState({
          recipeTrendy: arrayList1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  Articles = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          {this.state.recipePopular.map((el, index) => {
            return <Card key={index} item={el} horizontal />;
          })}
        </Block>
      </ScrollView>
    );
  };

  Trendy = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
        <Block flex>
          {this.state.recipeTrendy.map((el, index) => {
            return <Card key={index} item={el} horizontal />;
          })}
        </Block>
      </ScrollView>
    );
  };

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };
  render() {
    const { navigation } = this.props;
    return (
      <Block style={styles.container}>
        <Block style={styles.segmentContainer}>
          <Block>
            <SegmentedControlTab
              values={['인기', '트랜디']}
              selectedIndex={this.state.selectedIndex}
              onTabPress={this.handleIndexChange}
              tabsContainerStyle={styles.tabsContainerStyle}
              tabStyle={styles.tabStyle}
              activeTabStyle={styles.activeTabStyle}
              tabTextStyle={{ color: '#444444', fontFamily: 'montserrat-bold' }}
              height={50}
              borderRadius={20}
            />
          </Block>
          {this.state.selectedIndex === 0 ? (
            <Block style={styles.listBox}>{this.Articles()}</Block>
          ) : (
            <Block style={styles.listBox}>{this.Trendy()}</Block>
          )}
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
    height: height * 0.35,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular',
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.SIZES.BASE,
  },
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER,
  },
  segmentContainer: {
    height: height * 0.65,
  },
  tabsContainerStyle: {
    height: 40,
    marginTop: 20,
  },
  tabStyle: {
    borderColor: '#f18d46',
  },
  activeTabStyle: {
    backgroundColor: '#f18d46',
  },
  listBox: {
    marginBottom: Platform.OS === 'ios' ? 0 : 20,
    marginTop: 10,
  },
});

export default Home;
