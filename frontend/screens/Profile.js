import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';
import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';

function TasteScreen() {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center' }}>
      <Text>내 취향!</Text>
    </View>
  );
}

function RecipeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>내가 등록한 레시피!</Text>
    </View>
  );
}

function ScrapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>내가 스크랩한 레시피!</Text>
    </View>
  );
}


const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get('screen');

const ImgSize = (width - 48 - 32) / 3;

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Taste"
      tabBarOptions={{
        activeTintColor: 'white',
        labelStyle: { fontSize: 15, fontFamily: 'montserrat-regular'},
        style: { backgroundColor: '#f18d46' },
      }}
    >
      <Tab.Screen
        Button
        name="Taste"
        component={TasteScreen}
        options={{ tabBarLabel: 'Taste' }}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ tabBarLabel: 'Recipe' }}
      />
      <Tab.Screen
        name="Scrap"
        component={ScrapScreen}
        options={{ tabBarLabel: 'Scrap' }}
      />
    </Tab.Navigator>
  );
}

const Profile = () => {
  return (
    <Block style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} >
      <Block flex={0.4} >
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 50 }}>
              <Block middle style={{ top: height * 0.13 }}>
                <Image source={Images.ProfilePicture} style={styles.avatar} />
              </Block>
              <Block style={{ top: height * 0.13 }}>
                <Block middle >
                  <Text
                    style={{
                      marginTop: 12,
                      fontFamily: 'montserrat-bold',
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: '900',
                      fontSize: 26
                    }}
                    color='#ffffff'
                    >
                    사용자
                  </Text>
                </Block>
                <Block style={styles.info}>
                  <Block row space="around">

                    <Block middle>
                      <Text
                        color="white"
                        size={18}
                        style={{marginBottom: 4, fontFamily: 'montserrat-bold' }}
                      >
                        26
                      </Text>
                      <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                        Recipe
                        </Text>
                    </Block>

                    <Block middle>
                      <Text
                        color="white"
                        size={18}
                        style={{ marginBottom: 4, fontFamily: 'montserrat-bold' }}
                      >
                        48
                      </Text>
                      <Text style={{ fontFamily: 'montserrat-regular' }} size={14} color="white">
                        Scrap
                      </Text>
                    </Block>

                  </Block>
                </Block>
              </Block>
            </Block>


            <Block
              middle
              row
              style={{ position: 'absolute', width: width, top: height * 0.45 - 30, zIndex: 90 }}
            >
              <Button style={{ width: 95, height: 44, marginHorizontal: 5, elevation: 0 }} textStyle={{ fontSize: 16 }} round>
                My
              </Button>
              <Button style={{ width: 100, height: 44, marginHorizontal: 5, elevation: 0 }} textStyle={{ fontSize: 16 }} round>
                Recipe
              </Button>
              <Button style={{ width: 100, height: 44, marginHorizontal: 5, elevation: 0 }} textStyle={{ fontSize: 16 }} round>
                Scrap
              </Button>
            </Block>
          </Block>
        </ImageBackground>
      </Block>

      <Block flex={0.55} style={{ padding: theme.SIZES.BASE, marginTop: 90}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={{ marginTop: 20 }}>
              <MyTabs/>
          </Block>
        </ScrollView>
      </Block>
    </Block>

  )
}





const styles = StyleSheet.create({

  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width,
    height: height * 0.4
  },
  info: {
    marginTop: 20,
    paddingHorizontal: 50,
    height: height * 0.8
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -80
  },
  avatar: {
    width: ImgSize,
    height: ImgSize,
    borderRadius: 50,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 35
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: ImgSize,
    height: ImgSize
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5
  }
});

export default Profile;
