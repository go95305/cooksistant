import React from 'react';
import { StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { CommonActions } from '@react-navigation/native'; 
import { Block, Text, theme } from 'galio-framework';
import firebase from 'firebase';

import Icon from './Icon';
import nowTheme from '../constants/Theme';

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case '쿡시스턴트':
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case '프로필':
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case '재료':
        return (
          <Icon
            name="atom2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case '영수증':
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            style={{ opacity: 0.5 }}
          />
        );
      case '앱 소개':
        return (
          <Icon
            name="spaceship2x"
            family="NowExtra"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
          />
        );
      case '로그아웃':
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() => {
          switch (title) {
            case '앱 소개':
              Linking.openURL(
                'https://www.notion.so/SUB3-eddba11b91494c4185c65cec233fa8ac'
              ).catch((err) => console.error('An error occurred', err))
              break;
            case '로그아웃':
              firebase
                .auth()
                .signOut()
                .then(() => {
                  // Sign-out successful.
                  navigation.navigate('Start');
                })
                .catch((error) => {
                  // An error happened.
                });
              break;
            default:
              navigation.navigate(title);
          }
        }}
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: 'montserrat-regular',
                textTransform: 'uppercase',
                fontWeight: '300',
              }}
              size={14}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : 'white'}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white',
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: 'white',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
