import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { Images, nowTheme, tabs } from '../constants';
import { Card, Button } from '../components';
import articles from '../constants/articles';
import SegmentedControlTab from 'react-native-segmented-control-tab';
const { width, height } = Dimensions.get('screen');

const Articles = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.articles}>
      <Block flex>
        <Card item={articles[0]} horizontal onPress={() => navigation.navigate('RecipeInfo')} />
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
    </ScrollView>
  );
};
const Trendy = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
    </ScrollView>
  );
};

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };
  }

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
            />
          </Block>
          <Block style={{ marginBottom: 20, marginTop: 10 }}>
            {this.state.selectedIndex === 0 && <Articles />}
            {this.state.selectedIndex === 1 && <Trendy />}
          </Block>
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
});

export default Home;
