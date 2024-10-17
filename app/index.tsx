// import React, { useEffect } from "react";
// import { View, Button, StyleSheet, Dimensions } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import Animated, {
//   Easing,
//   useSharedValue,
//   withTiming,
//   runOnJS,
// } from "react-native-reanimated";
// import HeroImage from "./home";

// const Stack = createStackNavigator();
// const { width, height } = Dimensions.get("window");

// const FirstScreen = ({ navigation }: any) => {
//   const scale = useSharedValue(1);

//   const navigateToSecond = () => {
//     // Animation first, then navigate
//     scale.value = withTiming(
//       0,
//       {
//         duration: 2000,
//         easing: Easing.inOut(Easing.ease),
//       },
//       (isFinished) => {
//         if (isFinished) {
//           runOnJS(navigation.navigate)("Second");
//         }
//       }
//     );
//   };

//   useEffect(() => {
//     scale.value = 1;
//   }, []);

//   return (
//     <View style={first.screen}>
//       <Animated.View style={{ transform: [{ scale: scale.value }] }}>
//         <HeroImage source={{ uri: "https://picsum.photos/id/52/200" }} />
//       </Animated.View>
//       <Button title="Go to Second Screen" onPress={navigateToSecond} />
//     </View>
//   );
// };

// const SecondScreen = ({ navigation }: any) => {
//   const scale = useSharedValue(1);

//   const navigateToFirst = () => {
//     scale.value = withTiming(
//       0,
//       {
//         duration: 1000,
//         easing: Easing.inOut(Easing.ease),
//       },
//       (isFinished) => {
//         if (isFinished) {
//           runOnJS(navigation.navigate)("First");
//         }
//       }
//     );
//   };

//   return (
//     <View style={styles.screen}>
//       <HeroImage source={{ uri: "https://picsum.photos/id/50/200" }} />
//       <Button title="Go to First Screen" onPress={navigateToFirst} />
//     </View>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer independent={true}>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//           gestureEnabled: true,
//           animationEnabled: true,
//         }}
//       >
//         <Stack.Screen name="First" component={FirstScreen} />
//         <Stack.Screen name="Second" component={SecondScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     width: "100%",
//     height: height * 0.5,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000fff",
//   },
// });

// const first = StyleSheet.create({
//   screen: {
//     flex: 1,
//     width: "100%",
//     height: height * 0.5,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff000",
//     paddingHorizontal: width * 0.05,
//   },
// });

// export default App;
import React, { useEffect } from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedStyle,
} from "react-native-reanimated";
import HeroImage from "./home";

const Stack = createStackNavigator();
const { width, height } = Dimensions.get("window");

const FirstScreen = ({ navigation }: any) => {
  const translateY = useSharedValue(-height); // Animatsiya boshlanganda rasm yuqorida bo'ladi

  const navigateToSecond = () => {
    // Animation first, then navigate
    translateY.value = withTiming(
      -height, // Yuqoriga harakatlanadi
      {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      },
      (isFinished) => {
        if (isFinished) {
          runOnJS(navigation.navigate)("Second");
        }
      }
    );
  };

  useEffect(() => {
    // Sahifa yuklanganda rasm yuqoridan pastga keladi
    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={first.screen}>
      <Animated.View style={animatedStyle}>
        <HeroImage source={{ uri: "https://picsum.photos/id/52/200" }} />
      </Animated.View>
      <Button title="Go to Second Screen" onPress={navigateToSecond} />
    </View>
  );
};

const SecondScreen = ({ navigation }: any) => {
  const translateY = useSharedValue(-height);

  const navigateToFirst = () => {
    translateY.value = withTiming(
      -height, // Yuqoriga qaytish
      {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      },
      (isFinished) => {
        if (isFinished) {
          runOnJS(navigation.navigate)("First");
        }
      }
    );
  };

  useEffect(() => {
    // Sahifa yuklanganda rasm yuqoridan pastga keladi
    translateY.value = withTiming(0, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.screen}>
      <Animated.View style={animatedStyle}>
        <HeroImage source={{ uri: "https://picsum.photos/id/50/200" }} />
      </Animated.View>
      <Button title="Go to First Screen" onPress={navigateToFirst} />
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false,
          gestureEnabled: true,
          animationEnabled: true,
        }}
      >
        <Stack.Screen name="First" component={FirstScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000fff",
  },
});

const first = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff000",
    paddingHorizontal: width * 0.05,
  },
});

export default App;
