import React, { useContext, useState } from 'react'
import Text from '../component/Text'
import WebView from 'react-native-webview'
import { globalStyles } from '../styles/globalStyles'
import Modal from 'react-native-modal';
import { ActivityIndicator, Button, StyleSheet, ToastAndroid, View } from 'react-native';
import useEVMWallet from '../hooks/useEVMWallet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './OnboardScreen';
import { EvmWalletContext } from '../context/EvmWalletContext';


type createWalletScreenProp = NativeStackNavigationProp<RootStackParamList, 'CreateWalletScreen'>;

function CreateWalletScreen() {
    const { createWalletWithFaceId } = useEVMWallet()
    const { setWallet } = useContext(EvmWalletContext)
    const { navigate } = useNavigation<createWalletScreenProp>()
    const [creatingWallet, setCreatingWallet] = useState(false)

    const onMessage = (event: any) => {
        const data = JSON.parse(event.nativeEvent.data)
        if (data.status === "SUCCESS") {
            setCreatingWallet(() => true)
            const faceId = data.data.facialId
            try {
                const wallet = createWalletWithFaceId(faceId)
                setCreatingWallet(() => false)
                setWallet!(wallet)
                navigate('EVMWalletHomeScreen')
            } catch (error) {
                setCreatingWallet(() => false)
                ToastAndroid.show("Failed to create wallet try again", 3000)
            }
        }
    };
    return (
        <>
            <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mediaCapturePermissionGrantType='grant'
                startInLoadingState={false}
                allowsInlineMediaPlayback
                onMessage={onMessage}
                mediaPlaybackRequiresUserAction={false}
                scalesPageToFit={true}
                source={{ uri: "https://f5v7zf.csb.app/create" }}
                style={globalStyles.screen}
            />
            <Modal isVisible={creatingWallet}>
                <View style={styles.creatingProgress}>
                    <ActivityIndicator size={30} />
                    <Text size='lg'>Creating Wallet, Please wait...</Text>
                </View>
            </Modal>
        </>

    )
}


export default CreateWalletScreen

const styles = StyleSheet.create({
    creatingProgress: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 7,
        flexDirection: 'row',
        gap: 10
    }
})