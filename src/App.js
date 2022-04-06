import React from "react";

import { NativeBaseProvider, extendTheme } from "native-base";

import Login from "./screens/Login";

export default function App() {
  const theme = extendTheme({
    components: {
      Input: {
        baseStyle: {
          color: "#212121",
          _focus: {
            borderColor: "#a0a0a0",
          },
        },
      },
    },
    colors: {
      error: {
        300: "#ff9a8b",
        500: "#f6685e",
        700: "#be3634",
      },
      primary: {
        300: "#19526C",
        400: "#003F5C",
        500: "#003852",
      },
      white: {
        500: "#fff",
        700: "#d5d5d5",
      },
      grey: {
        500: "#C0C0C0",
        700: "#808080",
      },
    },
    config: {
      initialColorMode: "dark",
    },
  });

  // StartApp.onStart(); // Start app functions
  return (
    <NativeBaseProvider theme={theme}>
      <Login />
    </NativeBaseProvider>
  );
}
