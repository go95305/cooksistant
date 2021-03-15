
import * as React from "react"
import { Animated, TouchableOpacity } from "react-native"

const ProfileTab = ({ focusAnim, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ["transparent", "#f18d46"]
          })
        }}
      >
        <Animated.Text
          style={{
            color: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["#444", "#fff"]
            })
          }}
        >{title}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default ProfileTab