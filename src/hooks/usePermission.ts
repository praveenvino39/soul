import React from 'react'
import { PermissionsAndroid, Platform } from 'react-native'


export type PermissionResult = 'GRANTED' | 'DENIED' | 'NEVER_ASK'
function usePermissions() {

    const checkCameraPermission = async () => {
        if (Platform.OS == "android") {
            const result = await PermissionsAndroid.check('android.permission.CAMERA')
            return result
        }
    }

    const requestCameraPermission = async (): Promise<PermissionResult> => {
        if (Platform.OS == "android") {
            const result = await PermissionsAndroid.request('android.permission.CAMERA')
            if (result === "granted") {
                return 'GRANTED';
            }
            if (result === "never_ask_again") {
                return 'NEVER_ASK';
            }
            return 'DENIED'
        }
        return "NEVER_ASK"
    }
    return {
        checkCameraPermission,
        requestCameraPermission
    }

}

export default usePermissions