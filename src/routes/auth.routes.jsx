// react-navigation-stack 
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screes stacks
import Login from "../screens/Login";
import RecoverPassword from "../screens/RecoverPassword";
import { Register } from "../screens/Register";
import { Events } from "../screens/Events";

const { Screen, Navigator } = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="RecoverPassword" component={RecoverPassword} />
      <Screen name="Register" component={Register} />
      <Screen name="Events"component={Events} />
    </Navigator>
  );
};
 