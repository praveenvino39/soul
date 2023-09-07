import React, { useState } from 'react'
import { AppState, Button, Linking, StyleSheet, View } from 'react-native'
import Modal from "react-native-modal";
import { globalStyles } from '../styles/globalStyles'
import Text from '../component/Text'
import usePermissions, { PermissionResult } from '../hooks/usePermission'
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type RootStackParamList = {
    OnboardScreen: undefined;
    CreateWalletScreen: undefined;
    LoginWalletScreen: undefined;
    EVMWalletHomeScreen: undefined;
};
type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'OnboardScreen'>;

function OnboardScreen() {
    const { navigate } = useNavigation<homeScreenProp>()
    const { checkCameraPermission, requestCameraPermission } = usePermissions()
    const [showPermissionModal, setshowPermissionModal] = useState(false)
    const [permissionStatus, setPermissionStatus] = useState<PermissionResult | null>(null)
    const [navigationRoute, setNavigationRoute] = useState<'CREATE' | 'LOGIN'>('CREATE')



    const createWalletHandler = async () => {
        setNavigationRoute('CREATE')
        const isPermissionApproved = await checkCameraPermission()
        if (isPermissionApproved) {
            return goToCreateWalletScreen()
        }
        setshowPermissionModal(() => true)
    }

    const loginWalletHandler = async () => {
        setNavigationRoute('LOGIN')
        const isPermissionApproved = await checkCameraPermission()
        if (isPermissionApproved) {
            return goToLoginWalletScreen()
        }
        setshowPermissionModal(() => true)
    }

    const goToCreateWalletScreen = () => {
        navigate('CreateWalletScreen')
    }
    const goToLoginWalletScreen = () => {
        navigate('LoginWalletScreen')
    }


    const permissionHandler = async () => {
        const permissionResult = await requestCameraPermission()
        switch (permissionResult) {
            case "GRANTED":
                setPermissionStatus('GRANTED')
                return navigationRoute === "CREATE" ? goToCreateWalletScreen() : goToLoginWalletScreen();
            case "DENIED":
                setPermissionStatus('DENIED')
                return console.log("Denied");
            case "NEVER_ASK":
                setPermissionStatus('NEVER_ASK')
                return console.log("Disabled");
        }
    }

    const goToAppSettingPage = () => {
        IntentLauncher.startActivity({
            action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
            data: 'package:' + "com.soulwallet"
        })
        AppState.addEventListener('change', async (nextAppState) => {
            if (nextAppState === "active") {
                if (permissionStatus === "NEVER_ASK") {
                    setPermissionStatus("DENIED")
                }
            }
        });
    }

    return (
        <View style={[globalStyles.screen, styles.center]}>
            <Button onPress={loginWalletHandler} title='Login to Wallet' />
            <Button onPress={createWalletHandler} title='Create Wallet' />
            <Modal onBackButtonPress={() => setshowPermissionModal(false)} isVisible={showPermissionModal}>
                <View style={styles.modalContent}>
                    {permissionStatus === "NEVER_ASK" ? <>
                        <Text>Permission disabled, Please approve permission on App settings</Text>
                        <Button onPress={goToAppSettingPage} title='Go to settings' />
                    </> : <>
                        <Text>We need below permission to create wallet</Text>
                        <Button onPress={permissionHandler} title='Approve Camera Permission' />
                    </>}

                </View>
            </Modal>
        </View>
    )
}

export default OnboardScreen


const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    modalContent: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 20
    }
})