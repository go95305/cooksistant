import React from 'react';
import { Block } from 'galio-framework';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import Start from '../screens/Start';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import RecipeRegister from '../screens/RecipeRegister';
import TasteRegister from '../screens/TasteRegister';
import EvaluList from '../screens/EvaluList';
import Components from '../screens/Components';
import RecipeList from '../screens/RecipeList';
import RecipeInfo from '../screens/RecipeInfo';
import Ingredient from '../screens/Ingredient';
import TrendyList from '../screens/TrendyList';
import Receipt from '../screens/Receipt';
import TTS from '../screens/TTS';
import SettingsScreen from '../screens/Settings';
// drawer
import CustomDrawerContent from './Menu';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ComponentsStack(props) {
  return (
    <Stack.Navigator initialRouteName="Components" mode="card" headerMode="screen">
      <Stack.Screen
        name="Components"
        component={Components}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function RecipeListStack(props) {
  return (
    <Stack.Navigator initialRouteName="RecipeList" mode="card" headerMode="screen">
      <Stack.Screen
        name="RecipeList"
        component={RecipeList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="레시피 리스트" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
      <Stack.Screen
        name="Pro"
        component={RecipeInfo}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="레시피 상세정보"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="TTS"
        component={TTS}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="TTS" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="프로필"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent white title="프로필" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="RecipeRegister"
        component={RecipeRegister}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="레시피 등록"
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="TasteRegister"
        component={TasteRegister}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="취향 등록"
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="EvaluList"
        component={EvaluList}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="레시피 평가 리스트"
              back
              black
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" search options navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="Pro"
        component={RecipeInfo}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="레시피 상세정보"
              back
              white
              transparent
              navigation={navigation}
              scene={scene}
            />
          ),
          headerTransparent: true,
        }}
      />

      <Stack.Screen
        name="TrendyList"
        component={TrendyList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="TrendyList" search options navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="TTS"
        component={TTS}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="TTS" back white transparent navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function IngredientStack(props) {
  return (
    <Stack.Navigator initialRouteName="Ingredient" mode="card" headerMode="screen">
      <Stack.Screen
        name="Ingredient"
        component={Ingredient}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="재료 등록" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function ReceiptStack(props) {
  return (
    <Stack.Navigator initialRouteName="Receipt" mode="card" headerMode="screen">
      <Stack.Screen
        name="Receipt"
        component={Receipt}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="영수증" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      <Drawer.Screen name="Components" component={ComponentsStack} />
      <Drawer.Screen name="레시피 리스트" component={RecipeListStack} />
      <Drawer.Screen name="프로필" component={ProfileStack} />
      <Drawer.Screen name="재료" component={IngredientStack} />
      <Drawer.Screen name="영수증" component={ReceiptStack} />
    </Drawer.Navigator>
  );
}

export default function StartStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Start"
        component={Start}
        option={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
