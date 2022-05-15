// react-navigation-stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screes stacks
import Login from "../screens/Login";
import RecoverPassword from "../screens/RecoverPassword";
import { Register } from "../screens/Register";
import { Events } from "../screens/Events";
import { Terms } from "../screens/Terms";
import { TabRoutes } from "./TabRoute";

const { Screen, Navigator } = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="Tab" screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="RecoverPassword" component={RecoverPassword} />
      <Screen name="Register" component={Register} />
      <Screen name="Events" component={Events} />
      <Screen name="Terms" component={Terms} />
      <Screen name="Tab" component={TabRoutes} />
    </Navigator>
  );
};
