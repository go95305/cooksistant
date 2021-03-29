import React from 'react';
import { Block, theme } from 'galio-framework';
import { Easing, Animated, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// screens
import Start from '../screens/Start';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import EvalueList from '../screens/EvalueList';
import EvalueRegister from '../screens/EvalueRegister';
import RecipeList from '../screens/RecipeList';
import RecipeInfo from '../screens/RecipeInfo';
import Ingredient from '../screens/Ingredient';
import Receipt from '../screens/Receipt';
import TTSOrder from '../screens/TTSOrder';
import TTS from '../screens/TTS';
import STT from '../screens/STT';
import SettingsScreen from '../screens/Settings';
// drawer
import CustomDrawerContent from './Menu';
// header for screens
import { Header, Icon } from '../components';
import { nowTheme, tabs } from '../constants';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="쿡시스턴트" search navigation={navigation} scene={scene} />
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
        name="TTSOrder"
        component={TTSOrder}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="요리 과정"
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

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
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
        name="EvalueList"
        component={EvalueList}
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
      <Stack.Screen
        name="EvalueRegister"
        component={EvalueRegister}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="레시피 평가하기"
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
        name="Pro"
        component={RecipeInfo}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="레시피 상세정보"
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
        name="TTSOrder"
        component={TTSOrder}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="요리 과정"
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
      <Stack.Screen
        name="RecipeList"
        component={RecipeList}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="레시피 추천 받기"
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
        name="Pro"
        component={RecipeInfo}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="레시피 상세정보"
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
        name="TTSOrder"
        component={TTSOrder}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              title="요리 과정"
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

function TTSStack(props) {
  return (
    <Stack.Navigator initialRouteName="TTS" mode="card" headerMode="screen">
      <Stack.Screen
        name="TTS"
        component={TTS}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="TTS" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function STTStack(props) {
  return (
    <Stack.Navigator initialRouteName="STT" mode="card" headerMode="screen">
      <Stack.Screen
        name="STT"
        component={STT}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="STT" navigation={navigation} scene={scene} />
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
      <Drawer.Screen name="쿡시스턴트" component={HomeStack} />
      <Drawer.Screen name="프로필" component={ProfileStack} />
      <Drawer.Screen name="재료" component={IngredientStack} />
      <Drawer.Screen name="영수증" component={ReceiptStack} />
      <Drawer.Screen name="TTS" component={TTSStack} />
      <Drawer.Screen name="STT" component={STTStack} />
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
