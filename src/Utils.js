import DeviceInfo from 'react-native';

export const deviceScale = () => DeviceInfo.Dimensions.get('window').scale;
