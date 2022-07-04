// react-navigation-stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screes stacks
import { Slider } from "../screens/Slider";
import Login from "../screens/Login";
import RecoverPassword from "../screens/RecoverPassword";
import { Register } from "../screens/Register";
import { Events } from "../screens/Events";
import { Terms } from "../screens/Terms";
import { ListEvents } from "../screens/ListEvents";
import { EventsDetails } from "../screens/EventsDetails";
import { Splash } from "../screens/Splash";
import { Report } from "../screens/Report";
import { FavoriteEvents } from "../screens/FavoriteEvents";

//routes bottomTabs
import { TabRoutes } from "./TabRoute";
import { Styles } from "../common/styles";

const { Screen, Navigator } = createNativeStackNavigator();

export const AuthRoutes = () => {
  return (
    <Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
       <Screen name="Splash" component={Splash} />
      <Screen name="Slider" component={Slider} />
      <Screen name="Login" component={Login} />
      <Screen name="RecoverPassword" component={RecoverPassword} />
      <Screen name="Register" component={Register} />
      <Screen name="Events" component={Events} />
      <Screen name="Terms" component={Terms} />
      <Screen name="Tab" component={TabRoutes} />
      <Screen name="ListEvents" component={ListEvents} />
      <Screen name="EventsDetails" component={EventsDetails} />
      <Screen 
        name="Report" 
        component={Report}
        options={{
          headerShown: true,
          headerTitle: "Reportar",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Styles.Color.PRIMARY_DARK
          },
          headerTintColor: Styles.Color.SCREEN_BACKGROUND
        }}
       />

      <Screen 
        name="FavoriteEvents" 
        component={FavoriteEvents}
        options={{
          headerShown: true,
          headerTitle: "Eventos Salvo",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: Styles.Color.PRIMARY_DARK
          },
          headerTintColor: Styles.Color.SCREEN_BACKGROUND
        }}
       />
    </Navigator>
  );
};
