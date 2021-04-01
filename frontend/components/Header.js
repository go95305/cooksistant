import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import {CommonActions} from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Image } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton } from 'galio-framework';
import { Images, nowTheme } from '../constants';
import Icon from './Icon';
import Input from './Input';

const { height, width } = Dimensions.get('window');

const HomeBtn = ({ style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() =>
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'App' }],
        })
      )
    }
  >
    <Image source={Images.HomeLogo} style={styles.logo} />
  </TouchableOpacity>
);

const RecipeRegisterBtn = ({ navigation }) => (
  <Button
    style={{ width: 80, height: 40, marginHorizontal: 8, elevation: 0 }}
    textStyle={{ fontFamily: 'montserrat-bold', color: nowTheme.COLORS.PRIMARY, fontSize: 12 }}
    color="white"
    round
    onPress={() => navigation.navigate('RecipeRegister')}
  >
    레시피 등록
  </Button>
);

const EvalueListBtn = ({ navigation }) => (
  <Button
    style={{ width: 80, height: 40, marginHorizontal: 5, elevation: 0 }}
    textStyle={{ fontFamily: 'montserrat-bold', color: nowTheme.COLORS.PRIMARY, fontSize: 12 }}
    color="white"
    round
    onPress={() => navigation.navigate('EvalueList')}
  >
    레시피 평가
  </Button>
);

class Header extends React.Component {
  state = {
    keyword: '',
  };

  // 메뉴바
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  // 오른쪽 상단의 헤더 : 마이페이지(프로필)에만 존재
  renderRight = () => {
    const { title, navigation } = this.props;

    switch (title) {
      case '프로필':
        return [
          <RecipeRegisterBtn key="recipe-register" navigation={navigation} />,
          <EvalueListBtn key="evalu-list" navigation={navigation} />,
        ];
      case '레시피 평가 리스트':
      case '레시피 평가':
      case '레시피 추천':
      case '레시피 검색':
      case '레시피 상세정보':
      case '요리 과정':
        return [<HomeBtn key="home-btn" navigation={navigation} />];
      default:
        break;
    }
  };

  // 검색창
  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Input
        right
        color="black"
        style={styles.search}
        placeholder="레시피 입력  →  돋보기 클릭"
        placeholderTextColor={'#8898AA'}
        iconContent={
          <Icon
            size={22}
            color={theme.COLORS.MUTED}
            name="zoom-bold2x"
            family="NowExtra"
            onPress={() => navigation.navigate('RecipeList', { keyword: this.state.keyword })}
          />
        }
        onChangeText={(e) =>
          this.setState({
            keyword: e,
          })
        }
      />
    );
  };

  renderHeader = () => {
    const { search } = this.props;
    if (search) {
      return <Block center>{search ? this.renderSearch() : null}</Block>;
    }
  };

  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const noShadow = ['Search', 'Categories', 'Deals', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ justifyContent: 'flex-end' }}
          left={
            <Icon
              name={back ? 'minimal-left2x' : 'align-left-22x'}
              family="NowExtra"
              size={26}
              onPress={this.handleLeftPress}
              color={iconColor || (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.3 }}
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor },
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
  },
  logo: {
    height: 40,
    width: 37,
  },
  navbar: {
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 4.5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 50,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
    marginBottom: 5,
  },
});

export default withNavigation(Header);
