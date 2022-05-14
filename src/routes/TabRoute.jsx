import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Ionicons from "react-native-vector-icons/Ionicons";

import { MapLocation } from "../screens/Map";
// import Explorer from "./ExplorerScreen";
// import Filter from "./FilterScreen";
// import Profile from "./ProfileScreen";

export function TabRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator();
  return (
    <Navigator
      // initialRouteName={Explorer}
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name="MapLocation"
        component={MapLocation}
        // options={({ route }) => ({
        //   tabBarShowLabel: false,
        //   headerShown: false,
        //   tabBarIcon: ({ focused, size }) => {
        //     let iconColor;

        //     if (route.name === "MapLocation") {
        //       iconColor = focused ? Styles.Color.GREY_DARK : Styles.Color.GREY;
        //     }

        //     return (
        //       <Ionicons name={"map-outline"} size={size} color={iconColor} />
        //     );
        //   },
        // })}
      />
      {/* <Screen
        name="Explorer"
        component={Explorer}
        options={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size }) => {
            let iconColor;

            if (route.name === "Explorer") {
              iconColor = focused ? Styles.Color.GREY_DARK : Styles.Color.GREY;
            }

            return (
              <Ionicons
                name={"ios-funnel-outline"}
                size={size}
                color={iconColor}
              />
            );
          },
        })}
      />
      <Screen
        name="Filter"
        component={Filter}
        options={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            let iconColor;

            if (route.name === "Filter") {
              iconColor = focused ? Styles.Color.GREY_DARK : Styles.Color.GREY;
            }

            return (
              <Ionicons name={"ios-search"} size={size} color={iconColor} />
            );
          },
        })}
      />

      <Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size }) => {
            let iconColor;

            if (route.name === "Profile") {
              iconColor = focused ? Styles.Color.GREY_DARK : Styles.Color.GREY;
            }

            return (
              <Ionicons
                name={"ios-person-circle-outline"}
                size={size}
                color={iconColor}
              />
            );
          },
        })}
      /> */}
    </Navigator>
  );
}
