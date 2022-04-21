import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import Geolocation from "react-native-geolocation-service";
// import * as rootNavigation from "../screens/rootNavigation";
import AwesomeAlert from "../../utils/AwesomeAlert";
import analytics from "@react-native-firebase/analytics";

var currentPosition = { lat: "", lng: "" },
  userData,
  userUid;
class AppState {
  setAppStatus = () => {
    database()
      .ref("settings")
      .on("value", function (snapshot) {
        const data = snapshot.val();
        if (data.appMaintenance) {
          analytics().logEvent("MAINTENANCE");
          // rootNavigation.navigate("MAINTENANCE_SCREEN");
        }
      });
  };

  setBanned = () => {
    database()
      .ref("users/")
      .child(userUid)
      .on("value", function (snapshot) {
        const data = snapshot.val();
        if (data.banned) {
          analytics().logEvent("USER_BANNED");
          // rootNavigation.navigate("BANNED_SCREEN");
        }
      });
  };

  setUpdateCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        currentPosition.lat = position.coords.latitude;
        currentPosition.lng = position.coords.longitude;
        database()
          .ref("users")
          .child(userUid)
          .child("location")
          .push({
            lat: currentPosition.lat,
            long: currentPosition.lng,
            create_at: database().getServerTime().getTime(),
          })
          .catch(error => {
            if (error) {
              AwesomeAlert(
                "[ERROR] - Não foi possível recuperar sua localização"
              );
            }
          });
      },
      error => {
        if (error.code == 2) {
          AwesomeAlert("Ative a localização em seu smartphone");
        } else {
          AwesomeAlert(error.message);
        }
      },
      {
        timeout: 20000,
        forceLocationManager: true,
        forceRequestLocation: true,
        showLocationDialog: true,
      }
    );
  };

  setUserData = () => {
    database()
      .ref("users")
      .child(userUid)
      .on("value", function (snapshot) {
        userData = snapshot.val();
      });
  };

  setUid = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        userUid = user.uid;
        this.setUpdateCurrentLocation();
        this.setUserData();
        this.setBanned();
      }
    });
  };

  getCoords() {
    return currentPosition;
  }
  getUserData() {
    return userData;
  }
  getUid() {
    return userUid;
  }
}
export default new AppState();
