import React, { useState } from 'react'
import Text from '../component/Text'
import WebView from 'react-native-webview'
import { globalStyles } from '../styles/globalStyles'
import Modal from 'react-native-modal';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function CreateWalletScreen() {

    const [creatingWallet, setCreatingWallet] = useState(false)

    const onMessage = (event: any) => {
        const data = JSON.parse(event.nativeEvent.data)
        if (data.status === "SUCCESS") {
            setCreatingWallet(() => true)
            console.log('face id', data.data.facialId);
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
                source={{ uri: "https://f5v7zf.csb.app/" }}
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