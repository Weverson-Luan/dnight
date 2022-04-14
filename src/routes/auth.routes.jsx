import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import RecoverPassword from "../screens/RecoverPassword";

const { Screen, Navigator } = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Screen name="Login" component={Login} />
      <Screen name="RecoverPassword" component={RecoverPassword} />
    </Navigator>
  );
};
