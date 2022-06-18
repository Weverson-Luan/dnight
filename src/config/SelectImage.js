import * as ImagePicker from 'expo-image-picker';


/**
 * ACCESSING IMAGES IN THE USER'S CAMERA
 * @returns 
 */
export const PickerImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
   return result.uri;
  };
};