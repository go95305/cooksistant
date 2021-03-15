import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";

import nowTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const screens = [
    "Home",
    "Components",
    "레시피 리스트",
    "프로필",
    "재료",
    "영수증"
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={15}
            color={"white"}
            onPress={() => navigation.goBack()}
          />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
          <Block
            style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
          />
        </Block>
        <DrawerCustomItem title="GETTING STARTED" navigation={navigation}/>
        <DrawerCustomItem title="LOGOUT" navigation={navigation}/>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE * 2.5,
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: "center"
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 37
  }
});

export default CustomDrawerContent;
