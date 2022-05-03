import * as Localization from "expo-localization";
import i18n from "i18n-js";

import pt from "./translations/pt.json";
import en from "./translations/en.json";

i18n.fallbacks = true;

// Set the key-value pairs for the different languages you want to support.
i18n.translations = { pt, en };

// Set the locale once at the beginning of your app.
i18n.defaultLocale = "pt-BR";
i18n.locale = Localization.locale;

export default i18n;
