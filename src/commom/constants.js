import i18n from '../i18n'


export default {
  PASSWORD_MIN_LENGTH: 8,
  MIN_DISTANCE_TO_ENTER_CHAT: 50000000, // In meters
  MASKED_PHONE_MAX_LENGTH: 15,
  MASKED_BIRTHDATE_MAX_LENGTH: 10,
  GENDERS: [
    {
      label: i18n.t('placeholders.genders.male'),
      value: 'M',
    },
    {
      label: i18n.t('placeholders.genders.female'),
      value: 'F',
    },
    {
      label: i18n.t('placeholders.genders.other'),
      value: 'O',
    },
    {
      label: i18n.t('placeholders.genders.unknown'),
      value: 'U',
    },
  ],
  LocationErrors: {
    PERMISSION_DENIED: 1,
    POSITION_UNAVAILABLE: 2,
    TIMEOUT: 3,
  },
  ChatKit: {
    TOKEN_PROVIDER_URL: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1',
    API_URL: 'https://us1.pusherplatform.io/services/chatkit/v2',
    INSTANCE_LOCATOR: 'v1:us1',
    INSTANCE_ID: 'b94968bb-10a6-4a10-9148-d8ed278ba2ee',
  },
}
