import {PermissionsAndroid} from 'react-native';
import {Alert} from 'react-native';
import Permissions, {
    openSettings,
    PERMISSIONS,
    RESULTS,
} from 'react-native-permissions';
export const settingPermissionForToggle = (permission, message) => {
    return Alert.alert(permission, message, [
        // this.state.photoPermission == 'undetermined'
        // { text: 'OK', onPress: requestLocationAndroidPermission },
        //     : { text: 'Open Settings', onPress: Permissions.openSettings },
        {
            text: 'Allow &   Open Settings',
            onPress: () => openSettings(),
        },
        {
            text: 'Cancel',
            onPress: () => {
                console.log('called');
            },
        },
    ]);
};
